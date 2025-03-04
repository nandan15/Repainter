using DataModels.EmailModel;
using System.Threading.Tasks;

namespace DataServices.IEmailService
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailModel email);
    }
}
