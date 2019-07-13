using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CashRegister.Web.Controllers
{
    [Route("api/cashiers")]
    [ApiController]
    public class CashierController : ControllerBase
    {
		private readonly ICashierRepository _cashierRepository;

        public CashierController(ICashierRepository cashierRepository)
		{
			_cashierRepository = cashierRepository;
		}

        [HttpGet("all")]

        public IActionResult GetAll()
        {
            return Ok(_cashierRepository.GetAll());
        }

        [HttpGet("get-by-id/{id}")]

        public IActionResult GetById(int id)
        {
            var cashier = _cashierRepository.GetById(id);

            if (cashier == null) return NotFound();

            return Ok(cashier);
        }

        [HttpPost("login")]

        public IActionResult Login(CashierRegister cashierRegister)
        {
            var hasRegister = _cashierRepository.HasRegister(cashierRegister);

            if (!hasRegister) return NotFound();

            return Ok(cashierRegister);
        }
    }
}
