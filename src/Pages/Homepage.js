import React, {useEffect} from 'react'
import { fetchLeads } from '../store/appFeed/actions'
import { selectLeads, selectAppFeedState} from "../store/appFeed/selectors"
import { useSelector, useDispatch } from "react-redux";


export default function Homepage() {
    const dispatch = useDispatch()
    const leads = useSelector(selectLeads)
    const loading = useSelector(selectAppFeedState)
    
    useEffect(() => {
        dispatch(fetchLeads);
    }, [dispatch]);

    return (
        <div>
            
        </div>
    )
}
