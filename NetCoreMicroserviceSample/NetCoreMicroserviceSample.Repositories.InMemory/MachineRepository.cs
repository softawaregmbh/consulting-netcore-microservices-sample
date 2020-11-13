using NetCoreMicroserviceSample.Common.Domain;
using NetCoreMicroserviceSample.Common.Exceptions;
using NetCoreMicroserviceSample.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreMicroserviceSample.Repositories.InMemory
{
    public class MachineRepository : IMachineRepository
    {
        private IList<Machine> machines = new List<Machine>() {
            new Machine
            {
                Id = Guid.NewGuid(),
                Name = "Machine 1",
                Description = "Description 1",
                ImageUrl = "machine1.jpg",
            },
            new Machine
            {
                Id = Guid.NewGuid(),
                Name = "Machine 2",
                Description = "Description 2",
                ImageUrl = "machine2.jpg",
            },
            new Machine
            {
                Id = Guid.NewGuid(),
                Name = "Machine 3",
                Description = "Description 3",
                ImageUrl = "machine3.jpg",
            }
        };

        public MachineRepository()
        {
        }

        public Task<Machine> AddOrUpdateMachine(Machine machine)
        {
            this.machines.Add(machine);

            return Task.FromResult(machine);
        }

        public async Task DeleteMachineAsync(Guid id)
        {
            var machineToRemove = await this.GetMachineByIdAsync(id);

            this.machines.Remove(machineToRemove);
        }

        public Task<Machine> GetMachineByIdAsync(Guid id)
        {
            var machine = this.machines.SingleOrDefault(m => m.Id == id);

            if (machine == null)
            {
                throw new NotFoundException($"Machine with {id} cannot be found.");
            }

            return Task.FromResult(machine);
        }

        public Task<IEnumerable<Machine>> GetMachinesAsync()
        {
            return Task.FromResult(this.machines.AsEnumerable());
        }
    }
}
