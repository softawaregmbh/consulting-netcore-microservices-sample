using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
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

        public MachineDataHub(ILogger<MachineDataHub> logger)
        {
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async IAsyncEnumerable<int> MachineData(
            Guid machineId,
        [EnumeratorCancellation]
        CancellationToken cancellationToken)
        {
            this.logger.LogInformation($"start streaming for machine {machineId}");
            try
            {
                // TODO: check if current machine is selected for receiving streaming data
                while (!cancellationToken.IsCancellationRequested)
                {
                    yield return (new Random().Next(1, 100)) - 50;

                    await Task.Delay(20, cancellationToken);
                }
            }
            finally
            {
                this.logger.LogInformation($"stopped streaming for machine {machineId}");
            }
        }
    }
}
