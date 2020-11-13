using System;
using System.Collections.Generic;
using System.Text;

namespace NetCoreMicroserviceSample.Common.Domain
{
    public class Machine
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string Description { get; set; }
    }
}
