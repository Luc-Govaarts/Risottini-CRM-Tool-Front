import React from 'react'
import { Card, Badge, Button } from 'react-bootstrap'

export default function SmallLeadCard(props) {
    
    return (
        <Card bg={'light'} text={'dark'}>
            <Card.Header>
                <Card.Title>{props.lead}</Card.Title><Badge pill={true} variant={"secondary"}>{props.phase}</Badge>
            </Card.Header>
            <Card.Body>
                <Card.Text>Contact persoon: {props.contact}</Card.Text>
            </Card.Body>
        </Card>
    )
}
