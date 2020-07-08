import React, { useState, useEffect } from "react";
import { Box } from '@material-ui/core'
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { selectToken } from "../store/user/selectors";
import { selectContacts } from '../store/appFeed/selectors';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col } from "react-bootstrap";
import { addLead, fetchContacts } from "../store/appFeed/actions";
import { addContact } from '../store/appFeed/actions'
import SnackBar from "../Components/Timeline/SnackBar";

export default function AddProspect() {
    const [contact_name, set_contact_name] = useState("")
    const [contact_email, set_contact_email] = useState("")
    const [contact_phone, set_contact_phone] = useState("")
    const [company_name, set_company_name] = useState("")
    const [associated_company_name, set_associated_company_name] = useState("")
    const [company_phone, set_company_phone] = useState()
    const [company_address, set_company_address] = useState("")
    const [company_email, set_company_email] = useState("")
    const [supplier, set_supplier] = useState("")
    const [contactId, set_contactId] = useState()
    const [contact_toggle, set_contact_toggle] = useState(false)
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const history = useHistory();
    const contacts = useSelector(selectContacts)

    useEffect(() => {
        if (!token) {
          history.push("/");
        } 
        dispatch(fetchContacts)
      }, [token, history]);

    const submitLeadForm = () => {
        dispatch(addLead(
          company_name, 
          associated_company_name,
          company_phone, 
          company_address, 
          company_email, 
          supplier,
          contactId)) 

        set_associated_company_name("")
        set_company_phone()
        set_company_address("")
        set_company_email("")
        set_supplier("")
        set_contactId()
    }

    const submitContactForm = () => {
      dispatch(addContact(
          contact_name,
          contact_email,
          contact_phone))
      
      set_contact_name("")
      set_contact_email("")
      set_contact_phone("")  
      set_contact_toggle(false)   
  }

    if (contact_toggle) {
      return (
          <Container>
            <SnackBar/>
            <Box mt={15}>
              <Form as={Col} md={{ span: 6, offset: 3 }}>
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
              </Box>
          </Container>
      )
    } else {
    return (
    <Container>
      <SnackBar/>
      <Box mt={15}>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-3">
            <h1 className="mt-5 mb-3">Niewe lead</h1>

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
                type="text"
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
            <Form.Group className="mt-3">
              <Form.Label>Selecteer een contact persoon</Form.Label>
              <Form.Control 
                value={contactId}
                onChange={event => set_contactId(event.target.value)}
                as="select"
                placeholder="Voeg contact persoon toe"
                required>
                  {contacts.map(contact => {
                    return <option 
                      key={contact.id}
                      value={contact.id}>
                      {contact.name}
                      </option>
                  })}
                </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Of maak een nieuw contact</Form.Label>
            </Form.Group>
                <Button variant="primary"
                  value={true}
                  onClick={event => set_contact_toggle(event.target.value)}>Maak nieuw contact</Button>            
            <Form.Group className="mt-3">
              <Button variant="primary" type="submit" onClick={submitLeadForm}>
                Voeg lead toe
              </Button>
            </Form.Group>
        </Form>
      </Box>
    </Container>
    ) 
}}

