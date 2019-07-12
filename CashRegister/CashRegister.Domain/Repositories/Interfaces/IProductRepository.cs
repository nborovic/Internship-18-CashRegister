using CashRegister.Data.Entities.Models;
using System.Collections.Generic;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IProductRepository
    {
        List<Product> GetAll();
        Product GetById(int id);
        List<Product> GetByName(string name);
        bool Add(Product productToAdd);
        bool Edit(Product editedProduct);
        bool NameExists(string name);
        bool DecreaseCount(int amount, int id);
        bool IncreaseCount(int amount, int id);
    }
}
