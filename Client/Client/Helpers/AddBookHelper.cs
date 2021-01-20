using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    public class AddBookHelper
    {
        public Genres Genre { get; set; }
        public string Isbn { get; set; }
        public string Title { get; set; }
        public string OriginalTitle { get; set; }
        public string ReleaseDate { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }

    }
}
