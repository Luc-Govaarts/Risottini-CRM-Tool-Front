import React from 'react'
import { Card, Button } from 'react-bootstrap'


export default function LeadCard(props) {
    return (
            <Card className="w-75 mt-5">
                <Card.Header>
                <Card.Title>{props.lead}</Card.Title>   
                <Card.Subtitle className="text-muted">
                    {props.partner}</Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <Card.Text className="md">Telefoon: {props.phone}</Card.Text>
                    <Card.Text className="md">Address: {props.address}</Card.Text>
                    <Card.Text className="md-left">Email: {props.email}</Card.Text>
                    <Card.Text className="md-left">Leverancier: {props.supplier}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" className="flex-inline w-25 ml-3">Rapporten</Button>
                    <Button variant="primary" className="flex-inline w-25 ml-3">Acties</Button>
                </Card.Footer>
            </Card>
    )
}
