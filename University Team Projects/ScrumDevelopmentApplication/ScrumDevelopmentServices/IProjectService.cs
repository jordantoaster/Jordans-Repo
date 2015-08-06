using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    /// <summary>
    /// This interface determines the operations that have to be defined in the project service
    /// </summary>

    [ServiceContract]
    public interface IProjectService
    {
        [OperationContract]
        bool InsertProject(string name, string email, string description, string startDate);
        [OperationContract]
        bool InsertProjectUser(int id, string email, string role);
        [OperationContract]
        string[] GetProjectList();
        [OperationContract]
        List<string> SearchForProjectUser(string searchString, bool productOwner, bool scrumMaster, bool developer);
        [OperationContract]
        string GetProjectStartDate(int id);
        [OperationContract]
        string GetProjectDescription(int id);
        [OperationContract]
        bool DeleteProject(string email, int id);
        [OperationContract]
        bool DeleteProjectUser(string email, int id, string role);
    }
}
