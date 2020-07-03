import React, {useEffect} from 'react'
import { fetchLeads } from '../store/appFeed/actions'
import { selectLeads, selectAppFeedState} from "../store/appFeed/selectors"
import { useSelector, useDispatch } from "react-redux";
import LeadCard from '../Components/LeadCard'
import { Container, Col, Row } from 'react-bootstrap'
import { MyMapComponent } from '../Components/Map'

const markers = [
    {
        latitude: 52.011112,
        longitude: 4.711111
    },
    {
        latitude: 53.331028, 
        longitude: 6.924460
    },
    {
        latitude: 50.851368, 
        longitude: 5.690973
    },
    {
        latitude: 52.518536, 
        longitude: 5.471422
    },
    {
        latitude: 52.371807, 
        longitude: 4.896029
    }
]

export default function Homepage() {
    const dispatch = useDispatch()
    const leads = useSelector(selectLeads)
    const loading = useSelector(selectAppFeedState)
    
    useEffect(() => {
        dispatch(fetchLeads);
    }, [dispatch]);


    return (
        <Container fluid>
            <Row>
                <Col sm={4} >
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
                <Col sm={8}>
                    <MyMapComponent markers={markers}/>
                </Col>
            </Row>
        </Container>
        
            
            
        
    )
}
