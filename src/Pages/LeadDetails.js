import React, { useEffect }from 'react'
import { useParams, useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads, fetchUsers } from '../store/appFeed/actions'
import { selectLeadById} from '../store/appFeed/selectors'
import { selectToken } from "../store/user/selectors";
import { Box, Grid, Typography, Card } from'@material-ui/core'
import LeadCard from '../Components/LeadCard'
import ReportCard from '../Components/ReportCard'
import AddReportForm from '../Components/AddReportForm'
import PhaseCard from '../Components/PhaseCard'
import PlanActionForm from '../Components/PlanActionForm'
import MyTimeline from '../Components/Timeline/MyTimeline'
import ContactCard from '../Components/ContactCard';
import LeafletMap from '../Components/LeafletMap';
import { setMessage } from '../store/appState/actions';

export default function LeadDetails() {
    const dispatch = useDispatch()
    const params = useParams()   
    const leadId = parseInt(params.id)
    const lead = useSelector(selectLeadById(leadId))
    const reports = {...lead}.reports || []
    const contact = {...lead}.contact
    const token = useSelector(selectToken)
    const history = useHistory();

    if(!token) {
        history.push("/login")
    }

    useEffect(() =>  {
        if(!lead) {
            dispatch(fetchLeads)
        } 
        dispatch(fetchUsers)
    }, [dispatch, lead])

    if(!lead) {
        setMessage("succes", true, "Pagina opnieuw laden")
        return <></>
    }
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
                    justify="space-between"
                >                                    
                    <Grid item xs={4}>
                        <Box m={3}>
                            <Box >
                                <Typography variant="h5">Details</Typography>
                            </Box>
                            <Box mt={3}>
                                <LeadCard
                                    userId={lead.userId}
                                    address={lead.company_address}
                                    phone={lead.company_phone}
                                    email={lead.company_email}
                                    supplier={lead.supplier}
                                    createdAt={lead.createdAt}/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={3}> 
                        <Box m={3}>
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
                    <Grid item xs={4}>
                        {contact ? 
                        <Box m={3}>
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
                        : <Box mt={4}>
                            <Typography>Voeg contact toe</Typography>
                        </Box>}     
                    </Grid>                                 
                </Grid>
            </Box>
            <Box>
                <Grid 
                container
                direction="row"
                justify="flex-start">
                    <Grid xs={3} item>
                        <Box ml={3}>
                            <Grid 
                                container           
                                direction="column"
                                justify="flex-start">                                                         
                                <Grid item>
                                    <Box mt={3}>
                                        <Typography variant="h5">Notities</Typography>
                                    </Box>
                                    <Box mt={3}>
                                        <AddReportForm leadId={leadId}/>
                                    </Box>
                                    {reports.map(report => {
                                        return <Box key={report.id}
                                                    mt={3}>
                                                <ReportCard
                                                    key={report.id}
                                                    userId={report.userId}
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
            <Box mt={4} w={1} h={"500px"}>
                <Box mt={4} >
                    <Typography variant="h5">Kaart</Typography>
                </Box>
                <Box mt={3}>
                    <Card style={{width: "1000px", height: "500px"}}>
                        <LeafletMap id={lead.id}
                                    lat={lead.lat}
                                    lng={lead.lng}/>
                    </Card>
                </Box>
            </Box>
        </Box>

    
    )
}  


