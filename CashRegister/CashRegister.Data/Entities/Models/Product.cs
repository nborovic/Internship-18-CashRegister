﻿using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Data.Entities.Models
{
    public class Product
    {
        public int Id { get; set; }
        public Guid Barcode { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public float TaxRate { get; set; }
        public int Count { get; set; }
        public ICollection<ProductReceipt> ProductsReceipts { get; set; }

        public Product(int id, Guid barcode, string name, float price, float taxRate, int count, ICollection<ProductReceipt> productsReceipts)
        {
            Id = id;
            Barcode = barcode;
            Name = name;
            Price = price;
            TaxRate = taxRate;
            Count = count;
            ProductsReceipts = productsReceipts;
        }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !GetType().Equals(obj.GetType()))
            {
                return false;
            }

            var product = (Product)obj;

            return (product.Id == Id && product.Name == Name);
        }
    }
}
