using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IAcceptanceTestService" in both code and config file together.
    [ServiceContract]
    public interface IAcceptanceTestService
    {
        [OperationContract]
        bool InsertAcceptanceTest(string atName, string atDescription, int userStoryId);
        [OperationContract]
        bool DeleteAcceptanceTest(int testId);
        [OperationContract]
        string[] GetTestList(int storyId);
        [OperationContract]
        string[] GetAcceptanceTest(int acceptanceTestId);
    }
}
