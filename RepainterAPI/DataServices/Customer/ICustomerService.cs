using DataEntities.Enquiry;
using DataModels.Enquiry;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataServices.Customer
{
    public interface ICustomerService
    {
        Task<EnquiryModel> GetByIdAsync(int id);
        Task<List<EnquiryModel>> GetAllAsync();
        Task<EnquiryModel> AddAsync(EnquiryModel enquiryModel, int userId);
        Task<EnquiryModel> UpdateAsync(EnquiryModel enquiryModel, int userId);
        Task<bool> DeleteAsync(int id);
        Task<bool> UploadImagesAsync(int id, IFormFileCollection floorPlanImages, IFormFileCollection sitePlanImages);
        Task<string> GetNextEnquiryIdAsync();
        Task<Dictionary<string, List<string>>> GetCustomerImagesFromStorageAsync(int id);
    }
}
