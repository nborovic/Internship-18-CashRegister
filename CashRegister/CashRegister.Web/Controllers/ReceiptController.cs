using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace CashRegister.Web.Controllers
{
    [Route("api/receipts")]
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        private readonly IReceiptRepository _receiptRepository;

        public ReceiptController(IReceiptRepository receiptRepository)
        {
            _receiptRepository = receiptRepository;
        }

        [HttpGet("all")]

        public IActionResult GetAll()
        {
            return Ok(_receiptRepository.GetAll());
        }

        [HttpGet("sliced")]

        public IActionResult GetSliced(int amount, int beginningIndex)
        {
            var response = new
            {
                Data = _receiptRepository.GetSliced(amount, beginningIndex),
                Page = (beginningIndex + amount) / amount,
                TotalPages = (_receiptRepository.GetAll().Count + amount - 1) / amount
            };
            
            return Ok(response);
        }

        [HttpPost("add")]

        public IActionResult Add(Receipt receiptToAdd)
        {
            if (!_receiptRepository.Add(receiptToAdd))
                return Forbid();

            return Ok(_receiptRepository.GetById(receiptToAdd.Id));
        }

        [HttpGet("get-by-id")]

        public IActionResult GetById(Guid id)
        {
            var receipt = _receiptRepository.GetById(id);

            if (receipt == null)
                return NotFound();

            return Ok(receipt);
        }
    }
}
