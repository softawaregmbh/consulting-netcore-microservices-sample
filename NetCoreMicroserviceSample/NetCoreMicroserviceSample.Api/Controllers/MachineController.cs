using Microsoft.AspNetCore.Mvc;
using NetCoreMicroserviceSample.Common.Domain;
using NetCoreMicroserviceSample.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NetCoreMicroserviceSample.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private readonly IMachineRepository machineRepository;

        public MachineController(IMachineRepository machineRepository)
        {
            this.machineRepository = machineRepository ?? throw new ArgumentNullException(nameof(machineRepository));
        }

        [HttpGet]
        public async Task<IEnumerable<Machine>> Get()
        {
            return await this.machineRepository.GetMachinesAsync();
        }

        [HttpGet("{id}")]
        public async Task<Machine> GetAsync(Guid id)
        {
            return await this.machineRepository.GetMachineByIdAsync(id);
        }

        // POST api/<MachineController>
        [HttpPost]
        public async Task<Machine> PostAsync([FromBody] Machine machine)
        {
            return await this.machineRepository.AddOrUpdateMachine(machine);
        }

        // DELETE api/<MachineController>/5
        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            await this.machineRepository.DeleteMachineAsync(id);
        }
    }
}
