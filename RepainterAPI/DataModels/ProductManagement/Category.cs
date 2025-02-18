using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace DataModels.ProductManagement
{
    public class CategoryModel
    {
        [Key]
        public int CategoryId { get; set; }
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int CreatedBy { get; set; }
        [Required]
        public DateTime CreatedOn { get; set; }
        public int? LastModifiedBy { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public bool IsDeleted { get; set; }

        // Make navigation property optional
        public virtual ICollection<FolderModel>? Folders { get; set; }
    }

}