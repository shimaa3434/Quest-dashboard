import React from 'react'
import Card from 'react-bootstrap/Card'
import PiechartCom from "./charts/PiechartCom"
const TopCard = (props) => {
  return (
    <Card className= "h-100 bg-body-tertiary shadow">
        <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
                <Card.Title className= "fs-2 fw-bold">
                    {props.title}
                </Card.Title>
                <Card.Text className= "fs-4">{props.text}</Card.Text>
            </div>
            <PiechartCom val_1={props.val_1} val_2= {props.val_2} val_3= {props.val_3} val_4= {props.val_4} COLORS={[props.color1, props.color2 , props.color3 , props.color4]}/> 
      </Card.Body>
    </Card>
  )
}

export default TopCard