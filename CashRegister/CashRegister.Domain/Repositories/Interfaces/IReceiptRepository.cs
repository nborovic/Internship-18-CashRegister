using System;
using System.Collections.Generic;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IReceiptRepository
    {
        List<Receipt> GetAll();
        Receipt GetById(Guid id);
        List<Receipt> GetByDate(DateTime date);
        List<Receipt> GetSliced(int amount, int beginningIndex);
        List<Receipt> GetSlicedByDate(int amount, int beginningIndex, DateTime date);
        bool Add(Receipt receiptToAdd);
    }
}
