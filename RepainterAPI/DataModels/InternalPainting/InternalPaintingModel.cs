using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.InternalPainting
{
    public class InternalPaintingModel
    {
        public int IntenalPaintingId { get; set; }
        public int CustomerId { get; set; }
        public decimal CarpetArea { get; set; }
        public string CeilingType { get; set; }
        public decimal CeilingPrice { get; set; }
        public string CeilingRemarsk { get;set; }
        public string WallType { get; set; }
        public decimal WallPrice { get; set; }
        public string WallRemarks { get; set; }
        public string NoofWall { get;set;}
        public decimal DarkPrice { get; set; }
        public string DarkRemarks { get; set; }
        public decimal SectionTotalPre_tax { get; set; }
        public decimal SectionTotalPost_tax { get; set; }
        public string TotalRemarks { get; set; }
        public bool Deleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public int LastModifiedBy { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
