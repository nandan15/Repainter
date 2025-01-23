using Microsoft.AspNetCore.Mvc;

namespace RepainterAPI.Controllers.v1.Package
{
    public class PackageQueryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
