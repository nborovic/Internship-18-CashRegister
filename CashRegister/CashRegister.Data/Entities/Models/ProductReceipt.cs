using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Data.Entities.Models
{
    public class ProductReceipt
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public Guid ReceiptId { get; set; }
        public Receipt Receipt { get; set; }
        public int Count { get; set; }
    }
}
