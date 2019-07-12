using System;
using System.Collections.Generic;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IReceiptRepository
    {
        List<Receipt> GetAll();
        List<Receipt> GetSliced(int amount, int beginningIndex, DateTime date);
        List<Receipt> GetSliced(int amount, int beginningIndex);
        List<Receipt> GetByDate(DateTime date);
        Receipt GetById(Guid id);
        bool Add(Receipt receiptToAdd);
    }
}
