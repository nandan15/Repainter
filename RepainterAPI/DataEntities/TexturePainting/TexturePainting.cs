using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataEntities.TexturePainting
{
    public class TexturePainting
    {
        public int TexturePaintingId { get;set; }
        public bool TexturePaintingTabId { get;set; }    
        public int CustomerId { get;set; }
        public bool GenerateId { get; set; }
        public string Area { get; set; }
        public string Type { get; set; }
        public string ProductCode { get; set; } 
        public decimal Price { get;set; }
        public string Remarks { get;set; }
        public decimal SectionTotal { get;set; }
        public bool Deleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int LastModifiedBy { get; set; } 
        public DateTime LastModifiedOn { get; set; }
    }
}
