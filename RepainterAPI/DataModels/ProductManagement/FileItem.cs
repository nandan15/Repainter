using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.ProductManagement
{
    public class CatalogFileModel
    {
        [Key]
        public int FileId { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string FileType { get; set; }
        [Required]
        [StringLength(1000)]
        public string FilePath { get; set; }
        [Required]
        public int FolderId { get; set; }
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
        public virtual FolderModel? Folder { get; set; }
        public virtual CategoryModel? Category { get; set; }
    }
}
