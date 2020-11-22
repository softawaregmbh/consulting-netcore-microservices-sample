/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as Parameters from "./models/parameters";
import { NetCoreMicroserviceSampleApiContext } from "./netCoreMicroserviceSampleApiContext";

class NetCoreMicroserviceSampleApi extends NetCoreMicroserviceSampleApiContext {
  /**
   * Initializes a new instance of the NetCoreMicroserviceSampleApi class.
   * @param [options] The parameter options
   */
  constructor(options?: Models.NetCoreMicroserviceSampleApiOptions) {
    super(options);
  }

  /**
   * @summary Trigger login process
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  login(options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param callback The callback
   */
  login(callback: msRest.ServiceCallback<void>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  login(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  login(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      loginOperationSpec,
      callback);
  }

  /**
   * @summary Trigger logout process
   * @param [options] The optional parameters
   * @returns Promise<Models.LogoutResponse>
   */
  logout(options?: msRest.RequestOptionsBase): Promise<Models.LogoutResponse>;
  /**
   * @param callback The callback
   */
  logout(callback: msRest.ServiceCallback<Models.ProblemDetails>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  logout(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ProblemDetails>): void;
  logout(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ProblemDetails>, callback?: msRest.ServiceCallback<Models.ProblemDetails>): Promise<Models.LogoutResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      logoutOperationSpec,
      callback) as Promise<Models.LogoutResponse>;
  }

  /**
   * @summary Get user profile of currently signed in user
   * @param [options] The optional parameters
   * @returns Promise<Models.GetProfileResponse>
   */
  getProfile(options?: msRest.RequestOptionsBase): Promise<Models.GetProfileResponse>;
  /**
   * @param callback The callback
   */
  getProfile(callback: msRest.ServiceCallback<any>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getProfile(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<any>): void;
  getProfile(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<any>, callback?: msRest.ServiceCallback<any>): Promise<Models.GetProfileResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      getProfileOperationSpec,
      callback) as Promise<Models.GetProfileResponse>;
  }

  /**
   * @summary Find out whether API is running
   * @param [options] The optional parameters
   * @returns Promise<Models.GetHealthResponse>
   */
  getHealth(options?: msRest.RequestOptionsBase): Promise<Models.GetHealthResponse>;
  /**
   * @param callback The callback
   */
  getHealth(callback: msRest.ServiceCallback<string>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getHealth(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<string>): void;
  getHealth(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<string>, callback?: msRest.ServiceCallback<string>): Promise<Models.GetHealthResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      getHealthOperationSpec,
      callback) as Promise<Models.GetHealthResponse>;
  }

  /**
   * @summary Get a list of available machines
   * @param [options] The optional parameters
   * @returns Promise<Models.GetAllMachinesResponse>
   */
  getAllMachines(options?: msRest.RequestOptionsBase): Promise<Models.GetAllMachinesResponse>;
  /**
   * @param callback The callback
   */
  getAllMachines(callback: msRest.ServiceCallback<Models.MachineMetadata[]>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getAllMachines(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.MachineMetadata[]>): void;
  getAllMachines(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.MachineMetadata[]>, callback?: msRest.ServiceCallback<Models.MachineMetadata[]>): Promise<Models.GetAllMachinesResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      getAllMachinesOperationSpec,
      callback) as Promise<Models.GetAllMachinesResponse>;
  }

  /**
   * @summary Create a machine
   * @param [options] The optional parameters
   * @returns Promise<Models.AddMachineResponse>
   */
  addMachine(options?: Models.NetCoreMicroserviceSampleApiAddMachineOptionalParams): Promise<Models.AddMachineResponse>;
  /**
   * @param callback The callback
   */
  addMachine(callback: msRest.ServiceCallback<Models.Machine>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  addMachine(options: Models.NetCoreMicroserviceSampleApiAddMachineOptionalParams, callback: msRest.ServiceCallback<Models.Machine>): void;
  addMachine(options?: Models.NetCoreMicroserviceSampleApiAddMachineOptionalParams | msRest.ServiceCallback<Models.Machine>, callback?: msRest.ServiceCallback<Models.Machine>): Promise<Models.AddMachineResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      addMachineOperationSpec,
      callback) as Promise<Models.AddMachineResponse>;
  }

  /**
   * @summary Get a machine by id
   * @param id ID of the machine to get
   * @param [options] The optional parameters
   * @returns Promise<Models.MachineByIdResponse>
   */
  machineById(id: string, options?: msRest.RequestOptionsBase): Promise<Models.MachineByIdResponse>;
  /**
   * @param id ID of the machine to get
   * @param callback The callback
   */
  machineById(id: string, callback: msRest.ServiceCallback<any>): void;
  /**
   * @param id ID of the machine to get
   * @param options The optional parameters
   * @param callback The callback
   */
  machineById(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<any>): void;
  machineById(id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<any>, callback?: msRest.ServiceCallback<any>): Promise<Models.MachineByIdResponse> {
    return this.sendOperationRequest(
      {
        id,
        options
      },
      machineByIdOperationSpec,
      callback) as Promise<Models.MachineByIdResponse>;
  }

  /**
   * ID in URL and body must match. If they don't, bad request is returned.
   * @summary Update machine with given id
   * @param id ID of the machine to update
   * @param [options] The optional parameters
   * @returns Promise<Models.UpdateMachineResponse>
   */
  updateMachine(id: string, options?: Models.NetCoreMicroserviceSampleApiUpdateMachineOptionalParams): Promise<Models.UpdateMachineResponse>;
  /**
   * @param id ID of the machine to update
   * @param callback The callback
   */
  updateMachine(id: string, callback: msRest.ServiceCallback<any>): void;
  /**
   * @param id ID of the machine to update
   * @param options The optional parameters
   * @param callback The callback
   */
  updateMachine(id: string, options: Models.NetCoreMicroserviceSampleApiUpdateMachineOptionalParams, callback: msRest.ServiceCallback<any>): void;
  updateMachine(id: string, options?: Models.NetCoreMicroserviceSampleApiUpdateMachineOptionalParams | msRest.ServiceCallback<any>, callback?: msRest.ServiceCallback<any>): Promise<Models.UpdateMachineResponse> {
    return this.sendOperationRequest(
      {
        id,
        options
      },
      updateMachineOperationSpec,
      callback) as Promise<Models.UpdateMachineResponse>;
  }

  /**
   * @summary Delete a machine with given ID
   * @param id ID of the machine to delete
   * @param [options] The optional parameters
   * @returns Promise<Models.DeleteMachineResponse>
   */
  deleteMachine(id: string, options?: msRest.RequestOptionsBase): Promise<Models.DeleteMachineResponse>;
  /**
   * @param id ID of the machine to delete
   * @param callback The callback
   */
  deleteMachine(id: string, callback: msRest.ServiceCallback<Models.ProblemDetails>): void;
  /**
   * @param id ID of the machine to delete
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteMachine(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ProblemDetails>): void;
  deleteMachine(id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ProblemDetails>, callback?: msRest.ServiceCallback<Models.ProblemDetails>): Promise<Models.DeleteMachineResponse> {
    return this.sendOperationRequest(
      {
        id,
        options
      },
      deleteMachineOperationSpec,
      callback) as Promise<Models.DeleteMachineResponse>;
  }

  /**
   * @summary Get SVG image for machine with given ID
   * @param id ID of the machine
   * @param [options] The optional parameters
   * @returns Promise<Models.GetMachineImageResponse>
   */
  getMachineImage(id: string, options?: msRest.RequestOptionsBase): Promise<Models.GetMachineImageResponse>;
  /**
   * @param id ID of the machine
   * @param callback The callback
   */
  getMachineImage(id: string, callback: msRest.ServiceCallback<Models.ProblemDetails>): void;
  /**
   * @param id ID of the machine
   * @param options The optional parameters
   * @param callback The callback
   */
  getMachineImage(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ProblemDetails>): void;
  getMachineImage(id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ProblemDetails>, callback?: msRest.ServiceCallback<Models.ProblemDetails>): Promise<Models.GetMachineImageResponse> {
    return this.sendOperationRequest(
      {
        id,
        options
      },
      getMachineImageOperationSpec,
      callback) as Promise<Models.GetMachineImageResponse>;
  }

  /**
   * @summary Get settings for a given machine
   * @param id Machine ID
   * @param [options] The optional parameters
   * @returns Promise<Models.GetMachineSettingsResponse>
   */
  getMachineSettings(id: string, options?: msRest.RequestOptionsBase): Promise<Models.GetMachineSettingsResponse>;
  /**
   * @param id Machine ID
   * @param callback The callback
   */
  getMachineSettings(id: string, callback: msRest.ServiceCallback<any>): void;
  /**
   * @param id Machine ID
   * @param options The optional parameters
   * @param callback The callback
   */
  getMachineSettings(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<any>): void;
  getMachineSettings(id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<any>, callback?: msRest.ServiceCallback<any>): Promise<Models.GetMachineSettingsResponse> {
    return this.sendOperationRequest(
      {
        id,
        options
      },
      getMachineSettingsOperationSpec,
      callback) as Promise<Models.GetMachineSettingsResponse>;
  }

  /**
   * @summary Write settings to DB and to machine
   * @param id ID of machine
   * @param [options] The optional parameters
   * @returns Promise<Models.UpdateMachineSettingsResponse>
   */
  updateMachineSettings(id: string, options?: Models.NetCoreMicroserviceSampleApiUpdateMachineSettingsOptionalParams): Promise<Models.UpdateMachineSettingsResponse>;
  /**
   * @param id ID of machine
   * @param callback The callback
   */
  updateMachineSettings(id: string, callback: msRest.ServiceCallback<Models.ProblemDetails>): void;
  /**
   * @param id ID of machine
   * @param options The optional parameters
   * @param callback The callback
   */
  updateMachineSettings(id: string, options: Models.NetCoreMicroserviceSampleApiUpdateMachineSettingsOptionalParams, callback: msRest.ServiceCallback<Models.ProblemDetails>): void;
  updateMachineSettings(id: string, options?: Models.NetCoreMicroserviceSampleApiUpdateMachineSettingsOptionalParams | msRest.ServiceCallback<Models.ProblemDetails>, callback?: msRest.ServiceCallback<Models.ProblemDetails>): Promise<Models.UpdateMachineSettingsResponse> {
    return this.sendOperationRequest(
      {
        id,
        options
      },
      updateMachineSettingsOperationSpec,
      callback) as Promise<Models.UpdateMachineSettingsResponse>;
  }

  /**
   * @summary Get switches for a given machine
   * @param id Machine ID
   * @param [options] The optional parameters
   * @returns Promise<Models.GetMachineSwitchesResponse>
   */
  getMachineSwitches(id: string, options?: msRest.RequestOptionsBase): Promise<Models.GetMachineSwitchesResponse>;
  /**
   * @param id Machine ID
   * @param callback The callback
   */
  getMachineSwitches(id: string, callback: msRest.ServiceCallback<any>): void;
  /**
   * @param id Machine ID
   * @param options The optional parameters
   * @param callback The callback
   */
  getMachineSwitches(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<any>): void;
  getMachineSwitches(id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<any>, callback?: msRest.ServiceCallback<any>): Promise<Models.GetMachineSwitchesResponse> {
    return this.sendOperationRequest(
      {
        id,
        options
      },
      getMachineSwitchesOperationSpec,
      callback) as Promise<Models.GetMachineSwitchesResponse>;
  }

  /**
   * @summary Trigger switch (sent to machine)
   * @param id ID of machine
   * @param switchId ID of switch
   * @param [options] The optional parameters
   * @returns Promise<Models.SetMachineSwitchResponse>
   */
  setMachineSwitch(id: string, switchId: string, options?: msRest.RequestOptionsBase): Promise<Models.SetMachineSwitchResponse>;
  /**
   * @param id ID of machine
   * @param switchId ID of switch
   * @param callback The callback
   */
  setMachineSwitch(id: string, switchId: string, callback: msRest.ServiceCallback<Models.ProblemDetails>): void;
  /**
   * @param id ID of machine
   * @param switchId ID of switch
   * @param options The optional parameters
   * @param callback The callback
   */
  setMachineSwitch(id: string, switchId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ProblemDetails>): void;
  setMachineSwitch(id: string, switchId: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ProblemDetails>, callback?: msRest.ServiceCallback<Models.ProblemDetails>): Promise<Models.SetMachineSwitchResponse> {
    return this.sendOperationRequest(
      {
        id,
        switchId,
        options
      },
      setMachineSwitchOperationSpec,
      callback) as Promise<Models.SetMachineSwitchResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const loginOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/Auth/login",
  responses: {
    200: {},
    default: {}
  },
  serializer
};

const logoutOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/Auth/logout",
  responses: {
    200: {},
    401: {
      bodyMapper: Mappers.ProblemDetails
    },
    default: {}
  },
  serializer
};

const getProfileOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/Auth/profile",
  responses: {
    200: {
      bodyMapper: Mappers.UserProfile
    },
    401: {
      bodyMapper: Mappers.ProblemDetails
    },
    default: {}
  },
  serializer
};

const getHealthOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/health",
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "String"
        }
      }
    },
    default: {}
  },
  serializer
};

const getAllMachinesOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/machines",
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MachineMetadata"
            }
          }
        }
      }
    },
    default: {}
  },
  serializer
};

const addMachineOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "api/machines",
  requestBody: {
    parameterPath: [
      "options",
      "body"
    ],
    mapper: Mappers.Machine
  },
  responses: {
    201: {
      bodyMapper: Mappers.Machine,
      headersMapper: Mappers.AddMachineHeaders
    },
    default: {}
  },
  serializer
};

const machineByIdOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/machines/{id}",
  urlParameters: [
    Parameters.id
  ],
  responses: {
    200: {
      bodyMapper: Mappers.MachineMetadata
    },
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    default: {}
  },
  serializer
};

const updateMachineOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "api/machines/{id}",
  urlParameters: [
    Parameters.id
  ],
  requestBody: {
    parameterPath: [
      "options",
      "body"
    ],
    mapper: Mappers.Machine
  },
  responses: {
    200: {
      bodyMapper: Mappers.Machine
    },
    400: {
      bodyMapper: Mappers.ProblemDetails
    },
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    default: {}
  },
  serializer
};

const deleteMachineOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "api/machines/{id}",
  urlParameters: [
    Parameters.id
  ],
  responses: {
    204: {},
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    default: {}
  },
  serializer
};

const getMachineImageOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/machines/{id}/image",
  urlParameters: [
    Parameters.id
  ],
  responses: {
    200: {},
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    default: {}
  },
  serializer
};

const getMachineSettingsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/machines/{id}/settings",
  urlParameters: [
    Parameters.id
  ],
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MachineSetting"
            }
          }
        }
      }
    },
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    default: {}
  },
  serializer
};

const updateMachineSettingsOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "api/machines/{id}/settings",
  urlParameters: [
    Parameters.id
  ],
  requestBody: {
    parameterPath: [
      "options",
      "body"
    ],
    mapper: {
      serializedName: "body",
      type: {
        name: "Sequence",
        element: {
          type: {
            name: "Composite",
            className: "MachineSettingsUpdateDto"
          }
        }
      }
    }
  },
  responses: {
    200: {},
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    default: {}
  },
  serializer
};

const getMachineSwitchesOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "api/machines/{id}/switches",
  urlParameters: [
    Parameters.id
  ],
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MachineSwitch"
            }
          }
        }
      }
    },
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    default: {}
  },
  serializer
};

const setMachineSwitchOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "api/machines/{id}/switches/{switchId}",
  urlParameters: [
    Parameters.id,
    Parameters.switchId
  ],
  responses: {
    200: {},
    404: {
      bodyMapper: Mappers.ProblemDetails
    },
    default: {}
  },
  serializer
};

export {
  NetCoreMicroserviceSampleApi,
  NetCoreMicroserviceSampleApiContext,
  Models as NetCoreMicroserviceSampleApiModels,
  Mappers as NetCoreMicroserviceSampleApiMappers
};
