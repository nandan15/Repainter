using DataEntities.Enquiry;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
namespace DataServices.Repository.CustomerRepository
{
    public interface ICustomerRepository
    {
        Task<DataEntities.Enquiry.Enquiry> GetByIdAsync(int id);
        Task<List<DataEntities.Enquiry.Enquiry>> GetAllAsync();
        Task<DataEntities.Enquiry.Enquiry> AddAsync(DataEntities.Enquiry.Enquiry enquiry);
        Task<DataEntities.Enquiry.Enquiry> UpdateAsync(DataEntities.Enquiry.Enquiry enquiry, bool partialUpdate = true);  // Updated with optional parameter
        Task<bool> DeleteAsync(int id);
        Task<bool> UploadImagesAsync(int id, IFormFileCollection floorPlanImages, IFormFileCollection sitePlanImages);
        Task<string> GetNextEnquiryIdAsync();
        Task<Dictionary<string, List<string>>> GetCustomerImagesFromStorageAsync(int id);
    }
}