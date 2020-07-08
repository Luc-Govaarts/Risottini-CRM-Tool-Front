import React from 'react'
import { useSelector } from 'react-redux'
import { selectLeadById } from '../../store/appFeed/selectors'
import { Timeline } from '@material-ui/lab'
import { Box } from '@material-ui/core'
import ActionTimelineItem from './ActionTimelineItem'
import ReportTimelineItem from './ReportTimelineItem'
import Today from './Today'
import moment from 'moment';
 
function compareDates(a, b) {
    return new Date(a.due_date || a.createdAt) - new Date(b.due_date || b.createdAt)
}

export default function MyTimeline(props) {
    const leadId = props.leadId
    const lead = useSelector(selectLeadById(leadId))
    const reports = lead.reports
    const actions = lead.actions
    const today = {createdAt: moment()}
    const timelineObjects = reports.concat(actions).concat(today)
    const sortedTimelineObjects = [...timelineObjects].sort(compareDates)

    return (
        <Box>
            <Timeline align="alternate">
                {[...sortedTimelineObjects].map((timelineObject, index) => {
                    if(timelineObject.hasOwnProperty("note") === false) {
                        return <Today key={index}/>
                    } else if(timelineObject.hasOwnProperty("due_date")){
                        return <ActionTimelineItem
                                    key={index}
                                    event={timelineObject.action}
                                    note={timelineObject.note}
                                    due_date={timelineObject.due_date}/> 
                    } else {
                        return <ReportTimelineItem
                                    key={index}
                                    date={timelineObject.createdAt}
                                    note={timelineObject.note}/>
                    }
                })}
            </Timeline>
        </Box>
    )
}

