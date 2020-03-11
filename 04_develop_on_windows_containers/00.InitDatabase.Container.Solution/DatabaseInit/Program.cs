using Book.DAL;
using System;

namespace DatabaseInit
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var db = new BookContext())
            {
                db.Books.Add(new Book.DAL.Book { Title = "Introduction to Docker" });
                db.SaveChanges();

                foreach (var book in db.Books)
                {
                    Console.WriteLine(book.Title);
                }
            }
        }
    }
}
