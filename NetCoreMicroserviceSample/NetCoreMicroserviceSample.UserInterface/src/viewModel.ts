import { MachineMetadata, MachineSetting, MachineSwitch } from "./apiClient/models";
import { Machine } from "./apiClient/models/mappers";

export class MachineConfigurationViewModel {
    private loadingIndicator: HTMLDivElement;
    private loadedContent: HTMLDivElement;
    private machinesDropdown: HTMLSelectElement;
    private machineName: HTMLInputElement;
    private machineDescription: HTMLInputElement;
    private machineUpdateButton: HTMLButtonElement;
    private machineContainer: HTMLDivElement;
    private machineImageContainer: HTMLDivElement;

    private machineList: MachineMetadata[];
    private machineSwitches: MachineSwitch[];

    private selectedMachine: MachineMetadata;

    public selectMachine: (machine: MachineMetadata) => void;
    public updateMachineData: (machine: MachineMetadata) => void;

    public switchClicked: (machineSwitch: MachineSwitch) => void;

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

    public set settings(settings: MachineSetting[]) {
        settings.forEach(s => this.addSettingToImage(s));
    }

    public set switches(switches: any) { // TODO - why is the MachineSwitch[] not working here?
        this.machineSwitches = switches;
        switches.forEach(s => this.addSwitchToImage(s));
    }

    constructor() {
        this.loadingIndicator = <HTMLDivElement>document.getElementById('loading-indicator');
        this.loadedContent = <HTMLDivElement>document.getElementById('loaded-content');
        this.machinesDropdown = <HTMLSelectElement>document.getElementById('machines-dropdown');
        this.machineName = <HTMLInputElement>document.getElementById('machine-name');
        this.machineDescription = <HTMLInputElement>document.getElementById('machine-description');
        this.machineUpdateButton = <HTMLButtonElement>document.getElementById('machine-update-btn');
        this.machineContainer = <HTMLDivElement>document.getElementById('machine-container');
        this.machineImageContainer = <HTMLDivElement>document.getElementById('machine-image-container');

        this.machinesDropdown.onchange = ev => this.onSelectedMachineChanged(ev);
        this.machineUpdateButton.onclick = ev => this.onMachineUpdate(ev);
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

    private onSettingClicked(ev: Event) {
        console.log("setting clicked", (<HTMLElement>ev.target).id);
    }

    private onSwitchClicked(ev: Event) {
        if (this.switchClicked) {
            const clickedSwitch = this.machineSwitches.filter(s => s.id == (<HTMLElement>ev.target).id)[0];
            this.switchClicked(clickedSwitch);
        }
    }

    private setMachineMetadata(m: MachineMetadata) {
        this.machineName.value = m.name;
        this.machineDescription.value = m.description;
    }

    private onMachineUpdate(ev: Event): void {
        if (this.updateMachineData) {

            const dataToUpdate = { ... this.selectMachine };

            // this.updateMachineData()
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

    private addSettingToImage(setting: MachineSetting): void {
        // Add option to machine list
        const node = document.createElement('div');
        node.setAttribute('style', "cursor: pointer; font-size: 82px; color: red; position: absolute; left:" + setting.positionX + "px; top:" + setting.positionY + "px;");
        node.setAttribute('id', setting.id);
        const text = document.createTextNode("•");
        node.appendChild(text);

        node.onclick = ev => this.onSettingClicked(ev);

        this.machineContainer.appendChild(node);
    }

    private addSwitchToImage(switchToAdd: MachineSwitch): void {
        // Add option to machine list
        const node = document.createElement('button');
        node.setAttribute('style', "position: absolute; left:" + switchToAdd.positionX + "px; top:" + switchToAdd.positionY + "px;");
        node.setAttribute('id', switchToAdd.id);
        const text = document.createTextNode(switchToAdd.name);
        node.appendChild(text);

        node.onclick = ev => this.onSwitchClicked(ev);

        this.machineContainer.appendChild(node);
    }

    public removeLoadingIndicator(): void {
        this.loadingIndicator.hidden = true;
        this.loadedContent.hidden = false;
    }

    public setMachineImage(svgImage: string) {
        this.machineImageContainer.innerHTML = svgImage;
    }
}