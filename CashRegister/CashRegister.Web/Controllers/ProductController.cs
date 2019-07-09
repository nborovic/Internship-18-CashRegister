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
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet("all")]

        public IActionResult GetAll()
        {
            return Ok(_productRepository.GetAll());
        }

        [HttpPost("add")]

        public IActionResult Add(Product productToAdd)
        {
            _productRepository.Add(productToAdd);
            return Ok();
        }

        [HttpPost("edit")]

        public IActionResult Edit(Product editedProduct)
        {
            var editSuccessful = _productRepository.Edit(editedProduct);

            if (!editSuccessful) return Forbid();
            return Ok();
        }

        [HttpDelete("remove/{id}")]

        public IActionResult Remove(int id)
        {
            var removeSuccessful = _productRepository.Delete(id);

            if (!removeSuccessful) return Forbid();
            return Ok();
        }

        [HttpGet("get-by-id/{id}")]

        public IActionResult GetById(int id)
        {
            var product = _productRepository.GetById(id);

            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpPost("name-exists")]

        public IActionResult NameExists(Product productToTest)
        {
            return Ok(_productRepository.GetAll().Any(product => product.Name == productToTest.Name));
        }
    }
}