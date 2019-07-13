using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CashRegister.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CashRegister.Web.Controllers
{
    [Route("api/registers")]
    [ApiController]

    public class RegisterController : ControllerBase
    {
        private IRegisterRepository _registerRepository;

        public RegisterController(IRegisterRepository registerRepository)
        {
            _registerRepository = registerRepository;
        }

        [HttpGet("all")]

        public IActionResult GetAll()
        {
            return Ok(_registerRepository.GetAll());
        }

        [HttpGet("get-by-id/{id}")]

        public IActionResult GetById(int id)
        {
            var register = _registerRepository.GetById(id);

            if (register == null) return NotFound();

            return Ok(register);
        }
    }
}
