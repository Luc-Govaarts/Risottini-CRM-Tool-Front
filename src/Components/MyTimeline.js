import React from 'react'
import { useSelector } from 'react-redux'
import { selectLeadById } from '../store/appFeed/selectors'
import { Timeline, TimelineItem, 
    TimelineSeperator, TimelineDot,
    TimelineContent, TimelineConnector } from '@material-ui/lab'
import { Paper, Typography, Box} from '@material-ui/core'



export default function MyTimeline(props) {
    const leadId = props.leadId
    const lead = useSelector(selectLeadById(leadId))
    
    return (
        <Box>
            <Timeline align="alternate">
                <h3>Hallo</h3>
            </Timeline>
        </Box>
    )
}
