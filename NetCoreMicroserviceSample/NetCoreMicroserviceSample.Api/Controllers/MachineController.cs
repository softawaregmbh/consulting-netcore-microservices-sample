using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreMicroserviceSample.Api.Domain;
using NetCoreMicroserviceSample.Api.Repository;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using NetCoreMicroserviceSample.MachineService;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Http;
using System.Net.Mime;
using Swashbuckle.AspNetCore.Filters;
using NetCoreMicroserviceSample.Api.MachineConnection;

namespace NetCoreMicroserviceSample.Api.Controllers
{
    [Route("api/machines")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private readonly MachineVisualizerDataContext dbContext;
        private readonly IMachineService machineService;

        public MachineController(MachineVisualizerDataContext dbContext, IMachineService machineService)
        {
            this.dbContext = dbContext;
            this.machineService = machineService;
        }

        /// <summary>
        /// Get a list of available machines
        /// </summary>
        /// <returns>List of machines</returns>
        [HttpGet(Name = "GetAllMachines")]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(typeof(IEnumerable<MachineMetadata>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get() =>
            Ok(await dbContext.Machines.Select(m => new MachineMetadata(m.Id, m.Name, m.Description)).ToListAsync());

        /// <summary>
        /// Get a machine by id
        /// </summary>
        /// <param name="id">ID of the machine to get</param>
        /// <returns>Machine</returns>
        [HttpGet("{id}", Name = "MachineById")]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(typeof(MachineMetadata), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAsync(Guid id)
        {
            var machine = await dbContext.Machines
                .Select(m => new MachineMetadata(m.Id, m.Name, m.Description))
                .SingleOrDefaultAsync(m => m.Id == id);
            return machine switch
            {
                null => NotFound(),
                _ => Ok(machine)
            };
        }

        /// <summary>
        /// Get SVG image for machine with given ID
        /// </summary>
        /// <param name="id">ID of the machine</param>
        /// <returns>Machine SVG image</returns>
        [HttpGet("{id}/image", Name = "GetMachineImage")]
        [Produces("image/svg+xml")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetImageAsync(Guid id)
        {
            var machine = await dbContext.Machines.Select(m => new { m.Id, m.SvgImage }).SingleOrDefaultAsync(m => m.Id == id);
            if (machine == null || string.IsNullOrEmpty(machine.SvgImage))
            {
                return NotFound();
            }

            return new ContentResult { ContentType = "image/svg+xml", StatusCode = (int)HttpStatusCode.OK, Content = machine.SvgImage };
        }

        /// <summary>
        /// Create a machine
        /// </summary>
        /// <param name="machine">Machine to create</param>
        /// <returns>Created machine</returns>
        [HttpPost(Name = "AddMachine")]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(typeof(Machine), StatusCodes.Status201Created)]
        [SwaggerResponseHeader(StatusCodes.Status201Created, "location", "string", "Location of the created machine")]
        public async Task<IActionResult> PostAsync([FromBody] Machine machine)
        {
            dbContext.Machines.Add(machine);
            await dbContext.SaveChangesAsync();
            return CreatedAtRoute("MachineById", new { machine.Id }, machine);
        }

        /// <summary>
        /// Update machine with given id
        /// </summary>
        /// <param name="id">ID of the machine to update</param>
        /// <param name="machine">Machine data</param>
        /// <remarks>
        /// ID in URL and body must match. If they don't, bad request is returned.
        /// </remarks>
        [HttpPut("{id}", Name = "UpdateMachine")]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(typeof(Machine), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutAsync(Guid id, [FromBody] Machine machine)
        {
            if (id != machine.Id)
            {
                return BadRequest(new ProblemDetails
                {
                    Instance = "https://api.foobar.com/errors/idDoesNotMatch",
                    Title = "IDs do not match",
                    Status = StatusCodes.Status400BadRequest,
                    Detail = "ID in URL and body do not match."
                });
            }

            var machineToUpdate = await dbContext.Machines.SingleOrDefaultAsync(m => m.Id == machine.Id);
            if (machineToUpdate == null)
            {
                return NotFound();
            }

            machineToUpdate.Name = machine.Name;
            machineToUpdate.Description = machine.Description;

            await dbContext.SaveChangesAsync();
            return Ok();
        }

        /// <summary>
        /// Delete a machine with given ID
        /// </summary>
        /// <param name="id">ID of the machine to delete</param>
        [HttpDelete("{id}", Name = "DeleteMachine")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Delete(Guid id)
        {
            var machine = await dbContext.Machines.SingleOrDefaultAsync(m => m.Id == id);
            if (machine == null)
            {
                return NotFound();
            }

            dbContext.Machines.Remove(machine);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Get settings for a given machine
        /// </summary>
        /// <param name="id">Machine ID</param>
        [HttpGet("{id}/settings", Name = "GetMachineSettings")]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(typeof(IEnumerable<MachineSetting>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetSettingsAsync(Guid id)
        {
            var settings = await dbContext.MachineSettings.Where(s => s.MachineId == id).ToListAsync();

            if (settings.Count == 0)
            {
                return NotFound();
            }

            return Ok(settings);
        }

        /// <summary>
        /// Get switches for a given machine
        /// </summary>
        /// <param name="id">Machine ID</param>
        [HttpGet("{id}/switches", Name = "GetMachineSwitches")]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(typeof(MachineSwitch[]), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetSwitchesAsync(Guid id)
        {
            var switches = await dbContext.MachineSwitches.Where(s => s.MachineId == id).ToListAsync();

            if (switches.Count == 0)
            {
                return NotFound();
            }

            return Ok(switches);
        }

        [SuppressMessage("Design", "CA1034", Justification = "Just needed here")]
        public record MachineSettingsUpdateDto(Guid Id, double Value);

        /// <summary>
        /// Write settings to DB and to machine
        /// </summary>
        /// <param name="id">ID of machine</param>
        /// <param name="settings">Settings to write</param>
        [HttpPut("{id}/settings", Name = "UpdateMachineSettings")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutSettingsAsync(Guid id, [FromBody] MachineSettingsUpdateDto[] settings)
        {
            var existingSettings = await dbContext.MachineSettings.Where(s => s.MachineId == id).ToListAsync();
            if (existingSettings.Count == 0)
            {
                return NotFound();
            }

            foreach (var settingToWrite in settings)
            {
                var settingToUpdateInDb = existingSettings.Single(s => s.Id == settingToWrite.Id);
                settingToUpdateInDb.Value = settingToWrite.Value;

                await machineService.UpdateSettingsAsync(new MachineSettingsUpdate
                {
                    MachineId = id.ToString(),
                    SettingId = settingToWrite.Id.ToString(),
                    Value = settingToWrite.Value
                });
            }

            await dbContext.SaveChangesAsync();
            return Ok();
        }

        /// <summary>
        /// Trigger switch (sent to machine)
        /// </summary>
        /// <param name="id">ID of machine</param>
        /// <param name="switchId">ID of switch</param>
        [HttpPost("{id}/switches/{switchId}", Name = "SetMachineSwitch")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> PostSwitchAsync(Guid id, Guid switchId)
        {
            await machineService.TriggerSwitchAsync(new SwitchTrigger
            {
                MachineId = id.ToString(),
                SwitchId = switchId.ToString()
            });

            return Ok();
        }
    }
}
