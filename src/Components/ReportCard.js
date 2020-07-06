import React from 'react'
import { Card, CardHeader, CardContent,Typography } from '@material-ui/core'

export default function ReportCard1(props) {

    return (
        <Card>
            <CardHeader
                title={props.lead}/>
            <CardContent>
                <Typography variant="body1"><strong>Notitie: </strong> {props.note}</Typography>
                <Typography textalign="right" variant="captiontext"><em>Gecreëerd: </em> {props.createdAt}</Typography>
            </CardContent>
        </Card>
    )
}
