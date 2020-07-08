import React from 'react'
import { Card, Typography, CardContent, Box} from '@material-ui/core'
import moment from 'moment';

export default function LeadCard(props) {
    return (
        <Card>
            <CardContent>
            <Typography variant="h6" 
                        component="p"><strong>Address: </strong>{props.address}</Typography>
            <Typography variant="h6" 
                        component="p"><strong>Telefoon: </strong> {props.phone}</Typography>
            <Typography variant="h6" 
                        component="p"><strong>Email: </strong>{props.email}</Typography>
            <Typography variant="h6" 
                        component="p"><strong>Leverancier: </strong>{props.supplier}</Typography>
            <Box textAlign='right'>
                <Typography variant="captiontext"><em>Gecreëerd:</em> {moment(props.createdAt).format("DD MMM YYYY")}</Typography>
            </Box>
            </CardContent>
        </Card>
    )
}