using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Runtime.InteropServices;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using ScrumDevelopmentApplication.View;
using ScrumDevelopmentInterface;

namespace ScrumDevelopmentApplication.Model
{
    /// <summary>
    /// Functionality that allows setting and retrieval of user details
    /// </summary>
    public static class User
    {
        public static string Email { get; set; }
        public static string Name { get; set; }
        public static bool ScrumMaster { get; set; }
        public static bool Developer { get; set; }
        public static bool ProductOwner { get; set; }
        public static bool RememberUser { get; set; }
        public static string Password { get; set; }
    }
}
