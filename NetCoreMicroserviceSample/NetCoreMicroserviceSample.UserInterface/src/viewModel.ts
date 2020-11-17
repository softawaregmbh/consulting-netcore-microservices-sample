import { Machine } from './dtos/machine';

export class MachineConfigurationViewModel {
    private loadingIndicator: HTMLDivElement;
    private loadedContent: HTMLDivElement;
    private machinesDropdown: HTMLSelectElement;
    private machineList: Machine[];

    public selectMachine: (machine: Machine) => void;
    
    public set machines(machines: Machine[]) {
        // Clear existing list of machines
        while (this.machinesDropdown.options.length > 0)
        {
            this.machinesDropdown.remove(0);
        }

        // Add all machines
        machines.forEach(m => this.addMachineToSelectionList(m));

        // Store machines for later use
        this.machineList = machines;
        if (this.selectMachine && this.machineList.length > 0) {
            // Select first machine
            this.selectMachine(this.machineList[0]);
        }
    }

    constructor() {
        this.loadingIndicator = <HTMLDivElement>document.getElementById('loading-indicator');
        this.loadedContent = <HTMLDivElement>document.getElementById('loaded-content');
        this.machinesDropdown = <HTMLSelectElement>document.getElementById('machines-dropdown');

        this.machinesDropdown.onchange = ev => this.onSelectedMachineChanged(ev);
    }

    private onSelectedMachineChanged(ev: Event): void {
        if (this.machineList && this.machineList.length > 0 && this.selectMachine) {
            // Get currently selected machine
            const machineId = ((<HTMLSelectElement>ev.target).value);
            if (machineId) {
                // Select machine
                const selectedMachine = this.machineList.filter(m => m.id === machineId)[0];
                this.selectMachine(selectedMachine);
            }
        }
    }

    private addMachineToSelectionList(machine: Machine, selected: boolean = true): void {
        // Add option to machine list
        const node = document.createElement('option');
        node.setAttribute('value', machine.id);
        const text = document.createTextNode(machine.description);
        node.appendChild(text);
        this.machinesDropdown.append(node);
    }

    public removeLoadingIndicator(): void {
        this.loadingIndicator.hidden = true;
        this.loadedContent.hidden = false;
    }
}