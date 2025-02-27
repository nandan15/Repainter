using System.ComponentModel.DataAnnotations;

namespace DataEntities.Product
{
    public class Folder
    {
        [Key]
        public int FolderId { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [Required]
        public int CategoryId { get; set; }

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

        public virtual Category? Category { get; set; }

        public virtual ICollection<CatalogFile>? Files { get; set; }
    }
}