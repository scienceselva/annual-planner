import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { getallExpense, saveNewexp } from './expenses/dbutils'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Expenses() {
    const [expensearr, setexpensearr] = useState([]);
    
    const getExpense = async () => {
        const resp = await getallExpense()
        setexpensearr(resp)
        console.log(resp)

    }
    let datat = "?trandate=22-11-2024&trandesc=brought a TV&tranamt=12000"

    const addExp = async () =>{
        const respx = await saveNewexp(datat)
        console.log(respx)
    }
    const handleFormChangeDates = (valX) => {
        const givenDate = new Date(valX)
        const month1 = String(givenDate.getMonth() + 1).padStart(2, '0');
        const day1 = String(givenDate.getDate()).padStart(2, '0');
        const passedDate = givenDate.getFullYear() + "-" + month1 + "-" + day1
        return passedDate
    }

    return (
        <div>

            <Typography variant='h5'> Thiral Expenses </Typography>
            <Divider /><br/><br/>
            <TableContainer component={Paper}>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right"> Expense Description </TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expensearr.map((outerx, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell align="right">{outerx[0]}</TableCell>
                                <TableCell align="right">{outerx[1]}</TableCell>
                                <TableCell align="right">{outerx[2]}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/><br/>
            <Paper>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        onChange={(newValue) => handleFormChangeDates(newValue)}
                    />
                </LocalizationProvider>

                <TextField id="outlined-basic" label="Description" variant="outlined" />
                <TextField id="outlined-basic" label="Amount" variant="outlined" />
                <Button variant="contained" onClick={addExp}>Add</Button>
            </Paper>
            <Button variant="outlined" onClick={getExpense}>Get</Button>
        </div>
    )
}