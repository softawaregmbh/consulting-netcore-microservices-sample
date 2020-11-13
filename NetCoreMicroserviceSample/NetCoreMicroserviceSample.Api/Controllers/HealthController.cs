namespace NetCoreMicroserviceSample.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public string Get() => "I'm alive ;)";
    }
}
