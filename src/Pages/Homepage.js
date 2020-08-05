import React, {useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { fetchLeads, fetchUsers } from '../store/appFeed/actions'
import { selectLeads } from "../store/appFeed/selectors"
import { selectToken } from "../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper, Box, Typography} from '@material-ui/core'
import SmallLeadCard from '../Components/SmallLeadCard'
import HomePageMap from '../Components/HomePageMap'
import LeadsTable from '../Components/LeadsTable'




export default function Homepage() {
    const dispatch = useDispatch()
    const leads = useSelector(selectLeads)
    const token = useSelector(selectToken)
    const history = useHistory();

    if(!token) {
        history.push("/login")
    }
    
    useEffect(() => {
        dispatch(fetchLeads)
        dispatch(fetchUsers);
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
        <Box my={12} mx={5}>
            <LeadsTable leads={leads}/>
        </Box>
        <Box mt={8} width={1} height="550px">
            <HomePageMap leads={leads}/>
        </Box>
        <Box mt={4}>
           <Grid 
                container
                direction="row"
                justify="center"
                alignItems="flex-start">
                <Grid xs={3} item>
                    <Box m={3}>
                        <Box m={3}>
                            <Typography variant="h5"> Nieuwe Leads</Typography>
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
                <Grid xs={3} item>
                    <Box m={3}>
                        <Box m={3}>
                            <Typography variant="h5"> Contact Gemaakt </Typography>
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
                <Grid xs={3} item>
                    <Box m={3}> 
                        <Box m={3}>
                            <Typography variant="h5"> Ballen Proeven </Typography>
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
                <Grid xs={3} item>
                    <Box m={3}>
                        <Box m={3}>
                            <Typography variant="h5"> Gesloten Deals </Typography>
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
