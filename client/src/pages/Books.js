import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Cards from "../components/Cards";

function Books() {
  // Setting our component's initial state
  const [search, setSearch] = useState([])
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };
  function handleSearch(e) {
    e.preventDefault();

    API.searchBooks(formObject)
    .then(({ data }) => {
     
     const search =  data.items.map( x => new Object({
            title: x.volumeInfo.title,
            author: x.volumeInfo.authors.join().replace(',', ', '),
            datePublished: x.volumeInfo.publishedDate.slice(0, 4),
            description: x.volumeInfo.description,
            coverImage: x.volumeInfo.imageLinks.thumbnail,
            ISBN: x.volumeInfo.industryIdentifiers[0].identifier,
            buyLink: x.saleInfo.buyLink,
      }),
      )
      setSearch(search)
    })
 }
  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title || formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };

    return (
      <div>
        <Container classes={'mt-5'}>
          <Row classes={'justify-content-center'}>
              <Jumbotron>
            <Col size="md-12">
                <h1>Find new books to read!</h1>
                <h6>(Powered by Google Books)</h6>
          
              <form>
                <Input
                  onChange={handleInputChange}
                  name="title"
                  placeholder="Title..."
                />
                <Input
                  onChange={handleInputChange}
                  name="author"
                  placeholder="Author..."
                />
      
                <FormBtn
                  disabled={!(formObject.author || formObject.title)}
                  onClick={handleSearch}
                  style={{ float: "right", marginBottom: 10 }} className="btn btn-success"
                >
                  Search Books
                </FormBtn>
              </form>
            </Col>
              </Jumbotron>
            
          </Row>
        </Container>
        <Container >
          <Row >
            <Col size={'md-12'} >
                <Cards data={search} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }


export default Books;
