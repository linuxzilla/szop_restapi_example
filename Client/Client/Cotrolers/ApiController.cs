using Newtonsoft.Json;
using RestSharp;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace Client
{
    class ApiController
    {
        private static string serverURl = "http://localhost:8081";
        private static string userRoute = "/user";
        private static string bookRoute = "/book";

        private static UserModel User = new UserModel();
        private static string SessionToken;

        public static void UserLogIn(string username_or_email, string password)
        {
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
                throw new UnknownApiErrorException(response.Content);

            string token = response.Headers.ToList().Find(x => x.Name == "x-auth-token").Value.ToString();

            UserModel tmpUser = JsonConvert.DeserializeObject<UserModel>(response.Content);
            User = tmpUser;
            SessionToken = token;
        }

        public static List<BookModel> GetAllBooks()
        {
            var client = new RestClient(serverURl + bookRoute);
            var request = new RestRequest("", Method.GET);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Authorization", SessionToken);
            var response = client.Execute(request);

            HttpStatusCode statusCode = response.StatusCode;
            int numericStatusCode = (int)statusCode;

            CheckExceptions(numericStatusCode, response.Content);

            return JsonConvert.DeserializeObject<List<BookModel>>(response.Content);
        }

        public static void Like(int id)
        {
            var client = new RestClient(serverURl + bookRoute + "/like/");
            var request = new RestRequest(id.ToString(), Method.PUT);
            request.AddHeader("Authorization", SessionToken);
            var response = client.Execute(request);

            HttpStatusCode statusCode = response.StatusCode;
            int numericStatusCode = (int)statusCode;

            CheckExceptions(numericStatusCode, response.Content);
        }

        public static void DisLike(int id)
        {
            var client = new RestClient(serverURl + bookRoute + "/dislike/");
            var request = new RestRequest(id.ToString(), Method.PUT);
            request.AddHeader("Authorization", SessionToken);
            var response = client.Execute(request);

            HttpStatusCode statusCode = response.StatusCode;
            int numericStatusCode = (int)statusCode;

            CheckExceptions(numericStatusCode, response.Content);
        }

        public static void Delete(int id)
        {
            var client = new RestClient(serverURl + bookRoute + "/delete/");
            var request = new RestRequest(id.ToString(), Method.DELETE);
            request.AddHeader("Authorization", SessionToken);
            var response = client.Execute(request);

            HttpStatusCode statusCode = response.StatusCode;
            int numericStatusCode = (int)statusCode;

            CheckExceptions(numericStatusCode, response.Content);
        }

        private static void Add(AddBookHelper book)
        {
            var client = new RestClient(serverURl + bookRoute);
            var request = new RestRequest("add", Method.POST);
            request.AddHeader("Authorization", SessionToken);
            request.RequestFormat = DataFormat.Json;
            request.AddJsonBody(book);
            IRestResponse response = client.Execute(request);

            HttpStatusCode statusCode = response.StatusCode;
            int numericStatusCode = (int)statusCode;

            CheckExceptions(numericStatusCode, response.Content);
        }

        public static void Logout()
        {
            var client = new RestClient(serverURl + userRoute);
            var request = new RestRequest("logout", Method.POST);
            request.AddHeader("Authorization", SessionToken);
            IRestResponse response = client.Execute(request);

            HttpStatusCode statusCode = response.StatusCode;
            int numericStatusCode = (int)statusCode;

            if (numericStatusCode == 200)
            {
                User = null;
                SessionToken = null;
            }

            CheckExceptions(numericStatusCode, response.Content);
        }

        private static void CheckExceptions(int code, string messageContent)
        {
            if (code == 401)
                throw new MissingAuthTokenException();
            else if (code == 400)
                throw new InvalidAuthTokenException();
            else if (code == 500)
                throw new ServerDatabaseErrorException();
            else if (code != 200)
                throw new UnknownApiErrorException(messageContent);
        }
    }
}
