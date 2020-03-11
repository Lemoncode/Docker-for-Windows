using System.Web.Http;

namespace Books.Api.Controllers
{
    [RoutePrefix("api/greet")]
    public class GreetController : ApiController
    {
        [HttpGet]
        [Route("hello")]
        public string SayHello()
        {
            return "Hello from server";
        }
    }
}
