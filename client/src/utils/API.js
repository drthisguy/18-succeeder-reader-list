import axios from "axios";

export default {
  
  searchBooks: ({ title, author }) => {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title ? title : ''}+inauthor:${author ? author : ''}&key=AIzaSyCI3zv9mMZuVUPGueGVIYUyD3etz0VJK7I`);
  },

  getBooks: () => axios.get("/api/books"),

  deleteBook: id =>  axios.delete("/api/books/" + id),

  saveBook: bookData =>  axios.post("/api/books", bookData)

}
