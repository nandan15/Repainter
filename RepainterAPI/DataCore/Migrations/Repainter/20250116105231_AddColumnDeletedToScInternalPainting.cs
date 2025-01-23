using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataCore.Migrations.Repainter
{
    public partial class AddColumnDeletedToScInternalPainting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "ScInternalPainting",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "ScInternalPainting");
        }
    }
}
