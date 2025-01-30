using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.PackageData
{
    public class PackageDataModel
    {
        public string PackageId { get; set; }
        public string ProductCode { get; set; }
        public string Type {  get; set; }
        public string Price { get; set; }
        public string Content { get;set; }
        public string Description { get; set; }
    }
}
