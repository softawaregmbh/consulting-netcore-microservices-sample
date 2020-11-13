using NetCoreMicroserviceSample.Common.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreMicroserviceSample.Common.Interfaces
{
    public interface IMachineRepository
    {
        Task<IEnumerable<Machine>> GetMachinesAsync();

        Task<Machine> GetMachineByIdAsync(Guid id);

        Task<Machine> AddOrUpdateMachine(Machine machine);

        Task DeleteMachineAsync(Guid id);
    }
}
