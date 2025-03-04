using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataEntities.Furniture
{
    public class Furniture
    {
        public int FurnitureId { get; set; }
        public int FurnitureTabId { get; set; }
        public int GeneratedId { get; set; }
        public int CustomerId { get; set; }
        public string ProductCode { get; set; }
        public string Name { get;set; }
        public decimal Price { get; set; }  
        public decimal SectionTotal { get; set; }
        public string Description { get; set; }
        public string Remarks {  get; set; }
        public bool Deleted { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public int LastModifiedBy { get; set; }
        public DateTime LastModifiedOn { get; set; }
    }
}
