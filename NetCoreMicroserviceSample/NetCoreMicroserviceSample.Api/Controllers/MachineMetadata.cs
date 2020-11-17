using System;

namespace NetCoreMicroserviceSample.Api.Controllers
{
    public record MachineMetadata(Guid Id, string Name, string Description);
}
