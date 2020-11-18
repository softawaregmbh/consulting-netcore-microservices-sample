using System;

namespace NetCoreMicroserviceSample.Api.Domain
{
    public record MachineMetadata(Guid Id, string Name, string Description);
}
