using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataEntities.Wallpaper
{
    public class Wallpaper
    {
        public int WallpaperId { get; set; }
        public int CustomerId { get; set; }
        public string ProductType { get; set; }
        public string ProductCode { get; set; }
        public int NoOfRolls { get; set; }
        public decimal Price { get; set; }
        public string Remarks { get; set; }
        public decimal SectionTotal { get; set; }
        public bool Deleted { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public int LastModifiedBy { get; set; }
    }
}
