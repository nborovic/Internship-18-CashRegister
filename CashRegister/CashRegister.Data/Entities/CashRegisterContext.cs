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

        }
    }
}
