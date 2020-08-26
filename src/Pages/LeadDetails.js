import React, { useEffect }from 'react'
import { useParams, useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads, fetchUsers } from '../store/appFeed/actions'
import { selectLeadById, selectUsers } from '../store/appFeed/selectors'
import { selectToken } from "../store/user/selectors";
import { Box, Grid, Typography } from'@material-ui/core'
import LeadCard from '../Components/LeadCard'
import AddReportForm from '../Components/AddReportForm'
import PhaseCard from '../Components/PhaseCard'
import PlanActionForm from '../Components/PlanActionForm'
import MyTimeline from '../Components/Timeline/MyTimeline'
import LeadContactCard from '../Components/LeadContactCard';
import LeafletMap from '../Components/LeafletMap';
import ConnectContactCard from '../Components/ConnectContactCard';


export default function LeadDetails() {
    const dispatch = useDispatch()
    const params = useParams()   
    const leadId = parseInt(params.id)
    const lead = useSelector(selectLeadById(leadId))
    const users = useSelector(selectUsers)
    const contact = {...lead}.contact
    const token = useSelector(selectToken)
    const history = useHistory();

    if(!token) {
        history.push("/login")
    }

    useEffect(() =>  {
        if(!lead) {
            dispatch(fetchLeads)
        } else if (!users.length)
        dispatch(fetchUsers)
    }, [dispatch, lead])

    if(!lead || !users.length) {
        return <></>
    }
    return (
        <Box mt={15}>
            <Grid 
                container
                direction="row"
                justify="flex-start">
                <Grid item xs={4}>
                    <Grid 
                        container
                        direction="column"
                        justify="flex-start">                                 
                        <Grid item>
                            <Box ml={3} mt={2}>
                                <Box >
                                    <Typography variant="h5">Details</Typography>
                                </Box>
                                <Box mt={1}>
                                    <LeadCard
                                        userId={lead.userId}
                                        leadId={lead.id}
                                        lead={lead.company_name}
                                        associated_company_name={lead.associated_company_name}
                                        address={lead.company_address}
                                        phone={lead.company_phone}
                                        email={lead.company_email}
                                        supplier={lead.supplier}
                                        createdAt={lead.createdAt}/>
                                </Box>
                            </Box>
                        </Grid>  
                        <Grid item>
                            {contact ? 
                            <Box ml={3} mt={2}>
                                <Box>
                                    <Typography variant="h5">Contact</Typography>
                                </Box>
                                <Box mt={1}>
                                    <LeadContactCard
                                        key={contact.id}
                                        leadId={leadId}
                                        name={contact.name}
                                        job_title={contact.job_title}
                                        email={contact.email}
                                        phone={contact.phone}
                                        createdAt={contact.createdAt}
                                        updatedAt={contact.updatedAt}/>
                                </Box> 
                            </Box>
                            :   <Box mt={1}>
                                    <ConnectContactCard leadId={leadId}/>
                                </Box>}     
                        </Grid>                               
                    </Grid>
                </Grid>
                <Grid item xs ={8}>
                    <Box>
                        <Box ml={3} mt={2}>
                            <Typography variant="h5">Kaart</Typography>
                        </Box>
                        <Box ml={3} mt={1} mr={3} height={"450px"}>
                                <LeafletMap id={lead.id}
                                            lat={lead.lat}
                                            lng={lead.lng}/>
                        </Box>
                    </Box>
                </Grid>                
            </Grid>
            <Box>
                <Grid 
                container
                direction="row"
                justify="flex-start">
                    <Grid item xs={3}>
                        <Box m={3}>
                            <Box mt={3}>
                                <Typography variant="h5">Notities</Typography>
                            </Box>
                            <Box mt={3}>
                                <AddReportForm leadId={leadId}/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start">
                            <Grid item> 
                                <Box ml={3} mt={3}>
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
                                    <Box ml={3}>
                                        <Typography variant="h5">Tijdlijn</Typography>
                                    </Box>
                                    <Box>
                                        <MyTimeline leadId={leadId}/>
                                    </Box>
                                </Box>   
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Box m={3}> 
                            <Box ml={3} mt={3}>
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
