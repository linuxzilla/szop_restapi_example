using Newtonsoft.Json;
using RestSharp;
using System.Linq;

namespace Client.Cotrolers
{
    class ApiController
    {
        private static string serverURl = "http://localhost:8081";
        private static string userRoute = "/user";
        private static string bookRoute = "/book";

        private static UserModel User = new UserModel();

        public static void UserLogIn(string username_or_email, string password)
        {
            //ToDo : implement sha256
            var client = new RestClient(serverURl + userRoute);
            var request = new RestRequest("login", Method.POST);  //Create
            request.RequestFormat = DataFormat.Json;
            request.AddJsonBody(
               new LoginHelper
               {
                   username_or_email = username_or_email,
                   password = password
               }
            );
            IRestResponse response = client.Execute(request);
            string token = response.Headers.ToList().Find(x => x.Name == "auth-token").Value.ToString();

            //rework needed only for testing
            UserModel tmpUser = JsonConvert.DeserializeObject<UserModel>(response.Content);
            User = tmpUser;
            User.SessionToken = token;
        }


    }
}
