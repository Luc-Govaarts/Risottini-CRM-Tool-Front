import React, { useState } from 'react'
import { Card, Button, Box,
    Typography, CardContent
 } from '@material-ui/core'
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
            <Card style={{minWidth: "500px"}}>
                <CardContent>
                    <Typography variant="h4">{props.phase}</Typography>
                </CardContent>
                <Box m={3}> 
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleReset}>Reset</Button></Box>
            </Card>
        )
    } else if (phase_id === 1) {
        return (
            <Card style={{minWidth: "500px"}}>
                <CardContent>
                    <Typography variant="h4">{props.phase}</Typography>
                    <Box m={3}> 
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={handlePlus}>+</Button></Box>
                </CardContent>
            </Card>
        )
    } else {
        return (
            <Card style={{minWidth: "500px"}}>
                <CardContent>
                    <Typography variant="h4">{props.phase}</Typography>
                    <Box display="inline" m={3}> 
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={handleMin}>-</Button></Box>
                    <Box display="inline" m={3}> 
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={handlePlus}>+</Button></Box>
                </CardContent>
            </Card>
        )
    }}
