using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;


namespace ScrumDevelopmentInterface
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IUserService" in both code and config file together.

    [ServiceContract]
    public interface IUserService 
    {
        [OperationContract]
        bool InsertUser(String email, String name, String password, bool productOwner, bool scrumMaster, bool developer);
        [OperationContract]
        bool DeleteUser(String email, String name, bool productOwner, bool scrumMaster, bool developer);
        [OperationContract]
        bool AuthenticatedLogin(string email, string password);
        [OperationContract]
        bool UpdateUser(string email, string name, string oldpassword, string password, bool productOwner, bool scrumMaster, bool developer);
        [OperationContract]
        string getLoggedInName(String email);
        [OperationContract]
        bool getLoggedInDeveloper(String email);
        [OperationContract]
        bool getLoggedInProductOwner(String email);
        [OperationContract]
        bool getLoggedInScrumMaster(String email);
        [OperationContract]
        bool CompareEmail(String email);
        [OperationContract]
        bool CheckIfRolesValid(String email, bool? scrumMaster, bool? productOwner, bool? developer);
    }

}
