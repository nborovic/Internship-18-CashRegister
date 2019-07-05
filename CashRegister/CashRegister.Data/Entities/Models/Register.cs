using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Data.Entities.Models
{
    public class Register
    {
        public int Id { get; set; }
        public ICollection<CashierRegister> CashiersRegisters { get; set; }
    }
}
