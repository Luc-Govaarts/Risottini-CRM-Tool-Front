import React from 'react'
import { Card,
    CardContent, Typography,
    Box } from '@material-ui/core'
import moment from 'moment';

export default function ReportCard(props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="body1"><strong>Notitie: </strong> {props.note}</Typography>
                <Box textAlign='right'>
                    <Typography textAlign='right' variant="captiontext"><em>Gecreëerd:</em> {moment(props.createdAt).format("DD MMM YYYY, hh:mm a")}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
