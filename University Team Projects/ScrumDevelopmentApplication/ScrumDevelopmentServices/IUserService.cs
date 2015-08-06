using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    /// <summary>
    /// This interface determines the operations that have to be defined in the user service
    /// </summary>

    [ServiceContract]
    public interface IUserService
    {
        [OperationContract]
        bool InsertUser(String email, String name, String password, bool productOwner, bool scrumMaster, bool developer, string bio);
        [OperationContract]
        bool DeleteUser(String email);
        [OperationContract]
        string AuthenticatedLogin(string email, string password);
        [OperationContract]
        bool UpdateUser(string email, string name, string oldpassword, string password, bool productOwner, bool scrumMaster, bool developer, string bio);
        [OperationContract]
        string GetLoggedInName(String email);
        [OperationContract]
        bool GetLoggedInDeveloper(String email);
        [OperationContract]
        bool GetLoggedInProductOwner(String email);
        [OperationContract]
        bool GetLoggedInScrumMaster(String email);
        [OperationContract]
        bool CompareEmail(String email);
        [OperationContract]
        bool CheckIfRolesValid(String email, bool? scrumMaster, bool? productOwner, bool? developer);

        [OperationContract]
        string GetLoggedBio(string email);
    }
}
