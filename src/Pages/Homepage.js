import React, {useEffect} from 'react'
import { fetchLeads } from '../store/appFeed/actions'
import { selectLeads, selectAppFeedState} from "../store/appFeed/selectors"
import { useSelector, useDispatch } from "react-redux";
import SmallLeadCard from '../Components/SmallLeadCard'
import { Container, Col, Row, Card } from 'react-bootstrap'
import { MyMapComponent } from '../Components/Map'

// const markers = [
//     {
//         latitude: 52.011112,
//         longitude: 4.711111
//     },
//     {
//         latitude: 53.331028, 
//         longitude: 6.924460
//     },
//     {
//         latitude: 50.851368, 
//         longitude: 5.690973
//     },
//     {
//         latitude: 52.518536, 
//         longitude: 5.471422
//     },
//     {
//         latitude: 52.371807, 
//         longitude: 4.896029
//     }
// ]

export default function Homepage() {
    const dispatch = useDispatch()
    const leads = useSelector(selectLeads)
    const loading = useSelector(selectAppFeedState)

    useEffect(() => {
        dispatch(fetchLeads);
    }, [dispatch]);

    const leads_cold = leads.filter(lead => {
        return lead.salesCyclePhase.id === 1
    })
    const leads_made_contact = leads.filter(lead => {
        return lead.salesCyclePhase.id === 2
    })
    const leads_tasting = leads.filter(lead => {
        return lead.salesCyclePhase.id === 3
    })
    const leads_deal_closed = leads.filter(lead => {
        return lead.salesCyclePhase.id === 4
    })
    const leads_rejected = leads.filter(lead => {
        return lead.salesCyclePhase.id === 5
    })

    return (
        <Container fluid>
            <Row>
                <Col sm={3}>
                    <Card className="mt-3">
                        <Card.Header>
                         <Card.Title>{"Lead in"}</Card.Title>
                        </Card.Header>
                        <Card.Body>    
                {leads_cold.map(lead => {
                    return <SmallLeadCard 
                                key={lead.id}
                                id={lead.id}
                                lead={lead.company_name}
                                contact={lead.contact.name}
                                phase={lead.salesCyclePhase.name}/>})}
                        </Card.Body>
                        </Card>
                </Col>
                <Col sm={3}>
                    <Card className="mt-3">
                        <Card.Header>
                         <Card.Title>{"Lead in"}</Card.Title>
                        </Card.Header>
                        <Card.Body> 
                {leads_made_contact.map(lead => {
                    return <SmallLeadCard 
                                key={lead.id}
                                id={lead.id}
                                lead={lead.company_name}
                                contact={lead.contact.name}
                                phase={lead.salesCyclePhase.name}/>})}
                        </Card.Body>
                        </Card>
                </Col>
                <Col sm={3}>
                    <Card className="mt-3">
                        <Card.Header>
                         <Card.Title>{"Lead in"}</Card.Title>
                        </Card.Header>
                        <Card.Body> 
                {leads_tasting.map(lead => {
                    return <SmallLeadCard 
                                key={lead.id}
                                id={lead.id}
                                lead={lead.company_name}
                                contact={lead.contact.name}
                                phase={lead.salesCyclePhase.name}/>})}
                        </Card.Body>
                        </Card>
                </Col>
                <Col sm={3}>
                    <Card className="mt-3">
                        <Card.Header>
                         <Card.Title>{"Lead in"}</Card.Title>
                        </Card.Header>
                        <Card.Body> 
                {leads_deal_closed.map(lead => {
                    return <SmallLeadCard 
                                key={lead.id}
                                id={lead.id}
                                lead={lead.company_name}
                                contact={lead.contact.name}
                                phase={lead.salesCyclePhase.name}/>})}
                        </Card.Body>
                        </Card>
                </Col>
                {/* <Col sm={3}>
                {leads_rejected.map(lead => {
                    return <SmallLeadCard 
                                key={lead.id}
                                id={lead.id}
                                lead={lead.company_name}
                                contact={lead.contact.name}
                                phase={lead.salesCyclePhase.name}/>})}
                </Col> */}
                
            </Row>
            <Row>
            {/* <Col sm={8}>
                    <MyMapComponent markers={markers}/>
                </Col> */}
            </Row>
        </Container>
        
            
            
        
    )
}
