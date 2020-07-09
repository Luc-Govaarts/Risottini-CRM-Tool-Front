import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/appFeed/selectors'
import { fetchUsers } from '../store/appFeed/actions'
import { Card, CardHeader,
    CardContent, Typography,
    Box } from '@material-ui/core'
import moment from 'moment';

export default function ReportCard(props) {
    const user = useSelector(selectUser(props.userId))
    const name = user.name

    return (
        <Card>
            <CardHeader title={name}/>
            <CardContent>
                <Typography variant="body1"><strong>Notitie: </strong> {props.note}</Typography>
                <Box textAlign='right'>
                    <Typography variant="caption"><em>Gecreëerd:</em> {moment(props.createdAt).format("DD MMM YYYY, hh:mm a")}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
