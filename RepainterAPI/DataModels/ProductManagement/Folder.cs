using DataModels.ProductManagement;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class FolderModel
{
    [Key]
    public int FolderId { get; set; }
    [Required]
    [StringLength(200)]
    public string Name { get; set; }
    [Required]
    public int CategoryId { get; set; }
    public int? ParentFolderId { get; set; }
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

    // Make navigation properties optional
    public virtual CategoryModel? Category { get; set; }
    public virtual FolderModel? ParentFolder { get; set; }
    public virtual ICollection<FolderModel>? SubFolders { get; set; }
    public virtual ICollection<CatalogFileModel>? Files { get; set; }
}