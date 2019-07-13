using System;
using System.Collections.Generic;
using System.Linq;
using CashRegister.Data.Entities;
using CashRegister.Data.Entities.Models;
using CashRegister.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CashRegister.Domain.Repositories.Implementations
{
    public class RegisterRepository : IRegisterRepository
    {
        private readonly CashRegisterContext _context;

        public RegisterRepository(CashRegisterContext context)
        {
            _context = context;
        }

        public List<Register> GetAll() =>
            _context.Registers
            .Include(register => register.CashiersRegisters)
            .ToList();

        public Register GetById(int id) =>
            _context.Registers
            .Include(register => register.CashiersRegisters)
            .First(register => register.Id == id);
    }
}
