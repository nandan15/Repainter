using AutoMapper;
using DataEntities.Enquiry;
using DataModels.Enquiry;
using DataServices.Authentication;
using DataServices.Customer;
using DataServices.Repository.CustomerRepository;
using Microsoft.AspNetCore.Http;
using Shared.Contexts.Base;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataServices.Customer
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _enquiryRepository;
        private readonly IMapper _mapper;
        private readonly ICurrentUser _currentUser;
        public CustomerService(
            ICustomerRepository enquiryRepository,
            IMapper mapper,
            ICurrentUser currentUser)
        {
            _enquiryRepository = enquiryRepository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<EnquiryModel> GetByIdAsync(int id)
        {
            var enquiry = await _enquiryRepository.GetByIdAsync(id);
            return _mapper.Map<EnquiryModel>(enquiry);
        }

        public async Task<List<EnquiryModel>> GetAllAsync()
        {
            var enquiries = await _enquiryRepository.GetAllAsync();
            return _mapper.Map<List<EnquiryModel>>(enquiries);
        }

        public async Task<EnquiryModel> AddAsync(EnquiryModel enquiryModel, int userId)
        {
            var enquiry = _mapper.Map<DataEntities.Enquiry.Enquiry>(enquiryModel);
            enquiry.CreatedBy = userId;
            enquiry.LastModifiedBy = userId;
            var result = await _enquiryRepository.AddAsync(enquiry);
            return _mapper.Map<EnquiryModel>(result);
        }
        public async Task<EnquiryModel> UpdateAsync(EnquiryModel enquiryModel, int userId, bool partialUpdate = true)
        {
            var enquiry = _mapper.Map<DataEntities.Enquiry.Enquiry>(enquiryModel);
            enquiry.LastModifiedBy = userId;
            var result = await _enquiryRepository.UpdateAsync(enquiry, partialUpdate);
            return _mapper.Map<EnquiryModel>(result);
        }
        

        public async Task<bool> DeleteAsync(int id)
        {
            return await _enquiryRepository.DeleteAsync(id);
        }

        public async Task<bool> UploadImagesAsync(int id, IFormFileCollection floorPlanImages, IFormFileCollection sitePlanImages)
        {
            return await _enquiryRepository.UploadImagesAsync(id, floorPlanImages, sitePlanImages);
        }
        public async Task<string> GetNextEnquiryIdAsync()
        {
            return await _enquiryRepository.GetNextEnquiryIdAsync();
        }
        public async Task<Dictionary<string, List<string>>> GetCustomerImagesFromStorageAsync(int id)
        {
            return await _enquiryRepository.GetCustomerImagesFromStorageAsync(id);
        }
    }
}