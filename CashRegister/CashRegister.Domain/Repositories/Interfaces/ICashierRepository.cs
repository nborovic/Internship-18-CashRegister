using System;
using System.Collections.Generic;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface ICashierRepository
    {
        List<Cashier> GetAll();
        Cashier GetById(int id);
        bool HasRegister(CashierRegister cashierRegister);
    }
}
