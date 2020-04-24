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
  const [saved, addBook] = useState([])
  const [formObject, setFormObject] = useState({})
  const [alert, showAlert] = useState({show: false})

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  }
  
  function handleSearch(e) {
    e.preventDefault();

    API.searchBooks(formObject)
    .then(({ data }) => {
     
     const search =  data.items.map( x => new Object({
            saved: false,
            title: x.volumeInfo.title,
            author: x.volumeInfo.authors.join().replace(',', ', '),
            datePublished: x.volumeInfo.publishedDate.slice(0, 4),
            description: x.volumeInfo.description,
            details: x.volumeInfo.infoLink,
            coverImage: x.volumeInfo.imageLinks.thumbnail,
            buyLink: x.saleInfo.buyLink,
            ISBN: x.volumeInfo.industryIdentifiers[0].identifier,
      }),
      )
      setSearch(search)
    })
 }

  const toggleMessage = (msg, color) => {
      showAlert({
        show: !alert.show,
        color,
        msg
      })
   }

  const saveBook = async(index) => {
      // setSearch({...search, saved: true})
      addBook(...saved, search[index])
      const { data } = await API.saveBook(saved)
        
      if (data.status === 'success') {
        toggleMessage('Book Saved!', 'green')
    }   else  {
        toggleMessage('Book failed to save.', 'red')
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
                <Cards data={search} save={saveBook} msg={toggleMessage} alert={alert} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }


export default Books;
