using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataEntities.Package
{
    public class Package
    {
        public int PackageId { get;set; }
        public bool PackageTabId { get;set; }
        public bool GeneratedId { get;set; }
        public string PackageType { get;set; }
        public string ProductCode { get;set; }
        public string Type { get;set; }
        public string SelectedCode { get; set; }
        public decimal Amount {  get;set; } 
        public string Specification { get;set; }
        public string Condition { get;set; }
        public string Remarks { get;set; }
        public decimal SectionTotalPreTax { get;set; }
        public decimal SectionTotalPostTax { get;set; }
        public int CustomerId { get;set; }
        public bool Deleted { get;set; }
        public DateTime CreatedOn { get;set; }  
        public int CreatedBy { get;set; }
        public int LastModifiedBy { get; set; }
        public DateTime LastModifiedOn { get; set; }
    }
}
