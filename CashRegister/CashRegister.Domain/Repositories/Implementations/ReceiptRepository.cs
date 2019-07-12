using System;
using System.Collections.Generic;
using System.Linq;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class ReceiptRepository : IReceiptRepository
    {
        private readonly CashRegisterContext _context;

        public ReceiptRepository(CashRegisterContext context)
        {
            _context = context;
        }

        public bool Add(Receipt receiptToAdd)
        {
            var receiptExists = _context.Receipts.Any(receipt => receipt.Equals(receiptToAdd));

            if (receiptExists) return false;

            _context.Receipts.Add(receiptToAdd);
            _context.SaveChanges();
            return true;
        }

        public List<Receipt> GetAll() => _context.Receipts.Include(receipt => receipt.ProductsReceipts).ToList();

        public List<Receipt> GetSliced(int amount, int beginningIndex, DateTime date) => _context.Receipts.Where(receipt => receipt.Date.Year == date.Year && receipt.Date.Month == date.Month && receipt.Date.Day == date.Day).Include(receipt => receipt.ProductsReceipts).Skip(beginningIndex).Take(amount).ToList();

        public List<Receipt> GetSliced(int amount, int beginningIndex) => _context.Receipts.Include(receipt => receipt.ProductsReceipts).Skip(beginningIndex).Take(amount).ToList();

        public Receipt GetById(Guid id) => _context.Receipts.Find(id);

        public List<Receipt> GetByDate(DateTime date) => _context.Receipts.Include(receipt => receipt.ProductsReceipts).Where(receipt => receipt.Date.Year == date.Year && receipt.Date.Month == date.Month && receipt.Date.Day == date.Day).ToList();
    }
}
