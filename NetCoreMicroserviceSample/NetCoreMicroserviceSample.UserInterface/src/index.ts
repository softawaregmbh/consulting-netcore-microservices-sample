import 'bootstrap';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Machine } from './dtos/machine';

declare const API_DOMAIN: string;

document.addEventListener('DOMContentLoaded', async () => {
    console.log(API_DOMAIN);

    const dom = {
        loadingIndicator: document.getElementById('loading-indicator'),
        loadedContent: document.getElementById('loaded-content'),
        machinesDropdown: document.getElementById('machines-dropdown'),
        hook: document.getElementById('hook')
    };

    const initialHookDistance = -340;
    const maxHookDistance = 30;

    let hookDistanceX = initialHookDistance;

    try {
        const machinesRaw = await fetch(API_DOMAIN + '/api/machines');
        const machines = await machinesRaw.json() as Machine[];

        for (let m of machines) {
            const node = document.createElement('a');
            node.setAttribute('class', 'dropdown-item');

            const text = document.createTextNode(m.name);
            node.appendChild(text);

            node.addEventListener("click", () => selectMachine(m));

            dom.machinesDropdown.append(node);
        };

        dom.loadingIndicator.hidden = true;
        dom.loadedContent.hidden = false;

        animateHook();

    } catch (e) {
        console.error('Looks like there was a problem. Status Code: ' + e);
    }

    async function selectMachine(m: Machine) {
        console.log(m.name + ' selected');
    }

    function animateHook() {

        hookDistanceX += 5;
        if (hookDistanceX > maxHookDistance) {
            hookDistanceX = initialHookDistance;
        }

        dom.hook.setAttribute('x', hookDistanceX + "")

        setTimeout(() => {
            animateHook();
        }, 200);
    }
}, false);

