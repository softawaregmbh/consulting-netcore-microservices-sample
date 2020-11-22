using Google.Protobuf.Collections;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using NetCoreMicroserviceSample.MachineService;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using static NetCoreMicroserviceSample.MachineService.MachineAccess;

namespace NetCoreMicroserviceSample.Machine
{
    [Authorize]
    public class MachineService : MachineAccessBase
    {
        private readonly ILogger<MachineService> logger;

        public MachineService(ILogger<MachineService> logger)
        {
            this.logger = logger;
        }

        public override Task<MachineResponse> UpdateSettings(MachineSettingsUpdate request, ServerCallContext context)
        {
            var user = context.GetHttpContext().User;
            logger.LogInformation($"Got request from client {user.Claims.Single(c => c.Type == "client_id")}");

            Console.WriteLine($"Updating setting {request.SettingId} for Machine {request.MachineId}: {request.Value:F2}");
            return Task.FromResult(new MachineResponse() { ResultCode = 1 });
        }

        public override Task<MachineResponse> TriggerSwitch(SwitchTrigger request, ServerCallContext context)
        {
            Console.WriteLine($"Triggered switch {request.SwitchId} for Machine {request.MachineId}");
            return Task.FromResult(new MachineResponse() { ResultCode = 1 });
        }

        public override async Task GetMeasurementStream(MeasurementRequest request, IServerStreamWriter<MeasurementResponse> responseStream, ServerCallContext context)
        {
            try
            {
                var current = 0d;
                while (true)
                {
                    await responseStream.WriteAsync(new MeasurementResponse() { MachineId = request.MachineId, Value = current - 300d });
                    current += 1d;
                    if (current > 300d)
                    {
                        current = 0d;
                    }

                    await Task.Delay(TimeSpan.FromMilliseconds(25));
                }
            }
            catch (InvalidOperationException ex)
            {
                logger.LogInformation(ex, "Measurement stream cancelled");
            }
        }
    }
}
