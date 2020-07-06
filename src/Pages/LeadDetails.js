import React, { useEffect }from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads, fetchUserById } from '../store/appFeed/actions'
import { selectLeadById} from '../store/appFeed/selectors'
import { Box, Grid } from'@material-ui/core'
import LeadCard from '../Components/LeadCard'
import ReportCard from '../Components/ReportCard'

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
            <Box mt={15}>
                <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center">
                    <Grid item>
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
                    <Grid item>
                        {reports.map(report => {
                            
                            return <ReportCard
                                        key={report.id}
                                        lead={lead.company_name}
                                        note={report.note}
                                        createdAt={report.createdAt}/>})}

                    </Grid>
                </Grid>
            </Box>
        )
    }  
}
