using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataEntities.Door_Grills
{
    public class Door_Grills
    {
        [Key]
        public int Door_GrillId { get; set; }
        public bool Door_GrillTabId { get; set; }
        public bool GeneratedId { get; set; }
        public int CustomerId { get; set; }
        public decimal MainDoorLength {  get; set; }
        public decimal MainDoorHeight { get; set; }
        public decimal MainDoorNumber_of_Doors { get; set; }
        public string MainDoorSurface { get; set; }
        public decimal MainDoorPrice { get; set; }
        public string MainDoorRemarks { get; set; }
        public decimal InternalDoorLength { get; set; }
        public decimal InternalDoorHeight { get; set; }
        public decimal InternalDoorNumber_of_Doors { get; set; }
        public string InternalDoorSurface { get; set; }
        public decimal InternalDoorPrice { get; set; }
        public string InternalDoorRemarks { get; set; }
        public decimal Window_GrillLength { get; set; }
        public decimal Window_GrillHeight { get; set; }
       
        public decimal Window_GrillPrice { get; set; }
        public string Window_GrillRemarks { get; set; }
        public decimal Balcony_GrillLength { get; set; }
        public decimal Balcony_GrillHeight { get; set; }

        public decimal Balcony_GrillPrice { get; set; }
        public string Balcony_GrillRemarks { get; set; }
        public decimal SectionTotal { get; set; }
        public bool Deleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int LastModifiedBy { get; set; }
        public DateTime LastModifiedOn { get; set; }
    }
}
