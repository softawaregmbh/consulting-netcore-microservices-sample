using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace NetCoreMicroserviceSample.Api.Controllers
{
    [Route("api/health")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        /// <summary>
        /// Find out whether API is running
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = "GetHealth")]
        [Produces(MediaTypeNames.Text.Html)]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public string Get() => "I'm alive ;)";
    }
}
