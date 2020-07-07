import React from 'react'
import { Card, CardHeader, 
    CardContent, Typography,
    Box } from '@material-ui/core'

export default function ReportCard1(props) {

    return (
        <Card>
            <CardContent>
                <Typography variant="body1"><strong>Notitie: </strong> {props.note}</Typography>
                <Box textAlign='right'>
                    <Typography textAlign='right' variant="captiontext"><em>Gecreëerd:</em> {props.createdAt}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
