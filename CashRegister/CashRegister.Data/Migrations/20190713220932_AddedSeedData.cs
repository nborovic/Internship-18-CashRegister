using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CashRegister.Data.Migrations
{
    public partial class AddedSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Barcode", "CashierId", "Count", "Name", "Price", "TaxRate" },
                values: new object[,]
                {
                    { 1, new Guid("00000000-0000-0000-0000-000000000000"), null, 26, "Coca Cola", 6f, 5f },
                    { 2, new Guid("00000000-0000-0000-0000-000000000000"), null, 101, "Kruh", 3f, 5f },
                    { 3, new Guid("00000000-0000-0000-0000-000000000000"), null, 59, "Pringles", 15f, 25f }
                });

            migrationBuilder.InsertData(
                table: "Receipts",
                columns: new[] { "Id", "CashierId", "Date", "ExciseDutyPrice", "PriceWithTax", "PriceWithoutTax", "StandardProductsPrice" },
                values: new object[,]
                {
                    { new Guid("3178fa30-d8a9-4b10-9e98-4b060ba82769"), 1, new DateTime(2019, 7, 14, 0, 9, 31, 870, DateTimeKind.Local).AddTicks(8370), 15f, 22f, 8f, 7f },
                    { new Guid("4228fa30-d8a9-4b10-9e98-4b060ba82769"), 1, new DateTime(2019, 7, 14, 0, 9, 31, 876, DateTimeKind.Local).AddTicks(6970), 15f, 22f, 8f, 7f }
                });

            migrationBuilder.InsertData(
                table: "ProductsReceipts",
                columns: new[] { "ProductId", "ReceiptId", "Count" },
                values: new object[] { 3, new Guid("3178fa30-d8a9-4b10-9e98-4b060ba82769"), 15 });

            migrationBuilder.InsertData(
                table: "ProductsReceipts",
                columns: new[] { "ProductId", "ReceiptId", "Count" },
                values: new object[] { 2, new Guid("4228fa30-d8a9-4b10-9e98-4b060ba82769"), 16 });

            migrationBuilder.InsertData(
                table: "ProductsReceipts",
                columns: new[] { "ProductId", "ReceiptId", "Count" },
                values: new object[] { 1, new Guid("4228fa30-d8a9-4b10-9e98-4b060ba82769"), 5 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ProductsReceipts",
                keyColumns: new[] { "ProductId", "ReceiptId" },
                keyValues: new object[] { 1, new Guid("4228fa30-d8a9-4b10-9e98-4b060ba82769") });

            migrationBuilder.DeleteData(
                table: "ProductsReceipts",
                keyColumns: new[] { "ProductId", "ReceiptId" },
                keyValues: new object[] { 2, new Guid("4228fa30-d8a9-4b10-9e98-4b060ba82769") });

            migrationBuilder.DeleteData(
                table: "ProductsReceipts",
                keyColumns: new[] { "ProductId", "ReceiptId" },
                keyValues: new object[] { 3, new Guid("3178fa30-d8a9-4b10-9e98-4b060ba82769") });

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: new Guid("3178fa30-d8a9-4b10-9e98-4b060ba82769"));

            migrationBuilder.DeleteData(
                table: "Receipts",
                keyColumn: "Id",
                keyValue: new Guid("4228fa30-d8a9-4b10-9e98-4b060ba82769"));
        }
    }
}
