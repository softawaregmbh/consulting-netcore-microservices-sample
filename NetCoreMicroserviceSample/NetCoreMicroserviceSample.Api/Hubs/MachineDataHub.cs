using Grpc.Core;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using NetCoreMicroserviceSample.MachineService;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

namespace NetCoreMicroserviceSample.Api.Hubs
{
    public class MachineDataHub : Hub
    {
        private readonly ILogger<MachineDataHub> logger;
        private readonly MachineAccess.MachineAccessClient machineClient;

        public MachineDataHub(ILogger<MachineDataHub> logger, MachineAccess.MachineAccessClient machineClient)
        {
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
            this.machineClient = machineClient;
        }

        public async IAsyncEnumerable<double> MachineData(
            Guid machineId,
        [EnumeratorCancellation]
        CancellationToken cancellationToken)
        {
            logger.LogInformation($"start streaming for machine {machineId}");
            using var measurementStream = machineClient.GetMeasurementStream(
                new() { MachineId = machineId.ToString() }, 
                cancellationToken: cancellationToken);
            try
            {
                await foreach(var m in measurementStream.ResponseStream.ReadAllAsync(cancellationToken))
                {
                    yield return m.Value;
                }
            }
            finally
            {
                logger.LogInformation($"stopped streaming for machine {machineId}");
            }
        }
    }
}
