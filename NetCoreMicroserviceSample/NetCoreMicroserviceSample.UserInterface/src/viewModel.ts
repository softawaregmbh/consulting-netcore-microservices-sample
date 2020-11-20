import { Machine, MachineMetadata, MachineSetting, MachineSwitch } from "./apiClient/models";

export class MachineConfigurationViewModel {
    private profile: HTMLDivElement;
    private loadingIndicator: HTMLDivElement;
    private settingsContainer: HTMLDivElement;
    private loadedContent: HTMLDivElement;
    private machinesDropdown: HTMLSelectElement;
    private machineDescription: HTMLInputElement;
    private settingName: HTMLInputElement;
    private settingValue: HTMLInputElement;
    private settingsUpdateButton: HTMLButtonElement;
    private machineContainer: HTMLDivElement;
    private machineImageContainer: HTMLDivElement;
    private machineSensorValue: HTMLInputElement;
    private hook: HTMLElement;
    private login: HTMLAnchorElement;
    private logout: HTMLAnchorElement;

    private machineList: MachineMetadata[];
    private machineSettings: MachineSetting[];
    private machineSwitches: MachineSwitch[];

    private selectedMachine: MachineMetadata;
    private selectedSetting: MachineSetting;

    public selectMachine: (machine: MachineMetadata) => void;
    public updateMachineData: (machine: MachineMetadata) => void;

    public switchClicked: (machineSwitch: MachineSwitch) => void;
    public settingsSaveClicked: (machine: MachineMetadata, settings: MachineSetting[]) => void;

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
            // cleanup
            this.cleanUpImage();
            this.settingsContainer.hidden = true;

            this.selectedMachine = this.machineList[0];

            // Select first machine and set metadata
            this.setMachineMetadata(this.selectedMachine);
            this.selectMachine(this.selectedMachine);
        }
    }

    public set settings(settings: MachineSetting[]) {
        this.machineSettings = settings;
        settings.forEach(s => this.addSettingToImage(s));
    }

    public set switches(switches: any) { // TODO - why is the MachineSwitch[] not working here?
        this.machineSwitches = switches;
        switches.forEach(s => this.addSwitchToImage(s));
    }

    public set sensorValue(value: number) {
        this.machineSensorValue.value = value + "";

        this.hook = <HTMLElement>document.getElementById('hook');
        this.hook.setAttribute('x', value + "");
    }

    constructor() {
        this.loadingIndicator = <HTMLDivElement>document.getElementById('loading-indicator');
        this.settingsContainer = <HTMLDivElement>document.getElementById('settings');
        this.loadedContent = <HTMLDivElement>document.getElementById('loaded-content');
        this.machinesDropdown = <HTMLSelectElement>document.getElementById('machines-dropdown');
        this.machineDescription = <HTMLInputElement>document.getElementById('machine-description');
        this.settingName = <HTMLInputElement>document.getElementById('setting-name');
        this.settingValue = <HTMLInputElement>document.getElementById('setting-value');
        this.settingsUpdateButton = <HTMLButtonElement>document.getElementById('settings-update-btn');
        this.machineContainer = <HTMLDivElement>document.getElementById('machine-container');
        this.machineImageContainer = <HTMLDivElement>document.getElementById('machine-image-container');
        this.machineSensorValue = <HTMLInputElement>document.getElementById('machine-sensor-value');
        this.profile = <HTMLDivElement>document.getElementById('profile');
        this.login = <HTMLAnchorElement>document.getElementById('login');
        this.logout = <HTMLAnchorElement>document.getElementById('logout');

        this.machinesDropdown.onchange = ev => this.onSelectedMachineChanged(ev);
        this.settingsUpdateButton.onclick = ev => this.onSettingsUpdate(ev);
    }

    private onSelectedMachineChanged(ev: Event): void {
        if (this.machineList && this.machineList.length > 0 && this.selectMachine) {
            // Get currently selected machine
            const machineId = ((<HTMLSelectElement>ev.target).value);
            if (machineId) {

                // cleanup
                this.selectedSetting = null;
                this.settingsContainer.hidden = true;
                this.cleanUpImage();

                // Select machine
                this.selectedMachine = this.machineList.find(m => m.id === machineId);
                this.setMachineMetadata(this.selectedMachine);
                this.selectMachine(this.selectedMachine);
            }
        }
    }

    private onSettingClicked(ev: Event) {
        console.log("setting clicked", (<HTMLElement>ev.target).id);

        const clickedSetting = this.machineSettings.find(s => s.id == (<HTMLElement>ev.target).id);
        this.selectedSetting = clickedSetting;
        this.settingsContainer.hidden = false;
        this.settingName.value = clickedSetting.name;
        this.settingValue.value = clickedSetting.value + "";
    }

    private onSwitchClicked(ev: Event) {
        if (this.switchClicked) {
            const clickedSwitch = this.machineSwitches.find(s => s.id == (<HTMLElement>ev.target).id);
            this.switchClicked(clickedSwitch);
        }
    }

    private setMachineMetadata(m: MachineMetadata) {
        this.machineDescription.value = m.description;
    }

    private onSettingsUpdate(ev: Event): void {
        if (this.settingsSaveClicked && this.selectedSetting) {

            const dataToUpdate = [... this.machineSettings];

            var settingToUpdate = dataToUpdate.find(s => s.id === this.selectedSetting.id);
            settingToUpdate.value = parseFloat(this.settingValue.value);

            this.settingsSaveClicked(this.selectedMachine, dataToUpdate);
        }
    }

    private cleanUpImage() {
        this.machineContainer.innerHTML = "";

        const imageContainer = document.createElement('div');
        imageContainer.setAttribute("id", "machine-image-container");

        this.machineImageContainer = imageContainer;

        this.machineContainer.appendChild(imageContainer);
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

    public setProfile(profile: (string | null)) {
        this.profile.innerText = profile ?? '';
        this.login.hidden = !!profile;
        this.logout.hidden = !!!profile;
    }
}