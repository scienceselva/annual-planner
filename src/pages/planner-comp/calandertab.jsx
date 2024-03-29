/**
 *  calander view of events ( Monthly)
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
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1
    const currentDay = currentDate.getDate()

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
        return monthevent.filter(record => record.dateFrom === fmtDt)
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
                                key={dayVal}
                                align="center"
                                style={{ borderLeft: '1px solid #c0c0c0', borderBottom: '1px solid #fff', backgroundColor: '#F7F7F7', color: 'primary.dark', borderRadius: '5px', padding: '0px' }}>
                                <Typography variant='body2' color={'primary.dark'}>{dayVal}</Typography>
                            </td>
                        ))}
                    </tr>
                    {montharr.map((monX, index) => (
                        <tr key={index}>
                            {monX.map((dayNum, index) => (
                                <td style={{ border: '1px solid #C0C0C0', backgroundColor: '#FFF', padding: '5px' }} key={index}>
                                    {(dayNum === 0) ? '' :
                                        <Daycard
                                            dayX={dayNum}
                                            eventArr={findRecordsByDate(yearsh, monthsh, dayNum)}
                                            handlePopupedit={(event) => handleEditform(yearsh, monthsh, dayNum)}
                                            sx={{ marginTop: '0px' }}
                                        />}
                                </td>

                            ))}

                        </tr>
                    ))}
                </table>

            </Box>

        </>
    )
}
Calandertab.propTypes = {
    monthsh: PropTypes.any,
    yearsh: PropTypes.any,
    monthevent: PropTypes.any
};