using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreMicroserviceSample.Api.Domain;
using NetCoreMicroserviceSample.Api.Repository;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using NetCoreMicroserviceSample.Api.Dto;

namespace NetCoreMicroserviceSample.Api.Controllers
{
    [Route("api/machines")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private readonly MachineVisualizerDataContext dbContext;

        public MachineController(MachineVisualizerDataContext dbContext) =>
            this.dbContext = dbContext;

        [HttpGet(Name = "GetAllMachines")]
        [ProducesResponseType(typeof(IEnumerable<MachineMetadata>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get() =>
            Ok(await dbContext.Machines.Select(m => new MachineMetadata(m.Id, m.Name, m.Description)).ToListAsync());

        [HttpGet("{id}", Name = "MachineById")]
        [ProducesResponseType(typeof(MachineMetadata), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
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

        [HttpGet("{id}/image", Name = "GetMachineImage")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetImageAsync(Guid id)
        {
            var machine = await dbContext.Machines.Select(m => new { m.Id, m.SvgImage }).SingleOrDefaultAsync(m => m.Id == id);
            if (machine == null || string.IsNullOrEmpty(machine.SvgImage))
            {
                return NotFound();
            }

            return new ContentResult { ContentType = "image/svg+xml", StatusCode = (int)HttpStatusCode.OK, Content = machine.SvgImage };
        }

        [HttpPost(Name = "AddMachine")]
        [ProducesResponseType(typeof(Machine), (int)HttpStatusCode.Created)]
        public async Task<IActionResult> PostAsync([FromBody] Machine machine)
        {
            dbContext.Machines.Add(machine);
            await dbContext.SaveChangesAsync();
            return CreatedAtRoute("MachineById", new { machine.Id }, machine);
        }

        [HttpPut(Name = "UpdateMachine")]
        [ProducesResponseType(typeof(Machine), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> PutAsync([FromBody] Machine machine)
        {
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

        [HttpDelete("{id}", Name = "DeleteMachine")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
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

        [HttpGet("{id}/settings", Name = "GetMachineSettings")]
        [ProducesResponseType(typeof(MachineSetting[]),(int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSettingsAsync(Guid id)
        {
            var settings = await dbContext.MachineSettings.Where(s => s.MachineId == id).ToListAsync();

            return Ok(settings);
        }

        [HttpGet("{id}/switches", Name = "GetMachineSwitches")]
        [ProducesResponseType(typeof(MachineSwitch[]), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetSwitchesAsync(Guid id)
        {
            var switches = await dbContext.MachineSwitches.Where(s => s.MachineId == id).ToListAsync();

            return Ok(switches);
        }

        [HttpPut("{id}/settings", Name = "UpdateMachineSettings")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> PutSettingsAsync(Guid id, [FromBody] MachineSettingsUpdateDto[] settings)
        {
            var existingSettings = await dbContext.MachineSettings.Where(s => s.MachineId == id).ToListAsync();

            dbContext.MachineSettings.RemoveRange(existingSettings);

            // TODO add automapper?
            var newSettings = settings.Select(s => new MachineSetting
            {
                Id = s.Id,
                Description = s.Description,
                MachineId = id,
                Name = s.Name,
                PositionX = s.PositionX,
                PositionY = s.PositionY,
                Value = s.Value
            });

            dbContext.MachineSettings.AddRange(newSettings);

            await dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}/switch", Name = "SetMachineSwitch")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> PutSwitchAsync(Guid id, [FromBody] MachineSwitchValueDto value)
        {
            // TODO - forward value through gRPC
            return Ok();
        }
    }
}
