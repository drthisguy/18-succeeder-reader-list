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

  const [search, setSearch] = useState([])
  const [formObject, setFormObject] = useState({})
  const [alert, toggleMessage] = useState({show: false})

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  }
  
  function handleSearch(e) {
    e.preventDefault();

    API.searchBooks(formObject)
    .then(({ data }) => {
     
     const search =  data.items.map( x => new Object({
            title: x.volumeInfo.title,
            author: x.volumeInfo.authors.join().replace(',', ', '),
            datePublished: x.volumeInfo.publishedDate.slice(0, 4),
            description: x.volumeInfo.description,
            details: x.volumeInfo.infoLink,
            coverImage: x.volumeInfo.imageLinks.thumbnail,
            ISBN: x.volumeInfo.industryIdentifiers[0].identifier,
            buyLink: x.saleInfo.buyLink,
      }),
      )
      setSearch(search)
    })
 }
  
  const saveBook = async(e) => {
    e.preventDefault();

      const { data } = await API.saveBook(search)
        
      if (data.status === 'success') {
        toggleMessage({
            show: true,
            color: 'green',
            msg: 'Book Saved!',
        })
    }   else  {
        toggleMessage({
            show: true,
            color: 'red',
            msg: 'Book failed to save.',
        })
    }  
  }

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
                  style={{ marginBottom: 10 }} className="btn btn-success"
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
                <Cards data={search} save={saveBook} alert={alert} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }


export default Books;
