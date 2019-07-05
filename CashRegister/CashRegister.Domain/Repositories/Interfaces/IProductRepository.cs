using CashRegister.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IProductRepository
    {
        List<Product> GetAll();
        Product GetById(int id);
        bool Add(Product productToAdd);
        bool Edit(Product editedProduct);
        bool Remove(Product productToRemove);

    }
}
