import { MachineMetadata } from "./apiClient/models";
import { Machine } from "./apiClient/models/mappers";

export class MachineConfigurationViewModel {
    private loadingIndicator: HTMLDivElement;
    private loadedContent: HTMLDivElement;
    private machinesDropdown: HTMLSelectElement;
    private machineName: HTMLInputElement;
    private machineDescription: HTMLInputElement;
    private machineSaveButton: HTMLButtonElement;
    private machineImageContainer: HTMLDivElement;

    private machineList: MachineMetadata[];

    public selectMachine: (machine: MachineMetadata) => void;
    public updateMachineData: (machine: MachineMetadata) => void;

    public set machines(machines: MachineMetadata[]) {
        // Clear existing list of machines
        while (this.machinesDropdown.options.length > 0) {
            this.machinesDropdown.remove(0);
        }

        // Add all machines
        machines.forEach(m => this.addMachineToSelectionList(m));

        // Store machines for later use
        this.machineList = machines;
        if (this.selectMachine && this.machineList.length > 0) {
            // Select first machine and set metadata
            this.setMachineMetadata(this.machineList[0]);
            this.selectMachine(this.machineList[0]);
        }
    }

    constructor() {
        this.loadingIndicator = <HTMLDivElement>document.getElementById('loading-indicator');
        this.loadedContent = <HTMLDivElement>document.getElementById('loaded-content');
        this.machinesDropdown = <HTMLSelectElement>document.getElementById('machines-dropdown');
        this.machineName = <HTMLInputElement>document.getElementById('machine-name');
        this.machineDescription = <HTMLInputElement>document.getElementById('machine-description');
        this.machineSaveButton = <HTMLButtonElement>document.getElementById('machine-save-btn');
        this.machineImageContainer = <HTMLDivElement>document.getElementById('machine-container');

        this.machinesDropdown.onchange = ev => this.onSelectedMachineChanged(ev);
        this.machineSaveButton.onclick = ev => this.onMachineSave(ev);
    }

    private onSelectedMachineChanged(ev: Event): void {
        if (this.machineList && this.machineList.length > 0 && this.selectMachine) {
            // Get currently selected machine
            const machineId = ((<HTMLSelectElement>ev.target).value);
            if (machineId) {
                // Select machine
                const selectedMachine = this.machineList.filter(m => m.id === machineId)[0];
                this.setMachineMetadata(selectedMachine);
                this.selectMachine(selectedMachine);

            }
        }
    }

    private setMachineMetadata(m: MachineMetadata) {
        this.machineName.value = m.name;
        this.machineDescription.value = m.description;
    }

    private onMachineSave(ev: Event): void {
        if (this.updateMachineData) {
            this.selectMachine(null);
        }
    }

    private addMachineToSelectionList(machine: MachineMetadata, selected: boolean = true): void {
        // Add option to machine list
        const node = document.createElement('option');
        node.setAttribute('value', machine.id);
        const text = document.createTextNode(machine.name);
        node.appendChild(text);
        this.machinesDropdown.append(node);
    }

    public removeLoadingIndicator(): void {
        this.loadingIndicator.hidden = true;
        this.loadedContent.hidden = false;
    }

    public setMachineImage(svgImage: string) {
        this.machineImageContainer.innerHTML = svgImage;
    }
}