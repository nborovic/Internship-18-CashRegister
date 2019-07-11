using CashRegister.Data.Entities.Models;
using System.Collections.Generic;

namespace CashRegister.Domain.Repositories.Interfaces
{
    public interface IProductRepository
    {
        List<Product> GetAll();
        Product GetById(int id);
        bool Add(Product productToAdd);
        bool Edit(Product editedProduct);
        bool NameExists(string name);

    }
}
