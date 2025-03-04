using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataEntities.Product
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public int CustomerId { get; set; }
        public int UserId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? LastModifiedBy { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<Folder> Folders { get; set; }
    }
}
