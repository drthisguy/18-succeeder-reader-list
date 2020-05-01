import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import SavedBooks from "../components/SavedBooks";
import API from "../utils/API";

function Saved () {
  const [books, setBooks] = useState([])

    useEffect(() => {
      loadBooks()
    }, [])
  
    const  loadBooks = () => {
      API.getBooks()
        .then(res => 
          setBooks(res.data)
        )
        .catch(err => console.log(err))
      },

      deleteBook = _id => { 
      API.deleteBook(_id)
        .then(res => loadBooks())
        .catch(err => console.log(err));
      }

    
  return (
      <Container classes={'mt-5'} >
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Catch up on all the books you saved!
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
