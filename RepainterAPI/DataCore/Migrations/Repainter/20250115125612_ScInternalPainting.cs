using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataCore.Migrations.Repainter
{
    public partial class ScInternalPainting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ScInternalPainting",
                columns: table => new
                {
                    IntenalPaintingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarpetArea = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CeilingType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CeilingPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CeilingRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WallType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WallPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    WallRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NoofWall = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DarkPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DarkRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SectionTotalPre_tax = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SectionTotalPost_tax = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    LastModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScInternalPainting", x => x.IntenalPaintingId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ScInternalPainting");
        }
    }
}
