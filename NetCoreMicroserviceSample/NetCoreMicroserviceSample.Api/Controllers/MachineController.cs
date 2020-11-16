namespace NetCoreMicroserviceSample.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using NetCoreMicroserviceSample.Api.Domain;
    using NetCoreMicroserviceSample.Api.Repository;
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;

    [Route("api/machines")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private readonly MachineVisualizerDataContext dbContext;

        public MachineController(MachineVisualizerDataContext dbContext) =>
            this.dbContext = dbContext;

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Machine>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get() =>
            Ok(await dbContext.Machines.ToListAsync());

        [HttpGet("{id}", Name = "MachineById")]
        [ProducesResponseType(typeof(Machine), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetAsync(Guid id)
        {
            var machine = await dbContext.Machines.SingleOrDefaultAsync(m => m.Id == id);
            return machine switch
            {
                null => NotFound(),
                _ => Ok(machine)
            };
        }

        [HttpPost]
        [ProducesResponseType(typeof(Machine), (int)HttpStatusCode.Created)]
        public async Task<IActionResult> PostAsync([FromBody] Machine machine)
        {
            dbContext.Machines.Add(machine);
            await dbContext.SaveChangesAsync();
            return CreatedAtRoute("MachineById", new { Id = machine.Id }, machine);
        }

        [HttpDelete("{id}")]
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
