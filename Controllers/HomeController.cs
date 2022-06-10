using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UGrow.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Añadir_usuarios()
        {
            return View();
        }

        public ActionResult Gestionar_permisos()
        {
            return View();
        }

        public ActionResult Editar_permiso()
        {
            return View();
        }


        public ActionResult Añadir_encuesta()
        {
            return View();
        }

        public ActionResult Editar_encuesta()
        {
            return View();
        }


        public ActionResult Encuestas_asignadas()
        {
            return View();
        }


        public ActionResult Lista_de_usuarios()
        {
            return View();
        }

        public ActionResult Añadir_encuesta_a_usuario()
        {
            return View();
        }


        public ActionResult Resultados_de_mis_usuarios()
        {
            return View();
        }


        public ActionResult Ver_mis_resultados()
        {
            return View();
        }

        public ActionResult myIndividualResult()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}