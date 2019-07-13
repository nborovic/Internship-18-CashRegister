using System;
using System.Collections.Generic;
using CashRegister.Data.Entities.Models;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IRegisterRepository
    {
        List<Register> GetAll();
        Register GetById(int id);
    }
}
