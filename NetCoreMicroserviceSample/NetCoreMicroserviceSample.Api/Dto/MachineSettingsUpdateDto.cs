using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreMicroserviceSample.Api.Dto
{
    public record MachineSettingsUpdateDto(Guid Id, double value);
}
