using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NetCoreMicroserviceSample.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Auth : ControllerBase
    {
        [HttpGet("login", Name = "Login")]
        public async Task Login()
        {
            await HttpContext.ChallengeAsync("IdentityServer", new AuthenticationProperties() { RedirectUri = "/" });
        }

        [HttpGet("logout", Name = "Logout")]
        public async Task Logout()
        {
            await HttpContext.SignOutAsync("IdentityServer");
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpGet("profile", Name = "GetProfile")]
        [Authorize]
        [ProducesResponseType(typeof(UserProfile), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        public IActionResult GetProfile()
        {
            var identity = HttpContext.User.Identities.First();
            return Ok(new UserProfile(
                identity.Claims.First(c => c.Type == ClaimTypes.Name).Value,
                identity.Claims.First(c => c.Type == ClaimTypes.Email).Value,
                identity.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value));
        }
    }
}
