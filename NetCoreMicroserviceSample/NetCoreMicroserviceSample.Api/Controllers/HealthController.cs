using Microsoft.AspNetCore.Mvc;

namespace NetCoreMicroserviceSample.Api.Controllers
{
    [Route("api/health")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet(Name = "GetHealth")]
        public string Get() => "I'm alive ;)";
    }
}
