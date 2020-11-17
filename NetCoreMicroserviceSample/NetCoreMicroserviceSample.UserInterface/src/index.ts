import 'bootstrap';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import { MachineConfigurationViewModel } from './viewModel';
import { NetCoreMicroserviceSampleApi } from './apiClient/netCoreMicroserviceSampleApi';

declare const API_DOMAIN: string;

document.addEventListener('DOMContentLoaded', async () => {
    var viewModel = new MachineConfigurationViewModel();
    viewModel.selectMachine = m => {
        console.log(m.name + ' selected');
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

