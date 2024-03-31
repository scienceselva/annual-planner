import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Accordion, AccordionDetails, AccordionSummary, Alert, AppBar, Box, Card, CircularProgress, Container, Divider, Drawer, Fab, FormControl, Grid, IconButton, LinearProgress, Menu, MenuItem, Select, Stack, Typography } from "@mui/material";
import { DateCalendar, DayCalendarSkeleton, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Calandertab from './planner-comp/calandertab';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Weekview from './planner-comp/weekview';
import Dayview from './planner-comp/dayview';

import { getallEventTypes } from './planner-comp/dbutils';

// sample data from DB for each month

const montheventDB = [
    {
        "dateFrom": "2024-03-02",
        "dateTo": "2024-03-08",
        "type": "Holiday",
        "description": "Texas Independence Day",
        "startTime": "00:00",
        "endTime": "23:59",
        "fullDayEvent": true,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-03-10",
        "dateTo": "",
        "type": "Exam",
        "description": "Midterm Exam 3",
        "startTime": "11:30",
        "endTime": "16:00",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-03-10",
        "dateTo": "",
        "type": "Exam",
        "description": "Midterm Exam 1",
        "startTime": "10:00",
        "endTime": "12:00",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-03-10",
        "dateTo": "",
        "type": "Event",
        "description": "Midterm Exam 2",
        "startTime": "10:00",
        "endTime": "12:00",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-03-17",
        "dateTo": "",
        "type": "Event",
        "description": "St. Patrick's Day Parade",
        "startTime": "14:00",
        "endTime": "15:30",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-03-21",
        "dateTo": "",
        "type": "Seminar",
        "description": "Marketing Workshop",
        "startTime": "09:30",
        "endTime": "11:30",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-03-30",
        "dateTo": "",
        "type": "Event",
        "description": "Fashion Show",
        "startTime": "18:00",
        "endTime": "20:00",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-04-05",
        "dateTo": "",
        "type": "Holiday",
        "description": "Easter Sunday",
        "startTime": "00:00",
        "endTime": "23:59",
        "fullDayEvent": true,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-04-12",
        "dateTo": "",
        "type": "Exam",
        "description": "Final Exams Begin",
        "startTime": "09:00",
        "endTime": "11:30",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-04-19",
        "dateTo": "",
        "type": "Event",
        "description": "Technology Conference",
        "startTime": "10:30",
        "endTime": "12:30",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-04-22",
        "dateTo": "",
        "type": "Seminar",
        "description": "Leadership Development Program",
        "startTime": "13:00",
        "endTime": "15:00",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-04-30",
        "dateTo": "",
        "type": "Event",
        "description": "Art Exhibition Opening",
        "startTime": "16:00",
        "endTime": "17:30",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-05-06",
        "dateTo": "",
        "type": "Holiday",
        "description": "Cinco de Mayo",
        "startTime": "00:00",
        "endTime": "23:59",
        "fullDayEvent": true,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-05-13",
        "dateTo": "",
        "type": "Exam",
        "description": "Final Exams End",
        "startTime": "09:00",
        "endTime": "10:30",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-05-17",
        "dateTo": "",
        "type": "Event",
        "description": "Food Festival",
        "startTime": "12:00",
        "endTime": "14:00",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-05-22",
        "dateTo": "",
        "type": "Seminar",
        "description": "Finance Workshop",
        "startTime": "15:30",
        "endTime": "17:00",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    },
    {
        "dateFrom": "2024-05-25",
        "dateTo": "",
        "type": "Event",
        "description": "Music Concert",
        "startTime": "19:00",
        "endTime": "21:00",
        "fullDayEvent": false,
        "lastUpdateby": "username",
        "lastUpdatedtm": "2024-03-02"
    }
]
let eventType = []

export default function Planner() {
    let monthSelctionarray = []
    // Sort the array by dateFrom and startTime
    montheventDB.sort((a, b) => {
        // Compare dateFrom first
        if (a.dateFrom !== b.dateFrom) {
            return a.dateFrom.localeCompare(b.dateFrom);
        }
        // If dateFrom is the same, compare startTime
        return a.startTime.localeCompare(b.startTime);
    });

    const [isLoading, setLoading] = useState(true);

    const [dateSelect, setDateselect] = useState(new Date());
    const [selectedMonth, setSelectedmonth] = useState(new Date().getMonth() + 1)
    const [selectedYear, setSelectedyear] = useState(new Date().getFullYear())

    const handleDatechange = (newValue) => {

        let dt = new Date(newValue)
        setSelectedmonth(dt.getMonth() + 1)
        setSelectedyear(dt.getFullYear())
        setDateselect(dt)        
    };

    const handleAppbardateNav = (direction) => {
        const newDate = new Date(dateSelect);

        if (direction === 1) {
            newDate.setMonth(newDate.getMonth() + 1);
        } else {
            newDate.setMonth(newDate.getMonth() - 1);
        }
        setDateselect(newDate)        

    }

    // for header

    let finddate = selectedMonth + '-' + '01' + '-' + selectedYear
    const dateSelected = new Date(finddate);
    let monthName = dateSelected.toLocaleString('default', { month: 'long' });
    //console.log(dateSelect)

    /**
     * get all events fot the month
     */

    function findRecordsByMonth() {

        const formattedMonth = dateSelected.getMonth() + 1
        const fomattedYear = dateSelected.getFullYear()

        const filteredRecords = montheventDB.filter(record => {
            const [recordYear, recordMonth] = record.dateFrom.split('-');
            return parseInt(recordYear) === fomattedYear && parseInt(recordMonth) === formattedMonth;
        });

        for (let i = 0; i < filteredRecords.length; i += 1) {
            let type = filteredRecords[i].type
            let matchEvent = eventType.find(event => event.type === type);
            filteredRecords[i].colorScheme = matchEvent.colorScheme
        }

        return filteredRecords;

    }

    

    const [calview, setCalview] = React.useState('M');

    const handleChange = (event) => {
        setCalview(event.target.value);
    };

    if(eventType.length > 0){
        monthSelctionarray = findRecordsByMonth()
    }
    
    useEffect(() => {
        console.log("test")

        async function getClassData() {
            eventType = await getallEventTypes()
            
            setLoading(false)
        }
        if (isLoading) {
            getClassData()
        }

    }, []);

    return (
        <>
            <Box sx={{ backgroundColor: '#F7F7F7', borderBottom: '1px solid #C0C0C0', margin: 0 }}>

                <Typography variant='h5' color={'primary.dark'}>
                    <Grid container spacing={0}>

                        <Grid item xs={12} sm={4}>
                            <Stack direction="row">
                                <Box
                                    component="img"
                                    src="eflake.svg"
                                    sx={{
                                        width: '150px',
                                        padding: '0px',
                                        borderRadius: 1,
                                        border: '0px solid #c0c0c0'
                                    }}
                                />
                                <Box
                                    sx={{
                                        width: '150px',
                                        padding: '0px',
                                        borderRadius: 2,
                                        border: '1px solid #c0c0c0',
                                    }}
                                >
                                    <Typography variant='body1' color={'primary.dark'} sx={{ padding: '15px' }}>Annual Planner</Typography>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Box sx={{ padding: '5px' }}>
                                <IconButton aria-label="delete" size="medium" sx={{ float: 'right' }} onClick={(e) => handleAppbardateNav(1)}>
                                    <NavigateNextIcon fontSize="inherit" color="#fff" />
                                </IconButton>
                                <IconButton aria-label="delete" size="medium" sx={{ float: 'right' }} onClick={(e) => handleAppbardateNav(0)}>
                                    <NavigateBeforeIcon fontSize="inherit" color="#fff" />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
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
                        <Grid item xs={12} sm={2}>
                            <Box>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    <Select
                                        value={calview}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >

                                        <MenuItem value='M'>Month</MenuItem>
                                        <MenuItem value='W'>Week</MenuItem>
                                        <MenuItem value='D'>Day</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                        </Grid>
                    </Grid>
                </Typography>
            </Box>
            {isLoading ? <Box sx={{ width: '100%', marginTop: '20%', marginLeft: '50%' }}><CircularProgress color="inherit" /></Box> : <>


                <Grid container spacing={1}>

                    <Grid item xs={12} sm={3}>


                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <DateCalendar
                                value={dayjs(dateSelect)}
                                onChange={(newValue) => {
                                    setDateselect(newValue)
                                }}
                                onMonthChange={handleDatechange}
                                renderLoading={() => <DayCalendarSkeleton />}
                            />
                        </LocalizationProvider>
                        <Typography variant='h5'> Up coming Events</Typography>
                        <Divider /><br />
                        {monthSelctionarray.map((monthValue, index) => (
                            <>

                                <Accordion key={index} sx={{ backgroundColor: `rgb(from ${monthValue.colorScheme} r g b / 35%)`, border: '0px solid #fff', borderRadius: '5px' }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography variant='body1'>{monthValue.dateFrom} | {monthValue.type}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <Typography>
                                            {monthValue.fullDayEvent ? "Full Day Event" : <>{monthValue.startTime} To {monthValue.endTime} </>}
                                        </Typography>
                                        <Typography>
                                            {monthValue.description}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>

                            </>
                        ))}
                    </Grid>

                    <Grid item xs={12} sm={9}>

                        {(() => {
                            switch (calview) {
                                case 'M':
                                    return <Calandertab
                                        monthsh={selectedMonth}
                                        yearsh={selectedYear}
                                        monthevent={montheventDB}
                                    />
                                case 'W':
                                    return <Weekview
                                        SelectedDateX={dateSelect}
                                        eventArr={montheventDB}
                                    />
                                case 'D':
                                    return <Dayview
                                        SelectedDateX={dateSelect}
                                        eventArr={montheventDB}
                                    />
                                default:
                                    return <Calandertab
                                        monthsh={selectedMonth}
                                        yearsh={selectedYear}
                                        monthevent={montheventDB}
                                    />
                            }
                        })()}

                    </Grid>

                </Grid>
            </>}
        </>
    )
}