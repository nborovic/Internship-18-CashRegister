using System;
using System.Collections.Generic;
using System.Linq;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class CashierRepository : ICashierRepository
    {
        private readonly CashRegisterContext _context;

        public CashierRepository(CashRegisterContext context)
        {
            _context = context;
        }

        public List<Cashier> GetAll() =>
            _context.Cashiers
            .Include(cashier => cashier.Receipts)
            .Include(cashier => cashier.ProductsSold)
            .Include(cashier => cashier.CashiersRegisters)
            .ToList();

        public Cashier GetById(int id) =>
            _context.Cashiers
            .Include(cashier => cashier.Receipts)
            .Include(cashier => cashier.ProductsSold)
            .Include(cashier => cashier.CashiersRegisters)
            .First(cashier => cashier.Id == id);

        public bool HasRegister(CashierRegister cashierRegister) => 
            _context.Cashiers
            .Include(cashier => cashier.Receipts)
            .Include(cashier => cashier.ProductsSold)
            .Include(cashier => cashier.CashiersRegisters)
            .First(cashier => cashier.Id == cashierRegister.CashierId)
            .CashiersRegisters
            .Any(cr => cr.RegisterId == cashierRegister.RegisterId);
    }
}
