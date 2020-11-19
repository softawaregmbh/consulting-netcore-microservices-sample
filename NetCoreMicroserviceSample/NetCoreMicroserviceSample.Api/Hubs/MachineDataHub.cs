using Microsoft.AspNetCore.SignalR;
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
        private static IDictionary<string, Guid> connectionToMachineDict = new ConcurrentDictionary<string, Guid>();
        private static IDictionary<Guid, string> machineToConnectionDict = new ConcurrentDictionary<Guid, string>();

        public async IAsyncEnumerable<int> MachineData(
        [EnumeratorCancellation]
        CancellationToken cancellationToken)
        {
            // TODO: check if current machine is selected for receiving streaming data
            while(true)
            {
                // Check the cancellation token regularly so that the server will stop
                // producing items if the client disconnects.
                cancellationToken.ThrowIfCancellationRequested();

                yield return new Random().Next(1, 100);

                // Use the cancellationToken in other APIs that accept cancellation
                // tokens so the cancellation can flow down to them.
                await Task.Delay(500, cancellationToken);
            }
        }

        public void RegisterForMachineUpdates(Guid id)
        {
            Console.WriteLine($"register client with id {Context.ConnectionId} and machine {id}");
            connectionToMachineDict[Context.ConnectionId] = id;
            machineToConnectionDict[id] = Context.ConnectionId;
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var machineId = connectionToMachineDict[Context.ConnectionId];

            Console.WriteLine($"unregister client with id {Context.ConnectionId} and machine {machineId}");

            if (connectionToMachineDict.ContainsKey(Context.ConnectionId))
            {
                connectionToMachineDict.Remove(Context.ConnectionId);
            }

            if (machineToConnectionDict.ContainsKey(machineId))
            {
                machineToConnectionDict.Remove(machineId);
            }

            return base.OnDisconnectedAsync(exception);
        }
    }
}
