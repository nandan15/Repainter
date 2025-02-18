using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.Curtain
{
    public class CurtainModel
    {
        public int CurtainId { get; set; }
        public bool CurtainTabId { get; set; }
        public bool GeneratedId { get; set; }
        public int CustomerId { get; set; }
        public string CurtainType { get; set; }
        public string FabricType { get; set; }
        public string ProductCode { get; set; }
        public decimal Price { get; set; }
        public string CurtainRemarks { get; set; }
        public string RodType { get; set; }
        public string RodProductCode { get; set; }
        public decimal RodPrice { get; set; }
        public string RodRemarks { get; set; }
        public string FinialType { get; set; }
        public string FinialProductCode { get; set; }
        public decimal FinialPrice { get; set; }
        public string FinialRemarks { get; set; }
        public string SectionTotalCurtain { get; set; }
        public string WindowCurtainType { get; set; }
        public string WindowFabricType { get; set; }
        public string WindowCurtainProductCode { get; set; }
        public decimal WindowCurtainPrice { get; set; }
        public string WindowCurtainRemarks { get; set; }
        public string WindowRodType { get; set; }
        public string WindowRodProductCode { get; set; }
        public decimal WindowRodPrice { get; set; }
        public string WindowRodRemarks { get; set; }
        public string WindowFinialType { get; set; }
        public string WindowFinialProductCode { get; set; }
        public decimal WindowFinialPrice { get; set; }
        public string WindowFinialRemarks { get; set; }
        public decimal SectionTotalWindow { get; set; }
        public decimal SectionTotal { get; set; }
        public bool Deleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int LastModifiedBy { get; set; }
        public DateTime LastModifiedOn { get; set; }
    }
}
