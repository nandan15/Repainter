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

        public async Task<DataEntities.Enquiry.Enquiry> GetByIdAsync(int id)
        {
            return await _context.Customer
                .FirstOrDefaultAsync(e => e.Id == id && !e.Deleted);
        }

        public async Task<List<DataEntities.Enquiry.Enquiry>> GetAllAsync()
        {
            return await Task.Run(() => _context.Customer.Where(e => !e.Deleted).OrderByDescending(e => e.CreatedOn).ToList());
        }
        public async Task<DataEntities.Enquiry.Enquiry> AddAsync(DataEntities.Enquiry.Enquiry enquiry)
        {
            // Make sure Id is not set or is set to 0
            enquiry.Id = 0; // This tells EF Core to let the database generate the Id

            enquiry.CreatedOn = DateTime.Now;
            enquiry.LastModified = DateTime.Now;

            // Generate the EnquiryId before saving
            enquiry.EnquiryId = GenerateEnquiryId();
            enquiry.Deleted = false;

            await _context.Customer.AddAsync(enquiry);
            await _context.SaveChangesAsync();

            // Double-check that we have the ID by reloading from DB
            var savedEnquiry = await _context.Customer.FindAsync(enquiry.Id);
            return savedEnquiry;
        }

        public async Task<DataEntities.Enquiry.Enquiry> UpdateAsync(DataEntities.Enquiry.Enquiry enquiry)
        {
            var existingEnquiry = await _context.Customer.FindAsync(enquiry.Id);
            if (existingEnquiry == null || existingEnquiry.Deleted)
            {
                return null;
            }
            existingEnquiry.Title = enquiry.Title;
            existingEnquiry.Name = enquiry.Name;
            existingEnquiry.PhoneNumber = enquiry.PhoneNumber;
            existingEnquiry.AlternatePhoneNumber = enquiry.AlternatePhoneNumber;
            existingEnquiry.EmailId = enquiry.EmailId;
            existingEnquiry.ProjectName = enquiry.ProjectName;
            existingEnquiry.HouseNo = enquiry.HouseNo;
            existingEnquiry.ProjectType = enquiry.ProjectType;
            existingEnquiry.Configurtion = enquiry.Configurtion;
            existingEnquiry.CarpetArea = enquiry.CarpetArea;
            existingEnquiry.ProjectLocation = enquiry.ProjectLocation;
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

            // Use more explicit ordering with multiple levels
            var latestEnquiry = _context.Customer
                .Where(e => e.EnquiryId.StartsWith(PREFIX) && !e.Deleted)
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

                // Add logging here in a real implementation
                Console.WriteLine($"Latest EnquiryId found: {latestEnquiry.EnquiryId}, Next sequence: {sequence}");
            }
            else
            {
                // Add logging here in a real implementation
                Console.WriteLine("No existing EnquiryId found with prefix ES6, starting with sequence 1");
            }

            return $"{PREFIX}{sequence:D3}"; // Format as ES6001, ES6002, etc.
        }
        public async Task<Dictionary<string, List<string>>> GetCustomerImagesFromStorageAsync(int id)
        {
            var result = new Dictionary<string, List<string>>();

            // Check if customer exists and is not deleted
            var enquiry = await _context.Customer.FindAsync(id);
            if (enquiry == null || enquiry.Deleted)
            {
                return null;
            }

            // Define the paths for floor and site plan directories
            string floorPlanDirectory = Path.Combine("wwwroot", "upload", "floor", id.ToString());
            string sitePlanDirectory = Path.Combine("wwwroot", "upload", "site", id.ToString());

            // Get floor plan images
            var floorPlanImages = new List<string>();
            if (Directory.Exists(floorPlanDirectory))
            {
                var files = Directory.GetFiles(floorPlanDirectory);
                foreach (var file in files)
                {
                    // Convert file system path to relative web path
                    string relativePath = Path.Combine("upload", "floor", id.ToString(), Path.GetFileName(file))
                        .Replace("\\", "/");
                    floorPlanImages.Add(relativePath);
                }
            }
            result.Add("floorPlan", floorPlanImages);

            // Get site plan images
            var sitePlanImages = new List<string>();
            if (Directory.Exists(sitePlanDirectory))
            {
                var files = Directory.GetFiles(sitePlanDirectory);
                foreach (var file in files)
                {
                    // Convert file system path to relative web path
                    string relativePath = Path.Combine("upload", "site", id.ToString(), Path.GetFileName(file))
                        .Replace("\\", "/");
                    sitePlanImages.Add(relativePath);
                }
            }
            result.Add("sitePlan", sitePlanImages);

            return result;
        }
    }
}