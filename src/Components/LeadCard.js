import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function LeadCard(props) {
    return (
            <Card bg={'light'} text={'dark'} className="w-75 mt-5">
                <Card.Header>
                <Card.Title>{props.lead}</Card.Title>   
                <Card.Subtitle className="text-muted">
                    {props.partner}</Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <Card.Text >Address: {props.address}</Card.Text>
                    <Card.Text >Email: {props.email}</Card.Text>
                    <Card.Text >Leverancier: {props.supplier}</Card.Text>
                    <Card.Text >Telefoon: {props.phone}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button href={`/lead/${props.id}`}
                            className="flex-inline ml-5" 
                            variant={'outline-dark'}>Meer info</Button>
                    <Button href={`/action/${props.id}`}
                            className="flex-inline ml-5"
                            variant={'outline-dark'}>Plan nieuw event</Button>
                </Card.Footer>
            </Card>
    )
}
