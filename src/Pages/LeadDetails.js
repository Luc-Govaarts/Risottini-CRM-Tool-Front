import React, { useEffect }from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads } from '../store/appFeed/actions'
import { selectLeadById} from '../store/appFeed/selectors'
import { Box, Grid, Typography } from'@material-ui/core'
import LeadCard from '../Components/LeadCard'
import ReportCard from '../Components/ReportCard'
import AddReportForm from '../Components/AddReportForm'
import PhaseStepper from '../Components/PhaseStepper'

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
    }, [dispatch])

    if (!lead) {
        return "LOADING"
    } else {
        return (
            <Box spacing={3} mt={15} ml={3}>
                <Typography variant="h1">Lead</Typography>
                <Grid 
                container
                direction="row"
                justify="space-around"
                alignItems="center">
                <Grid xs={5} item>
                        <LeadCard
                            lead={lead.company_name}
                            partner={lead.associated_company_name}
                            phase={lead.salesCyclePhase.name}
                            address={lead.company_address}
                            phone={lead.company_phone}
                            email={lead.company_email}
                            supplier={lead.supplier}
                            createdAt={lead.createdAt}/>
                </Grid>
                <Grid xs={5} item>
                        <PhaseStepper/>
                </Grid>
                </Grid>
                <Grid 
                container
                direction="row"
                justify="flex-start"
                alignItems="center">
                    <Box mt={4}>
                        <Typography variant="h3">Notities</Typography>
                    <Grid xs={6} item>
                        <Box mt={4}>
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
                    </Box>
                </Grid>
            </Box>
        )
    }  
}
