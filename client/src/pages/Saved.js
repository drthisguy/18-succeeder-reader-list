import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import SavedBooks from "../components/SavedBooks";
import API from "../utils/API";

function Saved () {
  const [books, setBooks] = useState([])

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const {id} = useParams()
  useEffect(() => {
    API.getBook(id)
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  }, [])

    // Load all books and store them with setBooks
    useEffect(() => {
      loadBooks()
    }, [])
  
    // Loads all books and sets them to books
    function loadBooks() {
      API.getBooks()
        .then(res => 
          setBooks(...books, res.data)
        )
        .catch(err => console.log(err));
    };
  
    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteBook(id) {
      API.deleteBook(id)
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }

    
  return (
      <Container classes={'mt-5'} >
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Catch up on the books you saved!
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row classes={'mt-5'}>
            <Col size={'md-12'} >
                <SavedBooks data={books} remove={deleteBook}  />
            </Col>
          </Row>
      </Container>
    );
  }


export default Saved;
