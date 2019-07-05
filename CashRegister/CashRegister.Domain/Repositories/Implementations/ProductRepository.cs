using System;
using System.Collections.Generic;
using System.Linq;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly CashRegisterContext _context;

        public ProductRepository(CashRegisterContext context)
        {
            _context = context;
        }

        public List<Product> GetAll() => _context.Products.ToList();

        public Product GetById(int id) => _context.Products.Find(id);

        public bool Add(Product productToAdd)
        {
            var productExists = _context.Products.Any(product => string.Equals(product, StringComparison.CurrentCultureIgnoreCase));

            if (productExists) return false;

            _context.Products.Add(productToAdd);
            _context.SaveChanges();
            return true;
        }

        public bool Edit(Product editedProduct)
        {
            var productExists = _context.Products.Any(product => string.Equals(product, StringComparison.CurrentCultureIgnoreCase));

            if (!productExists) return false;

            var productToEdit = _context.Products.Find(editedProduct.Id);

            if (productToEdit == null || productToEdit.Name != editedProduct.Name || productToEdit.Count != editedProduct.Count) return false;

            productToEdit.Price = editedProduct.Price;
            productToEdit.TaxRate = editedProduct.TaxRate;
            productToEdit.Barcode = editedProduct.Barcode;
            _context.SaveChanges();
            return true;
        }

        public bool Remove(Product productToRemove)
        {
            var productExists = _context.Products.Any(product => string.Equals(product, StringComparison.CurrentCultureIgnoreCase));

            if (!productExists) return false;

            _context.Products.Remove(productToRemove);
            _context.SaveChanges();
            return true;
        }
    }
}
