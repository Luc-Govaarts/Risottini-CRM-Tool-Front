import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchLeads } from '../store/appFeed/actions'
import { selectLeads } from "../store/appFeed/selectors"
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableRow, 
        TableContainer, TableHead, TablePagination } from '@material-ui/core'
import moment from 'moment';

const columns = [
  { id: 'company_name', label: 'Lead', minWidth: 100 },
  { id: 'salesCyclePhase', label: 'Verkoop fase', minWidth: 100},
  { id: 'company_phone', label: 'Telefoon', minWidth: 100 },
  { id: 'company_email', label: 'Email', minWidth: 100 },
  { id: 'supplier', label: 'Leverancier', minWidth: 100 },
  { id: 'createdAt', label: 'Gecreëerd op', minWidth: 100 },
  { id: 'updatedAt', label: 'Aangepast op', minWidth: 100 }
];

const createRow = (lead) => {
    const company_name = lead.company_name
    const salesCyclePhase = lead.salesCyclePhase.name
    const company_phone = lead.company_phone
    const company_email = lead.company_email
    const supplier = lead.supplier
    const createdAt = moment(lead.createdAt).format("DD MMM YYYY")
    const updatedAt = moment(lead.updatedAt).format("DD MMM YYYY")

    return { company_name, salesCyclePhase, company_phone, company_email, supplier, createdAt, updatedAt }
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    });

export default function StickyHeadTable(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const leads = useSelector(selectLeads)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    useEffect(() => {
        dispatch(fetchLeads)
    }, [dispatch]);

    const rows = leads.map(lead => createRow(lead))

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if(!leads){
        return null
    } else {
        return (         
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table>
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id}>
                                {value}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        )
    }
}