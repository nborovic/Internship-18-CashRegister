using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Data.Entities.Models
{
    public class Receipt
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public Cashier Cashier { get; set; }
        public ICollection<ProductReceipt> ProductsReceipts { get; set; }
        public float PriceWithoutTax { get; set; }
        public float PriceWithTax { get; set; }
        public float ExciseDutyPrice { get; set; }
        public float StandardProductsPrice { get; set; }

        public override bool Equals(object obj)
        {
            if ((obj == null) || !GetType().Equals(obj.GetType()))
            {
                return false;
            }

            var receipt = (Receipt)obj;

            return Equals(receipt.Id, Id);
        }
    }
}
