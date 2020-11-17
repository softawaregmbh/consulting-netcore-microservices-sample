/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as msRest from "@azure/ms-rest-js";


export const MachineMetadata: msRest.CompositeMapper = {
  serializedName: "MachineMetadata",
  type: {
    name: "Composite",
    className: "MachineMetadata",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "Uuid"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Machine: msRest.CompositeMapper = {
  serializedName: "Machine",
  type: {
    name: "Composite",
    className: "Machine",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "Uuid"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      svgImage: {
        serializedName: "svgImage",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ProblemDetails: msRest.CompositeMapper = {
  serializedName: "ProblemDetails",
  type: {
    name: "Composite",
    className: "ProblemDetails",
    modelProperties: {
      type: {
        serializedName: "type",
        type: {
          name: "String"
        }
      },
      title: {
        serializedName: "title",
        type: {
          name: "String"
        }
      },
      status: {
        nullable: true,
        serializedName: "status",
        type: {
          name: "Number"
        }
      },
      detail: {
        serializedName: "detail",
        type: {
          name: "String"
        }
      },
      instance: {
        serializedName: "instance",
        type: {
          name: "String"
        }
      }
    },
    additionalProperties: {
      type: {
        name: "Object"
      }
    }
  }
};