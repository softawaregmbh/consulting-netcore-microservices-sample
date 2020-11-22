/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ServiceClientOptions } from "@azure/ms-rest-js";
import * as msRest from "@azure/ms-rest-js";

/**
 * An interface representing MachineMetadata.
 */
export interface MachineMetadata {
  id?: string;
  name?: string;
  description?: string;
}

/**
 * An interface representing MachineSwitch.
 */
export interface MachineSwitch {
  id?: string;
  machineId?: string;
  machine?: Machine;
  name?: string;
  description?: string;
  positionX?: number;
  positionY?: number;
}

/**
 * An interface representing Machine.
 */
export interface Machine {
  id?: string;
  name?: string;
  svgImage?: string;
  description?: string;
  /**
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly settings?: MachineSetting[];
  /**
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly switches?: MachineSwitch[];
}

/**
 * An interface representing MachineSetting.
 */
export interface MachineSetting {
  id?: string;
  machineId?: string;
  machine?: Machine;
  name?: string;
  description?: string;
  value?: number;
  positionX?: number;
  positionY?: number;
}

/**
 * An interface representing MachineSettingsUpdateDto.
 */
export interface MachineSettingsUpdateDto {
  id?: string;
  value?: number;
}

/**
 * An interface representing ProblemDetails.
 */
export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  /**
   * Describes unknown properties. The value of an unknown property can be of "any" type.
   */
  [property: string]: any;
}

/**
 * An interface representing UserProfile.
 */
export interface UserProfile {
  name?: string;
  email?: string;
  subject?: string;
}

/**
 * An interface representing NetCoreMicroserviceSampleApiOptions.
 */
export interface NetCoreMicroserviceSampleApiOptions extends ServiceClientOptions {
  baseUri?: string;
}

/**
 * Optional Parameters.
 */
export interface NetCoreMicroserviceSampleApiAddMachineOptionalParams extends msRest.RequestOptionsBase {
  /**
   * Machine to create
   */
  body?: Machine;
}

/**
 * Optional Parameters.
 */
export interface NetCoreMicroserviceSampleApiUpdateMachineOptionalParams extends msRest.RequestOptionsBase {
  /**
   * Machine data
   */
  body?: Machine;
}

/**
 * Optional Parameters.
 */
export interface NetCoreMicroserviceSampleApiUpdateMachineSettingsOptionalParams extends msRest.RequestOptionsBase {
  /**
   * Settings to write
   */
  body?: MachineSettingsUpdateDto[];
}

/**
 * Defines headers for AddMachine operation.
 */
export interface AddMachineHeaders {
  /**
   * Location of the created machine
   */
  location: string;
}

/**
 * Contains response data for the logout operation.
 */
export type LogoutResponse = ProblemDetails & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ProblemDetails;
    };
};

/**
 * Contains response data for the getProfile operation.
 */
export type GetProfileResponse = {
  /**
   * The parsed response body.
   */
  body: any;

  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: any;
    };
};

/**
 * Contains response data for the getHealth operation.
 */
export type GetHealthResponse = {
  /**
   * The parsed response body.
   */
  body: string;

  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: string;
    };
};

/**
 * Contains response data for the getAllMachines operation.
 */
export type GetAllMachinesResponse = Array<MachineMetadata> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: MachineMetadata[];
    };
};

/**
 * Contains response data for the addMachine operation.
 */
export type AddMachineResponse = Machine & AddMachineHeaders & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: AddMachineHeaders;

      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Machine;
    };
};

/**
 * Contains response data for the machineById operation.
 */
export type MachineByIdResponse = {
  /**
   * The parsed response body.
   */
  body: any;

  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: any;
    };
};

/**
 * Contains response data for the updateMachine operation.
 */
export type UpdateMachineResponse = {
  /**
   * The parsed response body.
   */
  body: any;

  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: any;
    };
};

/**
 * Contains response data for the deleteMachine operation.
 */
export type DeleteMachineResponse = ProblemDetails & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ProblemDetails;
    };
};

/**
 * Contains response data for the getMachineImage operation.
 */
export type GetMachineImageResponse = ProblemDetails & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ProblemDetails;
    };
};

/**
 * Contains response data for the getMachineSettings operation.
 */
export type GetMachineSettingsResponse = {
  /**
   * The parsed response body.
   */
  body: any;

  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: any;
    };
};

/**
 * Contains response data for the updateMachineSettings operation.
 */
export type UpdateMachineSettingsResponse = ProblemDetails & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ProblemDetails;
    };
};

/**
 * Contains response data for the getMachineSwitches operation.
 */
export type GetMachineSwitchesResponse = {
  /**
   * The parsed response body.
   */
  body: any;

  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: any;
    };
};

/**
 * Contains response data for the setMachineSwitch operation.
 */
export type SetMachineSwitchResponse = ProblemDetails & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ProblemDetails;
    };
};
