import React from "react";
import { Row, Col } from '../Grid'
import { FormBtn } from '../Form'

export default function Cards({ data }) {
  return (
    data.map( book => {
      return(
    <div className="card">
      <h5 className="card-header">{book.title}  ({book.datePublished})</h5>
        <div className="card-body">
          <h6 className="card-title">{book.author}</h6>
          <Row >
            <Col size={"md-3"}>
              <img src={book.coverImage} alt={'Book Cover'} />
            </Col>
            <Col size={"md-9"}>
              <p className="card-text">{book.description}</p>
            </Col>
          </Row>
          <FormBtn className="btn btn-info" style={btnStyle}>
            Save
            </FormBtn>
      </div>
    </div>)
    })
  )
}
const btnStyle = { 
  float: "right", 
  marginBottom: 10,
  marginTop: 10
}
