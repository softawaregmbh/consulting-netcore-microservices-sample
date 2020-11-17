# NetCoreMicroserviceSample

This sample project consists of multiple (micro-)services based on .NET 5. It's part of a consulting workshop and free to use.

## Technologies

The following technologies should be demonstrated:

* OAuth 2, OpenID Connect, JWT, ASP.NET JWT Middleware
* ASP.NET (Web API) and the Open API Specification (Swagger)
* gRPC, ASP.NET gRPC
* .NET in Docker/K8s
* SignalR
* TypeScript 

## Project architecture

TODO: graphic goes here ;)

## Overall project folder structure

The following (sub-)projects are part of this sample:

* [Main .NET 5 project](NetCoreMicroserviceSample/NetCoreMicroserviceSample.Common) with base domain classes and interfaces
* [ASP .NET project](NetCoreMicroserviceSample/NetCoreMicroserviceSample.Api) with API controllers and REST service endpoints
* [gRPC machine simulation](NetCoreMicroserviceSample/NetCoreMicroserviceSample.Machine) as remote machine data service
* [HTML5 web frontend](NetCoreMicroserviceSample/NetCoreMicroserviceSample.Web) as simple 2D HMI frontend
* [In memory implementation of the data repository](NetCoreMicroserviceSample/NetCoreMicroserviceSample.Repositories.InMemory) for storing sample machine data (without a "real" database)

## open questions, TODOs, to discuss
* Should we use the domain model classes in the REST interface or should we build separated DTOs?

## Notes

Project is built with [GitHub Actions](.github/workflows/build.yml).
