using System;
using System.Collections.Generic;
using System.Linq;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly CashRegisterContext _context;

        public ProductRepository(CashRegisterContext context)
        {
            _context = context;
        }

        public List<Product> GetAll() => _context.Products.Include(product => product.ProductsReceipts).ToList();

        public Product GetById(int id) => _context.Products.Find(id);

        public List<Product> GetByName(string name) {
            if (name == null) name = "";
            return _context.Products.Include(product => product.ProductsReceipts).Where(product => product.Name.ToLower().Contains(name.ToLower())).ToList();
        }

        public bool Add(Product productToAdd)
        {
            var productExists = _context.Products.Any(product => product.Equals(productToAdd));

            if (productExists) return false;

            _context.Products.Add(productToAdd);
            _context.SaveChanges();
            return true;
        }

        public bool Edit(Product editedProduct)
        {
            var productToEdit = _context.Products.Find(editedProduct.Id);

            if (productToEdit == null || productToEdit.Name != editedProduct.Name || productToEdit.Count != editedProduct.Count) return false;

            productToEdit.Price = editedProduct.Price;
            productToEdit.TaxRate = editedProduct.TaxRate;
            productToEdit.Barcode = editedProduct.Barcode;
            _context.SaveChanges();
            return true;
        }

        public bool NameExists(string name)
        {
            return _context.Products.Any(product => product.Name == name);
        }

        public bool DecreaseCount(int amount, int id)
        {
            var product = _context.Products.Find(id);

            if (product == null) return false;

            product.Count -= amount;
            _context.SaveChanges();
            return true;
        }

        public bool IncreaseCount(int amount, int id)
        {
            var product = _context.Products.Find(id);

            if (product == null) return false;

            product.Count += amount;
            _context.SaveChanges();
            return true;
        }
    }
}
