import React, { useEffect }from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads, fetchReportsById, fetchActionsById } from '../store/appFeed/actions'
import { selectLeadById} from '../store/appFeed/selectors'
import { Box, Grid, Typography } from'@material-ui/core'
import LeadCard from '../Components/LeadCard'
import ReportCard from '../Components/ReportCard'
import AddReportForm from '../Components/AddReportForm'
import PhaseCard from '../Components/PhaseCard'
import PlanActionForm from '../Components/PlanActionForm'
import MyTimeline from '../Components/MyTimeline'

export default function LeadDetails() {
    const dispatch = useDispatch()
    const params = useParams()   
    const leadId = parseInt(params.id)
    const lead = useSelector(selectLeadById(leadId))
    const reports = {...lead}.reports || []

    useEffect(() =>  {
        if(!lead) {
            dispatch(fetchLeads)
        } 
        dispatch(fetchReportsById(leadId))
        dispatch(fetchActionsById(leadId))
    }, [dispatch])

    console.log("LEAD:", lead)

    if (!lead) {
        return "LOADING"
    } else {
        return (
            <Box spacing={3} mt={15} ml={3}>
                <Typography variant="h1">{lead.company_name}</Typography>
                <Typography variant="h3">{lead.associated_company_name}</Typography>
                <Grid 
                container
                direction="row"
                justify="flex-start"
                alignItems="center">
                    <Grid xs={5} item>
                            <LeadCard
                                address={lead.company_address}
                                phone={lead.company_phone}
                                email={lead.company_email}
                                supplier={lead.supplier}
                                createdAt={lead.createdAt}/>
                    </Grid>
                    <Grid xs={5} item> 
                            <Box mt={3}>
                                <Typography variant="h4">Verkoop fase</Typography>
                            </Box>
                            <Box ml={3} mt={3}>
                                <PhaseCard 
                                    phase={lead.salesCyclePhase.name}
                                    phase_id={lead.salesCyclePhaseId}
                                    leadId={leadId}/>
                            </Box>
                    </Grid>
                </Grid>
                <Grid 
                container
                direction="row"
                justify="space-evenly"
                alignItems="start">
                    <Grid xs={4} item>
                        <Box mt={2} style={{width: "350px"}}>
                            <Typography variant="h4">Notities</Typography>
                        </Box>
                        <Box mt={3} style={{width: "350px"}}>
                            <AddReportForm leadId={leadId}/>
                        </Box>
                        {reports.map(report => {
                            return <Box mt={3} ml={3} style={{width: "350px"}}>
                                    <ReportCard
                                        key={report.id}
                                        lead={lead.company_name}
                                        note={report.note}
                                        createdAt={report.createdAt}/></Box>})}
                    </Grid>
                    <Grid xs={4} item>
                        <Box mt={3} style={{width: "350px"}}>
                            <Typography variant="h4">Tijdlijn</Typography>
                            <MyTimeline/>
                        </Box>        
                    </Grid>
                    <Grid xs={4} item>
                        <Box mt={3} style={{width: "350px"}}>
                            <PlanActionForm leadId={leadId}/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    }  
}
