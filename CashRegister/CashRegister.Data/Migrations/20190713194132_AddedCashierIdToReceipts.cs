using Microsoft.EntityFrameworkCore.Migrations;

namespace CashRegister.Data.Migrations
{
    public partial class AddedCashierIdToReceipts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receipts_Cashiers_CashierId",
                table: "Receipts");

            migrationBuilder.AlterColumn<int>(
                name: "CashierId",
                table: "Receipts",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Receipts_Cashiers_CashierId",
                table: "Receipts",
                column: "CashierId",
                principalTable: "Cashiers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receipts_Cashiers_CashierId",
                table: "Receipts");

            migrationBuilder.AlterColumn<int>(
                name: "CashierId",
                table: "Receipts",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Receipts_Cashiers_CashierId",
                table: "Receipts",
                column: "CashierId",
                principalTable: "Cashiers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
