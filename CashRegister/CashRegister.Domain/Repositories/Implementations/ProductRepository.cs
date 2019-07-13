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

        public Product GetById(int id) => _context.Products.Include(product => product.ProductsReceipts).First(product => product.Id == id);

        public List<Product> GetByName(string name) {
            if (name == null) name = "";
            return _context.Products.Include(product => product.ProductsReceipts).Where(product => product.Name.ToLower().Contains(name.ToLower())).ToList();
        }

        public List<Product> GetByBarcode(string barcode)
        {
            if (barcode == null) barcode = "";
            return _context.Products.Include(product => product.ProductsReceipts).Where(product => product.Barcode.ToString().ToLower().Contains(barcode.ToLower())).ToList();
        }

        public bool Add(Product productToAdd)
        {
            var productExists = _context.Products.Any(product => product.Equals(productToAdd));

            if (productExists) return false;

            if (productToAdd.Barcode.GetType() != typeof(Guid) || productToAdd.Price.GetType() != typeof(float)
                || productToAdd.TaxRate > 100 || productToAdd.TaxRate < 0 || productToAdd.Name.Length > 45 || productToAdd.Name.Length < 2
                || productToAdd.Count.GetType() != typeof(int)) return false;


            _context.Products.Add(productToAdd);
            _context.SaveChanges();
            return true;
        }

        public bool Edit(Product editedProduct)
        {
            var productToEdit = _context.Products.Find(editedProduct.Id);

            if (productToEdit == null || productToEdit.Name != editedProduct.Name || productToEdit.Count != editedProduct.Count) return false;

            if (productToEdit.Barcode.GetType() != typeof(Guid) || productToEdit.Price.GetType() != typeof(float) || productToEdit.TaxRate > 100 || productToEdit.TaxRate < 0) return false;

            productToEdit.Price = editedProduct.Price;
            productToEdit.TaxRate = editedProduct.TaxRate;
            productToEdit.Barcode = editedProduct.Barcode;
            _context.SaveChanges();
            return true;
        }

        public bool ImportExport(List<Product> basket)
        {
            var response = true;

            basket.ForEach(product =>
            {
                var productToEdit = _context.Products.Find(product.Id);
                if (productToEdit.Count + product.Count < 0)                
                    response = false;


                productToEdit.Count += product.Count;
            });

            if (response)
                _context.SaveChanges();

            return response;
        }

        public bool DecreaseCount(int amount, int id)
        {
            var product = _context.Products.Find(id);

            if (product == null) return false;

            product.Count -= amount;
            _context.SaveChanges();
            return true;
        }

        public bool NameExists(string name)
        {
            return _context.Products.Any(product => product.Name == name);
        }
    }
}
