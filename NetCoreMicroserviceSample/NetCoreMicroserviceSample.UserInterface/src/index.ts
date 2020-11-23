import 'bootstrap';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import { MachineConfigurationViewModel } from './viewModel';
import { NetCoreMicroserviceSampleApi } from './apiClient/netCoreMicroserviceSampleApi';
import { MachineSetting, MachineSettingsUpdateDto, MachineSwitch, UserProfile } from './apiClient/models';
import { HubConnectionBuilder } from '@aspnet/signalr';

// Global event listener to start interacting with the DOM/page once it's loaded
document.addEventListener('DOMContentLoaded', async () => {

    // setup the SignalR connection
    var hubConnection = new HubConnectionBuilder()
        .withUrl("/livedata")
        .build();
    hubConnection.start();

    // use a view model to get an abstraction of the DOM interaction model
    var viewModel = new MachineConfigurationViewModel();

    // load profile data of currently logged in user
    var profileClient = new NetCoreMicroserviceSampleApi({ baseUri: '/' });
    profileClient.getProfile().then(
        response => viewModel.profile = (<UserProfile>response).name,
        () => viewModel.profile = null);

    // register to the machine selected event and execute client side logic
    viewModel.selectMachine = async m => {
        console.log(m.name + ' selected');

        // fetch machine image data from the server
        const imageResponse = await client.getMachineImage(m.id);
        viewModel.machineImage = imageResponse._response.bodyAsText;

        // commnicate settings and switches to the view model for the appropriate visualization
        viewModel.settings = <MachineSetting[]><unknown>await client.getMachineSettings(m.id);
        viewModel.switches = <MachineSwitch[]><unknown>await client.getMachineSwitches(m.id);

        // reconnect to SignalR for sensor data streaming
        await hubConnection.stop();
        await hubConnection.start();

        // connect to machine data stream
        hubConnection.stream("MachineData", m.id)
            .subscribe({
                next: (value) => {
                    viewModel.sensorValue = value;
                },
                complete: () => {
                    console.log("complete");
                },
                error: (err) => {
                    console.log(err);
                },
            });
    }

    // react on the save settings button in the view model -> update settings on server via an API call
    viewModel.settingsSaveClicked = async (machine, settings) => {
        console.log("setting save clicked", machine, settings);

        // build server side DTO
        const settingsToUpdate = settings.map(s => <MachineSettingsUpdateDto>{
            id: s.id,
            value: s.value
        });

        await client.updateMachineSettings(machine.id, {
            body: settingsToUpdate
        });
    }

    // react on clicking a switch in the view model
    viewModel.switchClicked = async s => {
        console.log("switch clicked", s);

        await client.setMachineSwitch(s.machineId, s.id);
    }

    // get all machines from the API and set the view model property
    try {
        var client = new NetCoreMicroserviceSampleApi({ baseUri: '/' });
        const machines = await client.getAllMachines();

        viewModel.machines = machines;
    } catch (e) {
        console.error('Looks like there was a problem. Status Code: ' + e);
    }
}, false);

