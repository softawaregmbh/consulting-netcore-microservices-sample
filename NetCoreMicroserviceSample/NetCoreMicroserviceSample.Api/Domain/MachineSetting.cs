﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreMicroserviceSample.Api.Domain
{
    public class MachineSetting
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid MachineId { get; set; }

        public Machine? Machine { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public double Value { get; set; }

        public int PositionX { get; set; }

        public int PositionY { get; set; }
    }
}
