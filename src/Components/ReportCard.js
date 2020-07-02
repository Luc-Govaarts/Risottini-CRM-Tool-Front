import React from 'react'
import {Card, Container} from 'react-bootstrap'

export default function ReportCard(props) {
    return (<Container>
                <Card>
                    <Card.Header>
                        <Card.Title>{props.lead}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text> Gebruiker: {props.user}</Card.Text>
                        <Card.Text> Datum: {props.date}</Card.Text>
                        <Card.Text> Notitie: {props.note}</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
    )
}
