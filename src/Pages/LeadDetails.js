import React, { useEffect }from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads } from '../store/appFeed/actions'
import { selectLeadById} from '../store/appFeed/selectors'
import { Box, Grid, Typography, Card } from'@material-ui/core'
import LeadCard from '../Components/LeadCard'
import ReportCard from '../Components/ReportCard'
import AddReportForm from '../Components/AddReportForm'
import PhaseCard from '../Components/PhaseCard'
import PlanActionForm from '../Components/PlanActionForm'
import MyTimeline from '../Components/Timeline/MyTimeline'
import ContactCard from '../Components/ContactCard';

export default function LeadDetails() {
    const dispatch = useDispatch()
    const params = useParams()   
    const leadId = parseInt(params.id)
    const lead = useSelector(selectLeadById(leadId))
    const reports = {...lead}.reports || []
    const contact = {...lead}.contact

    useEffect(() =>  {
        if(!lead) {
            dispatch(fetchLeads)
        }
    }, [dispatch])

    if (!lead) {
        return "LOADING"
    } else {
        return (
            <Box mt={15}>
                <Box ml={15}>
                    <Typography variant="h3">{lead.company_name}</Typography>
                    <Typography variant="h4">{lead.associated_company_name}</Typography>
                </Box>
                <Box ml={3}>
                    <Grid 
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="start">
                            <Grid xs={5} item> 
                                <Box mr={12}> 
                                    <Grid
                                    container           
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="start"
                                    flex-wrap="wrap">                                         
                                        <Grid item>
                                            <Box mt={4}>
                                                <Typography variant="h5">Details</Typography>
                                            </Box>
                                            <Box mt={3} >
                                                <LeadCard
                                                    address={lead.company_address}
                                                    phone={lead.company_phone}
                                                    email={lead.company_email}
                                                    supplier={lead.supplier}
                                                    createdAt={lead.createdAt}/>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box mt={4} >
                                                <Box>
                                                    <Typography variant="h5">Contact</Typography>
                                                </Box>
                                                <Box mt={3}>
                                                    <ContactCard
                                                        key={contact.id}
                                                        name={contact.name}
                                                        email={contact.email}
                                                        phone={contact.phone}
                                                        createdAt={contact.createdAt}/>
                                                </Box>
                                            </Box>
                                        </Grid>                                 
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid xs={7} item>
                                <Box mt={4}>
                                    <Box mt={4} >
                                        <Typography variant="h5">Kaart</Typography>
                                    </Box>
                                    <Box mt={3}>
                                        <Card style={{width: "1000px", height: "500px"}}>
                                        </Card>
                                    </Box>
                                </Box>
                            </Grid>    
                    </Grid>
                </Box>
                <Box>
                    <Grid 
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="start">
                        <Grid xs={3} item>
                            <Box ml={3}>
                                <Grid 
                                    container           
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="start">                                                         
                                    <Grid item> 
                                        <Box mt={3}>
                                            <Box>
                                                <Typography variant="h5">Verkoop fase</Typography>
                                            </Box>
                                            <Box mt={3}>
                                                <PhaseCard 
                                                    phase={lead.salesCyclePhase.name}
                                                    phase_id={lead.salesCyclePhaseId}
                                                    leadId={leadId}/>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box mt={3}>
                                            <Typography variant="h5">Notities</Typography>
                                        </Box>
                                        <Box mt={3}>
                                            <AddReportForm leadId={leadId}/>
                                        </Box>
                                        {reports.map(report => {
                                            return <Box mt={3}>
                                                    <ReportCard
                                                        key={report.id}
                                                        lead={lead.company_name}
                                                        note={report.note}
                                                        createdAt={report.createdAt}/></Box>})}
                                    </Grid>
                                </Grid>
                            </Box> 
                        </Grid>
                        <Grid xs={5} item>
                            <Box ml={4} mt={3}>
                                <Box ml={3}>
                                    <Typography variant="h5">Tijdlijn</Typography>
                                </Box>
                                <Box>
                                    <MyTimeline leadId={leadId}/>
                                </Box>
                            </Box>        
                        </Grid>
                        <Grid xs={3} item>
                            <Box ml={5}> 
                                <Box ml={3} mt={4}>
                                    <Typography variant="h5">Acties</Typography>
                                </Box>
                                <Box mt={3}>
                                    <PlanActionForm leadId={leadId}/>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        )
    }  
}
