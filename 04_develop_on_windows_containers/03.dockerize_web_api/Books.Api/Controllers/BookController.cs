using Book.DAL;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Books.Api.Controllers
{
    public class BookController : ApiController
    {
        private BookContext _bookContext;

        public BookController()
        {
            _bookContext = new BookContext();
        }

        [HttpGet]
        [Route("api/books")]
        public IEnumerable<Book.DAL.Book> GetBooks()
        {
            var books = _bookContext.Books.ToList();
            return books;
        }
    }
}
