import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import Cards from "../components/Cards";
let books;
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
     
      books =  data.items.map( x => new Object({
            title: x.volumeInfo.title,
            author: x.volumeInfo.authors ? x.volumeInfo.authors.join().replace(',', ', ') : 'Unlisted',
            datePublished: x.volumeInfo.publishedDate ? x.volumeInfo.publishedDate.slice(0, 4) : 'Year Unlisted',
            description: x.volumeInfo.description,
            details: x.volumeInfo.infoLink, 
            coverImage: x.volumeInfo.imageLinks.thumbnail ? x.volumeInfo.imageLinks.thumbnail : 'https://bitsofco.de/content/images/2018/12/broken-1.png',
            buyLink: x.saleInfo.buyLink ? x.saleInfo.buyLink : '' ,
            ISBN: x.volumeInfo.industryIdentifiers ? x.volumeInfo.industryIdentifiers[0].identifier : 'ISBN unlisted'

      }),
      )
      setSearch(books)
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

    addBook([...saved, search[index]])
   
      const res = await API.saveBook(search[index])
      if (res.status === 200) {
      window.alert(`${search[index].title} saved successfully!`)
      } else {
        window.alert(`${search[index].title} failed to save.`)
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
