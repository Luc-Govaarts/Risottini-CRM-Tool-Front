import React, { useEffect }from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads } from '../store/appFeed/actions'
import {selectLeadById} from '../store/appFeed/selectors'
import ReportCard from '../Components/ReportCard'

export default function LeadDetails() {
    const dispatch = useDispatch()
    const params = useParams()   
    const leadId = parseInt(params.id)
    const lead = useSelector(selectLeadById(leadId))
    const reports = {...lead}.reports || []
    
    console.log("leads:", lead)
    console.log("reports:" , reports)

    useEffect(() =>  {
        if(!lead) {
            dispatch(fetchLeads)
        }
    }, [dispatch])

    if (!lead) {
        return "LOADING"
    } else {
        return (<div>
            {reports.map(report => {
                return <ReportCard
                    key={report.id}
                    id={report.id}
                    lead={report.company_name}
                    user={report.userId}
                    date={report.createdAt}
                    note={report.note}
                />
            })}
        </div>
        )
    }  
}
