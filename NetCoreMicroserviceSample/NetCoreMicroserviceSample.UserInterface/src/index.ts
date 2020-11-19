import 'bootstrap';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import { MachineConfigurationViewModel } from './viewModel';
import { NetCoreMicroserviceSampleApi } from './apiClient/netCoreMicroserviceSampleApi';
import { MachineSettingsUpdateDto } from './apiClient/models';

declare const API_DOMAIN: string;

document.addEventListener('DOMContentLoaded', async () => {
    var viewModel = new MachineConfigurationViewModel();

    viewModel.selectMachine = async m => {
        console.log(m.name + ' selected');

        const imageResponse = await client.getMachineImage(m.id);
        viewModel.setMachineImage(imageResponse._response.bodyAsText);

        viewModel.settings = await client.getMachineSettings(m.id);
        viewModel.switches = await client.getMachineSwitches(m.id);
    }

    viewModel.updateMachineData = async m => {
        await client.updateMachine(m);
    }

    viewModel.settingsSaveClicked = async (machine, settings) => {
        console.log("setting save clicked", machine, settings);

        const settingsToUpdate = settings.map(s => <MachineSettingsUpdateDto>{
            id: s.id,
            value: s.value
        });

        // console.log(settingsToUpdate);

        await client.updateMachineSettings(machine.id, {
            body: settingsToUpdate
        });
    }

    viewModel.switchClicked = async s => {
        console.log("switch clicked", s);

        await client.setMachineSwitch(s.machineId, s.id);
    }

    const initialHookDistance = -340;
    const maxHookDistance = 30;

    let hookDistanceX = initialHookDistance;

    try {
        var client = new NetCoreMicroserviceSampleApi({ baseUri: API_DOMAIN });
        const machines = await client.getAllMachines();

        viewModel.machines = machines;
        viewModel.removeLoadingIndicator();

        animateHook();

    } catch (e) {
        console.error('Looks like there was a problem. Status Code: ' + e);
    }

    function animateHook() {

        hookDistanceX += 5;
        if (hookDistanceX > maxHookDistance) {
            hookDistanceX = initialHookDistance;
        }

        // dom.hook.setAttribute('x', hookDistanceX + "")

        setTimeout(() => {
            animateHook();
        }, 200);
    }
}, false);

