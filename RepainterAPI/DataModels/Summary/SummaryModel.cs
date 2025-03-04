using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.Summary
{
    public class SummaryModel
    {
        public string CustomerName { get; set; }
        public string ProjectName { get; set; }
        public string EnquiryId { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public decimal CurtainsTotal { get; set; }
        public decimal PackageTotal { get; set; }
        public decimal FurnitureTotal { get; set; }
        public decimal InternalPaintingTotal { get; set; }
        public decimal TexturePaintingTotal { get; set; }
        public decimal WallpaperTotal { get; set; }
        public decimal PanelingTotal { get; set; }
        public decimal DoorGrillTotal { get; set; }
        public decimal OverallTotal_PreTax { get; set; }
        public decimal OverallTotal { get; set; }
        public decimal OrderConfirmation { get; set; }
        public decimal DesignConfirmation { get; set; }
        public decimal ProjectHandover { get; set; }
        public decimal ToVendorAmount { get; set; }
        public decimal OverallTotalToVendor { get; set; }
    }
}
