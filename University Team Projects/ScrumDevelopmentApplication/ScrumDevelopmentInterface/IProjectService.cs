using System.ServiceModel;

namespace ScrumDevelopmentInterface
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IProjectService" in both code and config file together.
    [ServiceContract]
    public interface IProjectService
    {
        [OperationContract]
        bool InsertProject(string name, string email, string description);
        [OperationContract]
        bool InsertProjectUser(string name, string description, string email, string role);
        [OperationContract]
        bool DeleteProject(string email, string name, string description);
        [OperationContract]
        bool DeleteProjectUser(string email, string name, string description, string role);
    }
}
