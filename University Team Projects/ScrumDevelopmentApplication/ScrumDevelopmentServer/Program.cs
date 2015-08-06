using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace ScrumDevelopmentServer
{
    class Program
    {
        static void Main(string[] args)
        {
            var userHost = new ServiceHost(typeof (UserService));
            userHost.Open();
            Console.WriteLine("UserService is running...");

            var projectHost = new ServiceHost(typeof (ProjectService));
            projectHost.Open();
            Console.WriteLine("ProjectService is running...");

            Console.ReadLine();
        }
    }
}
