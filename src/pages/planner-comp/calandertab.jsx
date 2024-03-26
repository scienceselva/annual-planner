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
import { Card, Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Daycard from './day-card';


const monthevent = [
    {
        "date": "2024-02-26",
        "type": "Holiday",
        "description": "Republic Day",
        "start_time": "00:00",
        "end_time": "23:59"
    },
    {
        "date": "2024-02-26",
        "type": "Event",
        "description": "School Science Fair",
        "start_time": "09:00",
        "end_time": "16:00"
    },
    {
        "date": "2024-02-29",
        "type": "Working",
        "description": "Regular School Day",
        "start_time": "08:00",
        "end_time": "15:00"
    },
    {
        "date": "2024-02-02",
        "type": "Working",
        "description": "Regular School Day",
        "start_time": "08:00",
        "end_time": "15:00"
    },
    {
        "date": "2024-02-04",
        "type": "Working",
        "description": "Regular School Day",
        "start_time": "08:00",
        "end_time": "15:00"
    },
    {
        "date": "2024-04-06",
        "type": "Sports Event",
        "description": "Inter-school Football Match",
        "start_time": "14:00",
        "end_time": "17:00"
    },
    {
        "date": "2024-04-08",
        "type": "Working",
        "description": "Regular School Day",
        "start_time": "08:00",
        "end_time": "15:00"
    },
    {
        "date": "2024-04-10",
        "type": "Working",
        "description": "Regular School Day",
        "start_time": "08:00",
        "end_time": "15:00"
    },
    {
        "date": "2024-04-12",
        "type": "Working",
        "description": "Regular School Day",
        "start_time": "08:00",
        "end_time": "15:00"
    },
    {
        "date": "2024-04-14",
        "type": "Working",
        "description": "Regular School Day",
        "start_time": "08:00",
        "end_time": "15:00"
    },
    {
        "date": "2024-04-16",
        "type": "Working",
        "description": "Regular School Day",
        "start_time": "08:00",
        "end_time": "15:00"
    },
    {
        "date": "2024-04-18",
        "type": "Working",
        "description": "Regular School Day",
        "start_time": "08:00",
        "end_time": "15:00"
    },
    {
        "date": "2024-04-20",
        "type": "Working",
        "description": "Regular School Day",
        "start_time": "08:00",
        "end_time": "15:00"
    }
]


export default function Calandertab({ monthsh, yearsh }) {
    /**
    *  
    */
    const dayArr = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    let montharr = []
    let monthName = ''

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
     *   function to find record by date        ----------------------------------
     */


    const findRecordsByDate = (year, month, day) => {

        const formattedMonth = Number(month).toString().padStart(2, '0');
        const formattedDay = Number(day).toString().padStart(2, '0');
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
        return monthevent.filter(record => record.date === formattedDate)

    }

    calculateDays()


    return (

        <Card sx={{ padding: '15px' }}>
            <Typography variant='h5'>{monthName} , {yearsh}</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="schedulerCalander">
                    <TableHead>
                        <TableRow>
                            {dayArr.map(dayVal => (
                                <TableCell
                                    align="center"
                                    sx={{ border: '10px solid #F2F4F3', backgroundColor: '#99DDFF' }}>
                                    {dayVal}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {montharr.map(monX => (
                            <TableRow key={monX} >
                                {monX.map(dayNum => (
                                    <TableCell sx={{ border: '10px solid #F2F4F3', backgroundColor: '#FFF', padding: '5px'}}>                                        
                                        {(dayNum === 0) ? '' : 
                                        <Daycard 
                                        dayX={dayNum} 
                                        eventArr={findRecordsByDate(yearsh, monthsh, dayNum)} 
                                        ssx={{ marginLeft: '0px', marginTop: '0px' }}
                                        />}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}
Calandertab.propTypes = {
    monthsh: PropTypes.any,
    yearsh: PropTypes.any
};