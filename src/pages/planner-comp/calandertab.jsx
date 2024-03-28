/**
 * pallet for calander
 *  
 * #383D3B
 * #EEE5E9
 * #7C7C7C
 * #69DDFF
 * #CEF7A0
 * #F2F4F3
 * 
 */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Daycard from './day-card';




export default function Calandertab({ monthsh, yearsh, monthevent }) {
    /**
    *     defaults or constants
    */
    const dayArr = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    let montharr = []
    let monthName = ''

    /**
    *  for pop up form event handling
    */
    const [openx, setOpenx] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClose = () => {
        setOpenx(false);
    }

    const [formData, setFormData] = useState({
        date: '',
        type: '',
        description: '',
        start_time: '',
        end_time: '',
    });

    const popupFormdata = {
        date: '',
        type: '',
        description: '',
        start_time: '',
        end_time: '',
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    /**
     * function to calcualte the calander days and format them
     */
    const calculateDays = () => {

        let finddate = monthsh + '-' + '01' + '-' + yearsh
        const d = new Date(finddate);
        monthName = d.toLocaleString('default', { month: 'long' });
        const day = d.getDay()
        let maxdays = new Date(yearsh, monthsh, 0).getDate();

        let temparr = []

        for (let j = 1; j < day; j += 1) {
            temparr.push(0)
        }

        for (let index = 1; index <= maxdays; index += 1) {

            if (temparr.length < 7) {
                temparr.push(index)
            } else {
                montharr.push(temparr)
                temparr = []
                temparr.push(index)
            }

        }
        if (temparr.length > 0) {
            for (let j = temparr.length; j < 7; j += 1) {
                temparr.push(0)
            }
            montharr.push(temparr)
        }

        //        console.log(montharr)
    }

    /**
     *   function to find record by date and formatter and event handlers        ----------------------------------
     */

    const dataFormatterYYYYMMDD = (year, month, day) => {
        const formattedMonth = Number(month).toString().padStart(2, '0')
        const formattedDay = Number(day).toString().padStart(2, '0')
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`
        return formattedDate
    }

    // find the records for given date 
    const findRecordsByDate = (year, month, day) => {
        const fmtDt = dataFormatterYYYYMMDD(year, month, day)
        return monthevent.filter(record => record.date === fmtDt)
    }

    const handleEditform = (year, month, day) => {
        const fmtDt = dataFormatterYYYYMMDD(year, month, day)
        popupFormdata.date = fmtDt
        setFormData(popupFormdata)
        setOpenx(true);
    }


    const handleUpdatedate = () => {
        monthevent.push(formData)
        //  data base update code here    ----------------------------------->>>>>>>>>   important     <<<<<<<<<<   -----
        setOpenx(false);
    }



    /**
     *    ---------------------------------------------
     */

    calculateDays()


    return (
        <>
            <Box sx={{ padding: '15px' }}>
                <table style={{ border: '1px solid #c0c0c0', borderCollapse: 'collapse', width: '100%', minHeight: '90vh' }}>
                    <tr>
                        {dayArr.map(dayVal => (
                            <td
                                align="center"
                                style={{ border: '1px solid #fff', backgroundColor: '#F7F7F7', color: 'primary.dark', borderRadius: '5px', padding: '0px' }}>
                                <Typography variant='body1'>{dayVal}</Typography>
                            </td>
                        ))}
                    </tr>
                    {montharr.map(monX => (
                        <tr>
                            {monX.map(dayNum => (
                                <td style={{ border: '1px solid #C0C0C0', backgroundColor: '#FFF', padding: '5px' }}>
                                    {(dayNum === 0) ? '' :
                                        <Daycard
                                            dayX={dayNum}
                                            eventArr={findRecordsByDate(yearsh, monthsh, dayNum)}
                                            handlePopupedit={(event) => handleEditform(yearsh, monthsh, dayNum)}
                                            sx={{ marginLeft: '0px', marginTop: '0px' }}
                                        />}
                                </td>
                            ))}
                        </tr>
                    ))}
                </table>

            </Box>


            <Dialog
                open={openx}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    <Typography color='primary' variant='h6'> Event Date : {formData.date}</Typography>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Start Time"
                                    type="time"
                                    name="start_time"
                                    value={formData.start_time}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="End Time"
                                    type="time"
                                    name="end_time"
                                    value={formData.end_time}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </Grid>
                        </Grid>



                        <Typography>Disabling Institution with date : </Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" onClick={handleUpdatedate}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
Calandertab.propTypes = {
    monthsh: PropTypes.any,
    yearsh: PropTypes.any,
    monthevent: PropTypes.any
};