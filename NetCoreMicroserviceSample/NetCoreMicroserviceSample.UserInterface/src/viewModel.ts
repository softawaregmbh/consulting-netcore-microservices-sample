import { Machine, MachineMetadata, MachineSetting, MachineSwitch } from "./apiClient/models";

export class MachineConfigurationViewModel {
    //#region Get references to HTML elements
    private profile: HTMLDivElement = <HTMLDivElement>document.getElementById('profile');
    private login: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById('login');
    private logout: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById('logout');
    private profileLoadingIndicator: HTMLDivElement = <HTMLDivElement>document.getElementById('profile-loading-indicator');
    private profileLoadedContent: HTMLDivElement = <HTMLDivElement>document.getElementById('profile-loaded');
    private welcome: HTMLDivElement = <HTMLParagraphElement>document.getElementById('welcome');
    private loadingIndicator: HTMLDivElement = <HTMLDivElement>document.getElementById('loading-indicator');
    private settingsContainer: HTMLDivElement = <HTMLDivElement>document.getElementById('settings');
    private loadedContent: HTMLDivElement = <HTMLDivElement>document.getElementById('loaded-content');
    private machinesDropdown: HTMLSelectElement = <HTMLSelectElement>document.getElementById('machines-dropdown');
    private machineDescription: HTMLInputElement = <HTMLInputElement>document.getElementById('machine-description');
    private settingName: HTMLInputElement = <HTMLInputElement>document.getElementById('setting-name');
    private settingValue: HTMLInputElement = <HTMLInputElement>document.getElementById('setting-value');
    private settingsUpdateButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('settings-update-btn');
    private machineContainer: HTMLDivElement = <HTMLDivElement>document.getElementById('machine-container');
    private machineImageContainer: HTMLDivElement = <HTMLDivElement>document.getElementById('machine-image-container');
    private machineSensorValue: HTMLInputElement = <HTMLInputElement>document.getElementById('machine-sensor-value');
    private hook: HTMLElement;
    //#endregion

    //#region Internal fields holding state
    private machineList: MachineMetadata[];
    private machineSettings: MachineSetting[];
    private machineSwitches: MachineSwitch[];
    private selectedMachine: MachineMetadata;
    private selectedSetting: MachineSetting;
    //#endregion

    //#region Callbacks
    /** Callback that will be called when the user selects a new machine */
    public selectMachine: (machine: MachineMetadata) => void;

    /** Callback that will be called when the user clicks on a switch */
    public switchClicked: (machineSwitch: MachineSwitch) => void;

    /** Callback that will be called when the user requests to store machine settings */
    public settingsSaveClicked: (machine: MachineMetadata, settings: MachineSetting[]) => void;
    //#endregion

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
        const isSignedIn = !!profile;

        // Remove loading indicator
        this.profileLoadingIndicator.hidden = true;
        this.profileLoadedContent.hidden = false;

        // Display welcome message if user is signed in
        this.welcome.hidden = !isSignedIn;
        this.profile.innerText = profile ?? '';

        // Hide/show login/logout depending on whether the user is signed in
        this.login.hidden = isSignedIn;
        this.logout.hidden = !isSignedIn;
    }
}