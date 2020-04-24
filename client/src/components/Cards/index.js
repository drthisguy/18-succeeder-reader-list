import React from "react";
import { Row, Col } from '../Grid'
import { FormBtn } from '../Form'

export default function Cards({ data, alert, save }) {
  return (
    data.map( book => {
      return(
    <div key={book.ISBN} className="card">
      <h5 className="card-header">{book.title}  ({book.datePublished})</h5>
        <div className="card-body">
          <h6 className="card-title">{book.author}</h6>
          <Row >
            <Col size={"md-3"}>
              <img src={book.coverImage} alt={'Book Cover'} />
              {/* <a href={book.details} >Need More Details?</a> */}
            </Col>
            <Col size={"md-9"}>
              <p className="card-text">{book.description}</p>
            </Col>
          </Row>
          <FormBtn onClick={save} className="btn btn-info" style={saveBtn}>
            Save
            </FormBtn>
            <a href={book.details} target={'_blank'}>
          <FormBtn className="btn btn-primary" style={detsBtn}>
            Details
            </FormBtn>
            </a>
            <Row classes={'text-right'}>
              {alert.show && <Messenger msg={alert.msg} color={alert.color} />}
            </Row>
      </div>
    </div>)
    })
  )
}

const Messenger = ({ msg, color }) => <p style={{color: color}}>{msg}</p>,

 saveBtn = { 
  float: "right", 
  margin: 20,
  width: 120
},

 detsBtn = { 
  float: "right", 
  margin: 20
}
