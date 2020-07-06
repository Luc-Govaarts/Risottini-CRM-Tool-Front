import React, { useEffect }from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads } from '../store/appFeed/actions'
import { selectLeadById} from '../store/appFeed/selectors'
import { Box, Grid } from'@material-ui/core'
import LeadCard1 from '../Components/LeadCard'

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

    console.log("LEAD:", lead)

    if (!lead) {
        return "LOADING"
    } else {
        return (
            <Box mt={15}>
                <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center">
                    <Grid item>
                        <LeadCard1
                            lead={lead.company_name}
                            partner={lead.associated_company_name}
                            phase={lead.salesCyclePhase.name}
                            address={lead.company_address}
                            phone={lead.company_phone}
                            email={lead.company_email}
                            supplier={lead.supplier}
                            createdAt={lead.createdAt}/>
                    </Grid>
                </Grid>
            </Box>
        )
    }  
}
