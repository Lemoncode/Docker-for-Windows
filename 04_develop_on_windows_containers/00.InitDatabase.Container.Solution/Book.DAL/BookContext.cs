using System.Data.Entity;

namespace Book.DAL
{
    public class BookContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public BookContext() : base("BookContext") {}
    }
}
