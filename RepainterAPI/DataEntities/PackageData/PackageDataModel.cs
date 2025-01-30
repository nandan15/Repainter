using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataEntities.PackageData
{
    public class PackageData
    {
        [Key]
        public string PackageId { get; set; }
        public string ProductCode { get; set; }
        public string Type { get; set; }
        public string Price { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
    }
}
