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
        <Box mt={12} mx={25} height="450px">
            <HomePageMap leads={leads}/>
        </Box>
        <Box mx={25}>
            <LeadsTable leads={leads}/>
        </Box>
    </>
}
