using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    public class BookModel
    {
        public int Id { get; set; }
        public Genres Genre { get; set; }
        public string Isbn { get; set; }
        public string Title { get; set; }
        public string OriginalTitle { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get;  set; }
    }
}
