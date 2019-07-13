using Microsoft.EntityFrameworkCore.Migrations;

namespace CashRegister.Data.Migrations
{
    public partial class CashierRegisterSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Cashiers",
                columns: new[] { "Id", "FirstName", "LastName" },
                values: new object[,]
                {
                    { 1, "Ante", "Antić" },
                    { 2, "Ivo", "Ivić" }
                });

            migrationBuilder.InsertData(
                table: "Registers",
                column: "Id",
                values: new object[]
                {
                    1,
                    2,
                    3,
                    4
                });

            migrationBuilder.InsertData(
                table: "CashiersRegisters",
                columns: new[] { "CashierId", "RegisterId" },
                values: new object[,]
                {
                    { 2, 1 },
                    { 1, 2 },
                    { 2, 2 },
                    { 1, 4 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CashiersRegisters",
                keyColumns: new[] { "CashierId", "RegisterId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "CashiersRegisters",
                keyColumns: new[] { "CashierId", "RegisterId" },
                keyValues: new object[] { 1, 4 });

            migrationBuilder.DeleteData(
                table: "CashiersRegisters",
                keyColumns: new[] { "CashierId", "RegisterId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "CashiersRegisters",
                keyColumns: new[] { "CashierId", "RegisterId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "Registers",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Cashiers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Cashiers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Registers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Registers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Registers",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
