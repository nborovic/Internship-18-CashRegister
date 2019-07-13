using CashRegister.Data.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CashRegister.Data.Entities
{
    public class CashRegisterContext : DbContext
    {
        public CashRegisterContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Cashier> Cashiers { get; set; }
        public DbSet<Register> Registers { get; set; }
        public DbSet<CashierRegister> CashiersRegisters { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<ProductReceipt> ProductsReceipts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CashierRegister>()
                .HasKey(cr => new { cr.CashierId, cr.RegisterId });

            modelBuilder.Entity<CashierRegister>()
                .HasOne(c => c.Cashier)
                .WithMany(cr => cr.CashiersRegisters)
                .HasForeignKey(c => c.CashierId);

            modelBuilder.Entity<CashierRegister>()
                .HasOne(r => r.Register)
                .WithMany(cr => cr.CashiersRegisters)
                .HasForeignKey(r => r.RegisterId);

            modelBuilder.Entity<ProductReceipt>()
                .HasKey(pr => new { pr.ProductId, pr.ReceiptId });

            modelBuilder.Entity<ProductReceipt>()
                .HasOne(p => p.Product)
                .WithMany(pr => pr.ProductsReceipts)
                .HasForeignKey(p => p.ProductId);

            modelBuilder.Entity<ProductReceipt>()
                .HasOne(r => r.Receipt)
                .WithMany(pr => pr.ProductsReceipts)
                .HasForeignKey(r => r.ReceiptId);

            modelBuilder.Entity<Cashier>().HasData(
                new Cashier
                {
                    Id = 1,
                    FirstName = "Ante",
                    LastName = "Antić",
                },
                new Cashier
                {
                    Id = 2,
                    FirstName = "Ivo",
                    LastName= "Ivić"
                }
            );

            modelBuilder.Entity<Register>().HasData(
                new Register { Id = 1 },
                new Register { Id = 2 },
                new Register { Id = 3 },
                new Register { Id = 4 }
            );

            modelBuilder.Entity<CashierRegister>().HasData(
                new CashierRegister { CashierId = 1, RegisterId = 2 },
                new CashierRegister { CashierId = 1, RegisterId = 4 },
                new CashierRegister { CashierId = 2, RegisterId = 2 },
                new CashierRegister { CashierId = 2, RegisterId = 1 }
            );

            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Coca Cola", Price = 6, TaxRate = 5, Barcode = new Guid(), Count = 26 },
                new Product { Id = 2, Name = "Kruh", Price = 3, TaxRate = 5, Barcode = new Guid(), Count = 101 },
                new Product { Id = 3, Name = "Pringles", Price = 15, TaxRate = 25, Barcode = new Guid(), Count = 59 }
            );

            modelBuilder.Entity<Receipt>().HasData(
                new Receipt { Id = new Guid("3178fa30-d8a9-4b10-9e98-4b060ba82769"), CashierId = 1, Date = DateTime.Now, ExciseDutyPrice = 15, PriceWithoutTax = 8, PriceWithTax = 22, StandardProductsPrice = 7 },
                new Receipt { Id = new Guid("4228fa30-d8a9-4b10-9e98-4b060ba82769"), CashierId = 1, Date = DateTime.Now, ExciseDutyPrice = 15, PriceWithoutTax = 8, PriceWithTax = 22, StandardProductsPrice = 7 }
            );

            modelBuilder.Entity<ProductReceipt>().HasData(
                new ProductReceipt { ProductId = 3, ReceiptId = new Guid("3178fa30-d8a9-4b10-9e98-4b060ba82769"), Count = 15},
                new ProductReceipt { ProductId = 2, ReceiptId = new Guid("4228fa30-d8a9-4b10-9e98-4b060ba82769"), Count = 16},
                new ProductReceipt { ProductId = 1, ReceiptId = new Guid("4228fa30-d8a9-4b10-9e98-4b060ba82769"), Count = 5}
            );
        }
    }
}
