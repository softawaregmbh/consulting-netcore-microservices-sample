import 'bootstrap';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Machine } from './dtos/machine';
import { MachineConfigurationViewModel } from './viewModel';

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
        const machinesRaw = await fetch(API_DOMAIN + '/api/machines');
        const machines = await machinesRaw.json() as Machine[];

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

