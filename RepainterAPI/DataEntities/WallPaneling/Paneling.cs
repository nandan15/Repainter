using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataEntities.WallPaneling
{
    public class Paneling
    {
        public int PanelingId { get; set; }
        public int CustomerId { get; set; }
        public int GeneratedId { get; set; }
        public int PanelingTabId { get; set; }
        public string Type { get; set; }
        public string PaintingType { get; set; }
        public string PanelingType { get; set; }
        public string TextureType { get; set; }
        public string WallPaperType { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Remarks { get; set; }
        public string Lighting { get; set; }
        public decimal LightingPrice { get; set; }
        public decimal SectionTotal { get; set; }
        public bool Deleted { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public int LastModifiedBy { get; set; }
    }
}
