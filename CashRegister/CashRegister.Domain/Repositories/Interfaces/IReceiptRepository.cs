using System;
using System.Collections.Generic;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IReceiptRepository
    {
        List<Receipt> GetAll();
        Receipt GetById(Guid id);
        bool Add(Receipt receiptToAdd);
    }
}
