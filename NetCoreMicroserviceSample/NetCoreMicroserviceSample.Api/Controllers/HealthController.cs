using Microsoft.AspNetCore.Mvc;

namespace NetCoreMicroserviceSample.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public string Get() => "I'm alive ;)";
    }
}
