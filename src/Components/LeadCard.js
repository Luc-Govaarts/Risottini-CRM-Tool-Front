import React from 'react'
import { Card, CardHeader, Typography, CardContent, Chip, Box
 } from '@material-ui/core'


export default function LeadCard1(props) {
    return (
        <Card>
            <CardHeader
                title={props.lead}
                subtitle={props.partner}/>
            <CardContent>
            <Typography variant="body1" 
                        component="p"><strong>Address: </strong>{props.address}</Typography>
            <Typography variant="body1" 
                        component="p"><strong>Telefoon: </strong> {props.phone}</Typography>
            <Typography variant="body1" 
                        component="p"><strong>Email: </strong>{props.email}</Typography>
            <Typography variant="body1" 
                        component="p"><strong>Leverancier: </strong>{props.supplier}</Typography>
            <Box textAlign='right'><Typography variant="captiontext"><em>Gecreëerd:</em> {props.createdAt}</Typography></Box>
            </CardContent>
        </Card>
    )
}