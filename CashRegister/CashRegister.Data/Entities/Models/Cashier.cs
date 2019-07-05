using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Data.Entities.Models
{
    public class Cashier
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<Receipt> Receipts { get; set; }
        public ICollection<Product> ProductsSold { get; set; }
        public ICollection<CashierRegister> CashiersRegisters { get; set; }
    }
}
