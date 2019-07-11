﻿using System;
using System.Collections.Generic;
using System.Linq;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;

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

        public List<Receipt> GetAll() => _context.Receipts.ToList();

        public Receipt GetById(Guid id) => _context.Receipts.Find(id);
    }
}