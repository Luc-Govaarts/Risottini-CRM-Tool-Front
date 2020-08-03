import React from 'react'
import { Grid, Card, Button, Box,
    Typography, CardContent } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { changePhaseTo } from '../store/appFeed/actions'
import { selectLeadById } from '../store/appFeed/selectors'

export default function PhaseCard(props) {
    const dispatch = useDispatch()
    const leadId = props.leadId
    const lead = useSelector(selectLeadById(leadId))
    const phase_id = lead.salesCyclePhaseId
    
    const handleReset = () => {
        dispatch(changePhaseTo(1, leadId))
    } 

    const handlePlus = () => {
        dispatch(changePhaseTo(phase_id + 1, leadId))
    }
    
    const handleMin = () => {
        dispatch(changePhaseTo(phase_id - 1, leadId))
    }
    if (phase_id === 5) {
        return (
            <Card>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center">
                    <Grid item>
                        <CardContent>
                            <Typography variant="h5"><strong>{props.phase}</strong></Typography>
                        </CardContent>
                    </Grid>
                    <Grid item>
                        <Box m={1}> 
                            <Button 
                                size="small"
                                variant="contained" 
                                color="primary"
                                onClick={handleReset}>Reset
                            </Button>
                        </Box>
                    </Grid>
                    
                </Grid>
            </Card>
        )
    } else if (phase_id === 1) {
        return (
            <Card>
                <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center">
                    <Grid item>
                        <CardContent>
                            <Typography variant="h5"><strong>{props.phase}</strong></Typography>
                        </CardContent>
                    </Grid>
                    <Grid item>
                        <Box m={1}> 
                            <Button
                                size="small"
                                variant="contained" 
                                color="primary"
                                onClick={handlePlus}>+
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        )
    } else {
        return (
            <Card>
                <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center">
                    <Grid item>
                        <CardContent>
                            <Typography variant="h5"><strong>{props.phase}</strong></Typography>
                        </CardContent>
                    </Grid>
                    <Grid item>
                        <Box m={1}>
                            <Box display="inline" m={1}> 
                                <Button 
                                    size="small"
                                    variant="contained" 
                                    color="primary"
                                    onClick={handleMin}>-
                                </Button>
                            </Box>
                            <Box display="inline" m={1}> 
                                <Button 
                                    size="small"
                                    variant="contained" 
                                    color="primary"
                                    onClick={handlePlus}>+
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        )
    }}
