import React from "react";
import { Row, Col } from '../Grid'
import { FormBtn } from '../Form'

export default function Cards({ data, alert, save, msg }) {
  return (
    data.map( (book, i) => {
      return(
    <div key={book.ISBN} className="card">
      <h4 className="card-header">{book.title}  ({book.datePublished})</h4>
        <div className="card-body">
          <h5 className="card-title mb-2">{book.author}</h5>
          <Row >
            <Col size={"md-3"}>
              <img src={book.coverImage} alt={'Book Cover'} />
            </Col>
            <Col size={"md-9"}>
              <p className="card-text">{book.description}</p>
            </Col>
          </Row>
          <Row >
            <Col size={'md-12'}>
          <FormBtn onClick={save.bind(this, i)} onclick={msg.bind(this)} data-index={i} className="btn btn-info" style={saveBtn}>
            Save
            </FormBtn>
            <a href={book.details} target={'_blank'}>
          <FormBtn className="btn btn-primary" style={detsBtn}>
            Details
            </FormBtn>
            </a>
            </Col>
            </Row>
            <Row >
              <Col size={'md-12'} classes={'text-right'}>
              {alert.show && <Messenger msg={alert.msg} color={alert.color} />}
              </Col>
            </Row>
      </div>
    </div>)
    })
  )
}

const Messenger = ({ msg, color }) => <p style={{color: color, marginRight: 15}}>{msg}</p>,

 saveBtn = { 
  float: "right", 
  margin: 20,
  width: 120
},

 detsBtn = { 
  float: "right", 
  margin: 20
}
