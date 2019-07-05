using System;
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
    }
}
