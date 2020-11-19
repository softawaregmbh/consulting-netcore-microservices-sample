using Grpc.Core;
using NetCoreMicroserviceSample.MachineService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static NetCoreMicroserviceSample.MachineService.MachineAccess;

namespace NetCoreMicroserviceSample.Machine
{
    public class MachineService : MachineAccessBase
    {
        public override Task<MachineResponse> UpdateSettings(MachineSettingsUpdate request, ServerCallContext context)
        {
            Console.WriteLine($"Updating setting {request.SettingId} for Machine {request.MachineId}: {request.Value:F2}");
            return Task.FromResult(new MachineResponse() { ResultCode = 1 });
        }

        public override Task<MachineResponse> TriggerSwitch(SwitchTrigger request, ServerCallContext context)
        {
            Console.WriteLine($"Triggered switch {request.SwitchId} for Machine {request.MachineId}");
            return Task.FromResult(new MachineResponse() { ResultCode = 1 });
        }
    }
}
