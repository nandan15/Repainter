using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataCore.Migrations.Repainter
{
    public partial class AddColumnTotalRemarkToScInternalPainting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TotalRemarks",
                table: "ScInternalPainting",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalRemarks",
                table: "ScInternalPainting");
        }
    }
}
