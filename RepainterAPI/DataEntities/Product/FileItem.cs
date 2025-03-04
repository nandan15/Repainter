namespace DataEntities.Product
{
    public class CatalogFile
    {
        public int FileId { get; set; }
        public string Name { get; set; }
        public string FileType { get; set; }
        public string FilePath { get; set; }
        public long FileSize { get; set; }  // Added new column for file size in bytes
        public int FolderId { get; set; }
        public int CategoryId { get; set; }
        public int CustomerId { get; set; }
        public int UserId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? LastModifiedBy { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public virtual Folder Folder { get; set; }
        public virtual Category Category { get; set; }
    }
}