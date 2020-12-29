using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    public class UserModel
    {
        public string Name { get;  set; }
        public string Uuid { get; set; }
        public string Username { get; set; }
        public UserRoles Role { get; set; }
        public string Email { get; set; }
        public string SessionToken { get; set; }
    }
}
