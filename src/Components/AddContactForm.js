import React, {useState}from 'react'
import { Container, Form, Button, Col } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { addContact } from '../store/appFeed/actions'

export default function AddContactForm() {
    const [contact_name, set_contact_name] = useState("")
    const [contact_email, set_contact_email] = useState("")
    const [contact_phone, set_contact_phone] = useState("")
    const dispatch = useDispatch();

    const submitContactForm = () => {
        dispatch(addContact(
            contact_name,
            contact_email,
            contact_phone))
        
        set_contact_name("")
        set_contact_email("")
        set_contact_phone("")     
    }

    return (
        <Container>
            <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-3">
                <h1 className="mt-3 mb-3">Niew Contact Persoon</h1>
                <Form.Group>
                    <Form.Label>Naam</Form.Label>
                    <Form.Control
                        value={contact_name}
                        onChange={event => set_contact_name(event.target.value)}
                        type="text"
                        placeholder="Voer de naam in van het contact persoon"
                        required
                    />   
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={contact_email}
                        onChange={event => set_contact_email(event.target.value)}
                        type="text"
                        placeholder="Voer het email address in van het contact persoon"
                        required
                    />   
                </Form.Group>

                <Form.Group>
                    <Form.Label>Telefoon</Form.Label>
                    <Form.Control
                        value={contact_phone}
                        onChange={event => set_contact_phone(event.target.value)}
                        type="text"
                        placeholder="Voer nummer in van het contact persoon"
                        required
                    />   
                </Form.Group>

                <Form.Group className="mt-3">
                    <Button variant="primary" type="submit" onClick={submitContactForm}>
                        Voeg contact toe
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    )
}
