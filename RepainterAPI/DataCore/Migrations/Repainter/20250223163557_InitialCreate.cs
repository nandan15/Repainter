using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataCore.Migrations.Repainter
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Curtains",
                columns: table => new
                {
                    CurtainId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CurtainTabId = table.Column<bool>(type: "bit", nullable: false),
                    GeneratedId = table.Column<bool>(type: "bit", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    CurtainType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FabricType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CurtainRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RodType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RodProductCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RodPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RodRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FinialType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FinialProductCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FinialPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FinialRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SectionTotalCurtain = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WindowCurtainType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WindowFabricType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WindowCurtainProductCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WindowCurtainPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    WindowCurtainRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WindowRodType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WindowRodProductCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WindowRodPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    WindowRodRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WindowFinialType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WindowFinialProductCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WindowFinialPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    WindowFinialRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SectionTotalWindow = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SectionTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: false),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Curtains", x => x.CurtainId);
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnquiryId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AlternatePhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmailId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HouseNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Configurtion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CarpetArea = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FloorPlan = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SitePlan = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Door_Grills",
                columns: table => new
                {
                    Door_GrillId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Door_GrillTabId = table.Column<bool>(type: "bit", nullable: false),
                    GeneratedId = table.Column<bool>(type: "bit", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    MainDoorLength = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MainDoorHeight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MainDoorNumber_of_Doors = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MainDoorSurface = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MainDoorPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MainDoorRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InternalDoorLength = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    InternalDoorHeight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    InternalDoorNumber_of_Doors = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    InternalDoorSurface = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InternalDoorPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    InternalDoorRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Window_GrillLength = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Window_GrillHeight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Window_GrillPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Window_GrillRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Balcony_GrillLength = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Balcony_GrillHeight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Balcony_GrillPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Balcony_GrillRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SectionTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: false),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Door_Grills", x => x.Door_GrillId);
                });

            migrationBuilder.CreateTable(
                name: "Furniture",
                columns: table => new
                {
                    FurnitureId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FurnitureTabId = table.Column<int>(type: "int", nullable: false),
                    GeneratedId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    ProductCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SectionTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: false),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Furniture", x => x.FurnitureId);
                });

            migrationBuilder.CreateTable(
                name: "InternalPainting",
                columns: table => new
                {
                    IntenalPaintingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    CarpetArea = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ProductCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    TotalRemarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    LastModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternalPainting", x => x.IntenalPaintingId);
                });

            migrationBuilder.CreateTable(
                name: "Package",
                columns: table => new
                {
                    PackageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PackageTabId = table.Column<bool>(type: "bit", nullable: false),
                    GeneratedId = table.Column<bool>(type: "bit", nullable: false),
                    PackageType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SelectedCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Specification = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Condition = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SectionTotalPreTax = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SectionTotalPostTax = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: false),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Package", x => x.PackageId);
                });

            migrationBuilder.CreateTable(
                name: "packageData",
                columns: table => new
                {
                    PackageId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProductCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_packageData", x => x.PackageId);
                });

            migrationBuilder.CreateTable(
                name: "Panelings",
                columns: table => new
                {
                    PanelingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    GeneratedId = table.Column<int>(type: "int", nullable: false),
                    PanelingTabId = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaintingType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PanelingType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TextureType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WallPaperType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lighting = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LightingPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SectionTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Panelings", x => x.PanelingId);
                });

            migrationBuilder.CreateTable(
                name: "TexturePainting",
                columns: table => new
                {
                    TexturePaintingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TexturePaintingTabId = table.Column<bool>(type: "bit", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    GenerateId = table.Column<bool>(type: "bit", nullable: false),
                    Area = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SectionTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: false),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TexturePainting", x => x.TexturePaintingId);
                });

            migrationBuilder.CreateTable(
                name: "Wallpaper",
                columns: table => new
                {
                    WallpaperId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    ProductType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NoOfRolls = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SectionTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wallpaper", x => x.WallpaperId);
                });

            migrationBuilder.CreateTable(
                name: "Folders",
                columns: table => new
                {
                    FolderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Folders", x => x.FolderId);
                    table.ForeignKey(
                        name: "FK_Folders_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CatalogFile",
                columns: table => new
                {
                    FileId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    FileType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    FileSize = table.Column<long>(type: "bigint", maxLength: 10000, nullable: false),
                    FolderId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<int>(type: "int", nullable: true),
                    LastModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogFile", x => x.FileId);
                    table.ForeignKey(
                        name: "FK_CatalogFile_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CatalogFile_Folders_FolderId",
                        column: x => x.FolderId,
                        principalTable: "Folders",
                        principalColumn: "FolderId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CatalogFile_CategoryId_IsDeleted",
                table: "CatalogFile",
                columns: new[] { "CategoryId", "IsDeleted" });

            migrationBuilder.CreateIndex(
                name: "IX_CatalogFile_CustomerId_UserId",
                table: "CatalogFile",
                columns: new[] { "CustomerId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_CatalogFile_FileType",
                table: "CatalogFile",
                column: "FileType");

            migrationBuilder.CreateIndex(
                name: "IX_CatalogFile_FolderId_IsDeleted",
                table: "CatalogFile",
                columns: new[] { "FolderId", "IsDeleted" });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_CustomerId_UserId",
                table: "Categories",
                columns: new[] { "CustomerId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_IsDeleted",
                table: "Categories",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Folders_CategoryId_IsDeleted",
                table: "Folders",
                columns: new[] { "CategoryId", "IsDeleted" });

            migrationBuilder.CreateIndex(
                name: "IX_Folders_CustomerId_UserId",
                table: "Folders",
                columns: new[] { "CustomerId", "UserId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CatalogFile");

            migrationBuilder.DropTable(
                name: "Curtains");

            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropTable(
                name: "Door_Grills");

            migrationBuilder.DropTable(
                name: "Furniture");

            migrationBuilder.DropTable(
                name: "InternalPainting");

            migrationBuilder.DropTable(
                name: "Package");

            migrationBuilder.DropTable(
                name: "packageData");

            migrationBuilder.DropTable(
                name: "Panelings");

            migrationBuilder.DropTable(
                name: "TexturePainting");

            migrationBuilder.DropTable(
                name: "Wallpaper");

            migrationBuilder.DropTable(
                name: "Folders");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
