using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreMicroserviceSample.Api.Domain;
using NetCoreMicroserviceSample.Api.Repository;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;

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
    }
}
