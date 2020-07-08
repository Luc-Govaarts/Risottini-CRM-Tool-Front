import React, {useEffect} from 'react'
import { fetchLeads } from '../store/appFeed/actions'
import { selectLeads, selectAppFeedState} from "../store/appFeed/selectors"
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper, Box, Typography} from '@material-ui/core'
import SmallLeadCard from '../Components/SmallLeadCard'


export default function Homepage() {
    const dispatch = useDispatch()
    const leads = useSelector(selectLeads)

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

    return <>
        <Box mt={15}>
           <Grid 
                container
                direction="row"
                justify="center"
                alignItems="flex-start">
                <Grid item>
                    <Box m={3}>
                    <Box m={3}>
                        <Typography variant="h3"> Nieuwe Leads</Typography>
                    </Box>
                    <Paper>
                        {leads_cold.map(lead => {
                            return <SmallLeadCard
                                        key={lead.id}
                                        leadId={lead.id}
                                        lead={lead.company_name}
                                        partner={lead.associated_company_name}/>})}
                    </Paper>
                    </Box>
                </Grid>
                <Grid item>
                    <Box m={3}>
                    <Box m={3}>
                        <Typography variant="h3"> Contact Gemaakt </Typography>
                    </Box>
                    <Paper>
                        {leads_made_contact.map(lead => {
                            return <SmallLeadCard
                                        key={lead.id}
                                        leadId={lead.id}
                                        lead={lead.company_name}
                                        partner={lead.associated_company_name}/>})}
                    </Paper>
                    </Box>
                </Grid>
                <Grid item>
                    <Box m={3}> 
                    <Box m={3}>
                        <Typography variant="h3"> Ballen Proeven </Typography>
                    </Box>
                    <Paper>
                        {leads_tasting.map(lead => {
                            return <SmallLeadCard
                                        key={lead.id}
                                        leadId={lead.id}
                                        lead={lead.company_name}
                                        partner={lead.associated_company_name}/>})}
                    </Paper>
                    </Box>
                </Grid>
                <Grid item>
                    <Box m={3}>
                    <Box m={3}>
                        <Typography variant="h3"> Gesloten Deals </Typography>
                    </Box>
                    <Paper>
                        {leads_deal_closed.map(lead => {
                            return <SmallLeadCard
                                        key={lead.id}
                                        leadId={lead.id}
                                        lead={lead.company_name}
                                        partner={lead.associated_company_name}/>})}
                    </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </>
}
