import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { selectToken } from "../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function AddProspect() {
    const [company_name, set_company_name] = useState("")
    const [associated_company_name, set_associated_company_name] = useState("")
    const [company_phone, set_company_phone] = useState()
    const [company_address, set_company_address] = useState("")
    const [company_email, set_company_email] = useState("")
    const [supplier, set_supplier] = useState("")
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const history = useHistory();

    useEffect(() => {
        if (!token) {
          history.push("/");
        } 
      }, [token, history]);

    const submitForm = () => {
        


        set_associated_company_name("")
        set_company_phone()
        set_company_address("")
        set_company_email("")
        set_supplier("")
    }

    return (
    <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <h1 className="mt-5 mb-5">Niewe lead</h1>

            <Form.Group controlId="formBasicCompanyName">
              <Form.Label>Bedrijfs naam</Form.Label>
              <Form.Control
                value={company_name}
                onChange={event => set_company_name(event.target.value)}
                type="text"
                placeholder="Voer de bedrijfsnaam in"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicAssociatedCompanyName">
              <Form.Label>Partners</Form.Label>
              <Form.Control
                value={associated_company_name}
                onChange={event => set_associated_company_name(event.target.value)}
                type="text"
                placeholder="Voeg partners toe. Bijvoorbeeld: Vermaat Groep"
              />
            </Form.Group>

            <Form.Group controlId="formBasicCompanyPhone">
              <Form.Label>Telefoon nummer</Form.Label>
              <Form.Control
                value={company_phone}
                onChange={event => set_company_phone(event.target.value)}
                type="tel"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicCompanyEmailAddress">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={company_email}
                onChange={event => set_company_email(event.target.value)}
                type="text"
                placeholder="Voeg email toe"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicCompanyAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={company_address}
                onChange={event => set_company_address(event.target.value)}
                type="text"
                placeholder="Voeg address gegevens toe"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicCompanySupplier">
              <Form.Label>Leverancier</Form.Label>
              <Form.Control
                value={supplier}
                onChange={event => set_supplier(event.target.value)}
                type="text"
                placeholder="Voeg leverancier toe "
                required
              />
            </Form.Group>
            <Form.Group className="mt-5">
              <Button variant="primary" type="submit" onClick={submitForm}>
                Voeg lead toe
              </Button>
            </Form.Group>
        </Form>
    </Container>
    )
}
