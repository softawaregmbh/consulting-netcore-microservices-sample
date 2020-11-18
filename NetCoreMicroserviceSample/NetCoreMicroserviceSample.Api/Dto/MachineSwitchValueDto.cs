using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreMicroserviceSample.Api.Dto
{
    public class MachineSwitchValueDto
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public bool Value { get; set; }
    }
}
