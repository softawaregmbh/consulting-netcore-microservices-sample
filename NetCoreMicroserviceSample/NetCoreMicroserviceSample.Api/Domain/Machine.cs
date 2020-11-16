namespace NetCoreMicroserviceSample.Api.Domain
{
    using System;

    public class Machine
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Name { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
    }
}
