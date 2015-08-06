using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{    
    /// <summary>
    /// This interface determines the operations that have to be defined in the project user service
    /// </summary>

    [ServiceContract]
    public interface IProjectUserService
    {
        [OperationContract]
        bool InsertProjectUser(string email, bool scrumMaster, bool productOwner, bool developer, int projectId);
        
        [OperationContract]
        bool DeleteProjectUser(string email, int projectId, string role);

        [OperationContract]
        bool IsProjectOwner(string email, int projectId);

        [OperationContract]
        bool IsProductOwner(string email, int projectId);

        [OperationContract]
        bool IsScrumMaster(string email, int projectId);

        [OperationContract]
        bool IsDeveloper(string email, int projectId);

        [OperationContract]
        string[] GetAssociatedProjectList(string email);

        [OperationContract]
        string[] GetProjectTeamList(int projectId);

        [OperationContract]
        void DeleteProductOwner(int projectId);

        [OperationContract]
        bool IsUserInTheProject(string email, int projectId, string role);
    }
}
