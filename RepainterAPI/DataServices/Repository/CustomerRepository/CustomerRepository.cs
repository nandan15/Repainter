using DataCore;
using DataModels.Enquiry;
using DataServices.Repository.CustomerRepository;
using DataServices.Repository.FileUploadStorage;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

namespace DataServices.Repository.CustomerRepository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly RepainterContext _context;
        private readonly IFileStorageService _fileStorageService;

        public CustomerRepository(RepainterContext context, IFileStorageService fileStorageService)
        {
            _context = context;
            _fileStorageService = fileStorageService;
        }
        public Task<DataEntities.Enquiry.Enquiry> GetByIdAsync(int id)
        {
            var result = _context.Customer.FirstOrDefault(e => e.Id == id && !e.Deleted);
            return Task.FromResult(result);
        }
        public async Task<List<DataEntities.Enquiry.Enquiry>> GetAllAsync()
        {
            return await Task.Run(() => _context.Customer.Where(e => !e.Deleted).OrderByDescending(e => e.CreatedOn).ToList());
        }
        public async Task<DataEntities.Enquiry.Enquiry> AddAsync(DataEntities.Enquiry.Enquiry enquiry)
        {
            enquiry.Id = 0;
            enquiry.CreatedOn = DateTime.Now;
            enquiry.LastModified = DateTime.Now;
            enquiry.EnquiryId = GenerateEnquiryId();
            enquiry.Deleted = false;
            await _context.Customer.AddAsync(enquiry);
            await _context.SaveChangesAsync();
            var savedEnquiry = await _context.Customer.FindAsync(enquiry.Id);
            return savedEnquiry;
        }
        public async Task<DataEntities.Enquiry.Enquiry> UpdateAsync(DataEntities.Enquiry.Enquiry enquiry, bool partialUpdate = true)
        {
            var existingEnquiry = await _context.Customer.FindAsync(enquiry.Id);
            if (existingEnquiry == null || existingEnquiry.Deleted)
            {
                return null;
            }
            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.EnquiryId))
                existingEnquiry.EnquiryId = enquiry.EnquiryId;

            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.Title))
                existingEnquiry.Title = enquiry.Title;

            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.Name))
                existingEnquiry.Name = enquiry.Name;

            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.PhoneNumber))
                existingEnquiry.PhoneNumber = enquiry.PhoneNumber;

            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.AlternatePhoneNumber))
                existingEnquiry.AlternatePhoneNumber = enquiry.AlternatePhoneNumber;

            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.EmailId))
                existingEnquiry.EmailId = enquiry.EmailId;

            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.ProjectName))
                existingEnquiry.ProjectName = enquiry.ProjectName;

            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.HouseNo))
                existingEnquiry.HouseNo = enquiry.HouseNo;

            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.ProjectType))
                existingEnquiry.ProjectType = enquiry.ProjectType;

            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.Configurtion))
                existingEnquiry.Configurtion = enquiry.Configurtion;

            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.CarpetArea))
                existingEnquiry.CarpetArea = enquiry.CarpetArea;

            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.ProjectLocation))
                existingEnquiry.ProjectLocation = enquiry.ProjectLocation;

            if (!partialUpdate || !string.IsNullOrEmpty(enquiry.City))
                existingEnquiry.City = enquiry.City;

            existingEnquiry.LastModified = DateTime.Now;
            existingEnquiry.LastModifiedBy = enquiry.LastModifiedBy;
            await _context.SaveChangesAsync();
            return existingEnquiry;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var enquiry = await _context.Customer.FindAsync(id);
            if (enquiry == null)
            {
                return false;
            }

            enquiry.Deleted = true;
            enquiry.LastModified = DateTime.Now;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UploadImagesAsync(int id, IFormFileCollection floorPlanImages, IFormFileCollection sitePlanImages)
        {
            var enquiry = await _context.Customer.FindAsync(id);
            if (enquiry == null || enquiry.Deleted)
            {
                return false;
            }
            if (floorPlanImages != null && floorPlanImages.Count > 0)
            {
                var floorPlanPaths = new List<string>();
                foreach (var image in floorPlanImages)
                {
                    if (image.Length > 0)
                    {
                        string fileName = $"{Guid.NewGuid()}_{Path.GetFileName(image.FileName)}";
                        string filePath = Path.Combine("wwwroot", "upload", "floor", id.ToString(), fileName);
                        string dbPath = Path.Combine("upload", "floor", id.ToString(), fileName);

                        Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        floorPlanPaths.Add(dbPath.Replace("\\", "/"));
                    }
                }
                enquiry.FloorPlan = string.Join(",", floorPlanPaths);
            }
            if (sitePlanImages != null && sitePlanImages.Count > 0)
            {
                var sitePlanPaths = new List<string>();
                foreach (var image in sitePlanImages)
                {
                    if (image.Length > 0)
                    {
                        string fileName = $"{Guid.NewGuid()}_{Path.GetFileName(image.FileName)}";
                        string filePath = Path.Combine("wwwroot", "upload", "site", id.ToString(), fileName);
                        string dbPath = Path.Combine("upload", "site", id.ToString(), fileName);

                        Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        sitePlanPaths.Add(dbPath.Replace("\\", "/"));
                    }
                }
                enquiry.SitePlan = string.Join(",", sitePlanPaths);
            }

            enquiry.LastModified = DateTime.Now;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<string> GetNextEnquiryIdAsync()
        {
            const string PREFIX = "ES6";
            var latestEnquiries = _context.Customer
                .Where(e => e.EnquiryId.StartsWith(PREFIX) && !e.Deleted)
                .ToList();

            var latestEnquiry = latestEnquiries
                .OrderByDescending(e => e.EnquiryId.Length)
                .ThenByDescending(e => e.EnquiryId)
                .FirstOrDefault();

            int sequence = 1;
            if (latestEnquiry != null)
            {
                string sequenceStr = latestEnquiry.EnquiryId.Substring(PREFIX.Length);
                if (int.TryParse(sequenceStr, out int lastSequence))
                {
                    sequence = lastSequence + 1;
                }
                Console.WriteLine($"Latest EnquiryId found: {latestEnquiry.EnquiryId}, Next sequence: {sequence}");
            }
            else
            {
                Console.WriteLine("No existing EnquiryId found with prefix ES6, starting with sequence 1");
            }

            return await Task.FromResult($"{PREFIX}{sequence:D3}");
        }
        private string GenerateEnquiryId()
        {
            const string PREFIX = "ES6";
            var latestEnquiry = _context.Customer.Where(e => e.EnquiryId.StartsWith(PREFIX) && !e.Deleted).OrderByDescending(e => e.EnquiryId.Length).ThenByDescending(e => e.EnquiryId).FirstOrDefault();
            int sequence = 1;
            if (latestEnquiry != null)
            {
                string sequenceStr = latestEnquiry.EnquiryId.Substring(PREFIX.Length);
                if (int.TryParse(sequenceStr, out int lastSequence))
                {
                    sequence = lastSequence + 1;
                }
                Console.WriteLine($"Latest EnquiryId found: {latestEnquiry.EnquiryId}, Next sequence: {sequence}");
            }
            else
            {
                Console.WriteLine("No existing EnquiryId found with prefix ES6, starting with sequence 1");
            }

            return $"{PREFIX}{sequence:D3}"; 
        }
        public async Task<Dictionary<string, List<string>>> GetCustomerImagesFromStorageAsync(int id)
        {
            var result = new Dictionary<string, List<string>>();
            var enquiry = await _context.Customer.FindAsync(id);
            if (enquiry == null || enquiry.Deleted)
            {
                return null;
            }
            string floorPlanDirectory = Path.Combine("wwwroot", "upload", "floor", id.ToString());
            string sitePlanDirectory = Path.Combine("wwwroot", "upload", "site", id.ToString());
            var floorPlanImages = new List<string>();
            if (Directory.Exists(floorPlanDirectory))
            {
                var files = Directory.GetFiles(floorPlanDirectory);
                foreach (var file in files)
                {
                    string relativePath = Path.Combine("upload", "floor", id.ToString(), Path.GetFileName(file))
                        .Replace("\\", "/");
                    floorPlanImages.Add(relativePath);
                }
            }
            result.Add("floorPlan", floorPlanImages);
            var sitePlanImages = new List<string>();
            if (Directory.Exists(sitePlanDirectory))
            {
                var files = Directory.GetFiles(sitePlanDirectory);
                foreach (var file in files)
                {
                    string relativePath = Path.Combine("upload", "site", id.ToString(), Path.GetFileName(file)).Replace("\\", "/");
                    sitePlanImages.Add(relativePath);
                }
            }
            result.Add("sitePlan", sitePlanImages);

            return result;
        }
    }
}