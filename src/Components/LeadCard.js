import React from 'react'
import { Card, CardHeader, Typography, CardContent, Chip, Box
 } from '@material-ui/core'


export default function LeadCard(props) {
    return (
        <Card>
            <CardHeader
            title="Details"/>
            <CardContent>
            <Typography variant="h6" 
                        component="p"><strong>Address: </strong>{props.address}</Typography>
            <Typography variant="h6" 
                        component="p"><strong>Telefoon: </strong> {props.phone}</Typography>
            <Typography variant="h6" 
                        component="p"><strong>Email: </strong>{props.email}</Typography>
            <Typography variant="h6" 
                        component="p"><strong>Leverancier: </strong>{props.supplier}</Typography>
            <Box textAlign='right'><Typography variant="captiontext"><em>Gecreëerd:</em> {props.createdAt}</Typography></Box>
            </CardContent>
        </Card>
    )
}