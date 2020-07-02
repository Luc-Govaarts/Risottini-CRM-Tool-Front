import React, {useEffect} from 'react'
import { fetchLeads } from '../store/appFeed/actions'
import { selectLeads, selectAppFeedState} from "../store/appFeed/selectors"
import { useSelector, useDispatch } from "react-redux";
import LeadCard from '../Components/LeadCard'
import { Container, Col } from 'react-bootstrap'

export default function Homepage() {
    const dispatch = useDispatch()
    const leads = useSelector(selectLeads)
    const loading = useSelector(selectAppFeedState)
    
    useEffect(() => {
        dispatch(fetchLeads);
    }, [dispatch]);


    return (
        <Container fluid>
            <Col xs={6} >
            {leads.map(lead => {
                return <LeadCard 
                            key={lead.id}
                            id={lead.id}
                            lead={lead.company_name}
                            partner={lead.associated_company_name}
                            address={lead.company_address}
                            phone={lead.company_phone}
                            email={lead.company_email}
                            supplier={lead.supplier}/>
            })}
            </Col>
            <Col>
                
            </Col>
        </Container>
        
            
            
        
    )
}
