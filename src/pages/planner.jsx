import * as React from 'react';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Card, Container, Divider, Fab, Grid, Typography } from "@mui/material";
import { DateCalendar, DayCalendarSkeleton, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Calandertab from './planner-comp/calandertab';


// sample data from DB for each month
const montheventDB = [
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
export default function Planner() {

    const [dateSelect, setDateselect] = useState(new Date());
    const [selectedMonth, setSelectedmonth] = useState(new Date().getMonth())
    const [selectedYear, setSelectedyear] = useState(new Date().getFullYear())

    const handleDatechange = (newValue) => {

        let dt = new Date(newValue)
        setSelectedmonth(dt.getMonth() + 1)
        setSelectedyear(dt.getFullYear())

    };

    // for header

    let finddate = selectedMonth + '-' + '01' + '-' + selectedYear
    const dateSelected = new Date(finddate);
    let monthName = dateSelected.toLocaleString('default', { month: 'long' });

    /**
     * get all events fot eh month
     */

    function findRecordsByMonth() {

        const formattedMonth = dateSelected.getMonth() + 1
        const fomattedYear = dateSelected.getFullYear()

        const filteredRecords = montheventDB.filter(record => {
            const [recordYear, recordMonth] = record.date.split('-');
            return parseInt(recordYear) === fomattedYear && parseInt(recordMonth) === formattedMonth;
        });
        return filteredRecords;

    }

    const monthSelctionarray = findRecordsByMonth()

    return (

        <Container maxWidth='xl'>
            <Box
                sx={{ width: '100%', backgroundColor: '#F7F7F7', alignItems: 'center', borderRadius: '15px' }}   >
                <Typography variant='h5' color={'primary.dark'}>
                    <Grid container spacing={0}>

                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{
                                    width: '200px',
                                    padding: '10px',
                                    borderRadius: 2,
                                    border: '1px solid #C0C0C0'
                                }}
                            >
                                Annual Planner
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{
                                    width: '200px',
                                    padding: '10px',
                                    borderRadius: 2,
                                }}
                            >
                                {monthName}-{selectedYear}
                            </Box>
                        </Grid>
                    </Grid>
                </Typography>
            </Box>

            <Grid container spacing={0}>

                <Grid item xs={12} sm={3}>
                    <Card sx={{ padding: '15px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <DateCalendar
                                minDate={dayjs('04/01/2023')}
                                maxDate={dayjs('04/30/2024')}
                                onChange={(newValue) => {
                                    setDateselect(newValue)
                                }}
                                onMonthChange={handleDatechange}
                                renderLoading={() => <DayCalendarSkeleton />}
                            />
                        </LocalizationProvider>
                        <Typography variant='h5'> Events</Typography>
                        
                            {monthSelctionarray.map(monthValue => (
                                <>


                                    <Accordion sx={{ backgroundColor: '#F7F7F7', border: '0px solid #fff' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <Typography color={'primary.dark'}>{monthValue.date} | {monthValue.type}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                {monthValue.start_time} to {monthValue.end_time}
                                            </Typography>
                                            <Typography>
                                                {monthValue.description}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>

                                </>
                            ))}
                        
                    </Card>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Calandertab
                        monthsh={selectedMonth}
                        yearsh={selectedYear}
                        monthevent={montheventDB}
                    />
                </Grid>

            </Grid>

        </Container>
    )
}