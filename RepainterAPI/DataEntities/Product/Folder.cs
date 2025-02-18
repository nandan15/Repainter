namespace DataEntities.Product
{
    public class Folder
    {
        public int FolderId { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public int? ParentFolderId { get; set; }
        public int CustomerId { get; set; }
        public int UserId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? LastModifiedBy { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public bool IsDeleted { get; set; }

        public virtual Category Category { get; set; }
        public virtual Folder ParentFolder { get; set; }
        public virtual ICollection<Folder> SubFolders { get; set; }
        public virtual ICollection<CatalogFile> Files { get; set; }
    }
}