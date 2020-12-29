using Newtonsoft.Json;
using RestSharp;
using System.Collections.Generic;
using System.Linq;
using System.Net;

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

            HttpStatusCode statusCode = response.StatusCode;
            int numericStatusCode = (int)statusCode;

            if (numericStatusCode == 401)
                throw new NoSuchUserException();
            else if (numericStatusCode == 400)
                throw new WrongPasswordException();
            else if (numericStatusCode != 200)
                throw new UnknownApiErrorException();

            string token = response.Headers.ToList().Find(x => x.Name == "auth-token").Value.ToString();

            //rework needed only for testing
            UserModel tmpUser = JsonConvert.DeserializeObject<UserModel>(response.Content);
            User = tmpUser;
            User.SessionToken = token;
        }

        public static List<BookModel> GetAllBooks()
        {
            var client = new RestClient(serverURl + bookRoute);
            var request = new RestRequest("allBook", Method.GET);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Authorization", User.SessionToken);
            var response = client.Execute(request);

            HttpStatusCode statusCode = response.StatusCode;
            int numericStatusCode = (int)statusCode;

            if (numericStatusCode == 401)
                throw new MissingAuthTokenException();
            else if (numericStatusCode == 400)
                throw new InvalidAuthTokenException();
            else if (numericStatusCode == 500)
                throw new ServerDatabaseErrorException();
            else if (numericStatusCode != 200)
                throw new UnknownApiErrorException();

            return JsonConvert.DeserializeObject<List<BookModel>>(response.Content);          
        }
    }
}
