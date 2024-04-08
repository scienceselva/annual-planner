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

import { getallEventTypes, getallEvents } from './planner-comp/dbutils';

// main data items for storing types and event list
let montheventDB = []
let eventType = []


export default function Planner() {

    let monthSelctionarray = []
    let yearMMfetchdb = new Date()
    
    montheventDB.sort((a, b) => {    
        if (a.dateFrom !== b.dateFrom) {
            return a.dateFrom.localeCompare(b.dateFrom);
        }    
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
        yearMMfetchdb = dt   
        handlemontNav()
        localStorage.setItem('currentDateView', yearMMfetchdb);        
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
            if(matchEvent.colorScheme){
            filteredRecords[i].colorScheme = matchEvent.colorScheme
            }else{
                filteredRecords[i].colorScheme = '#E7E9EB'
            }
        }

        return filteredRecords;

    }



    const [calview, setCalview] = React.useState('M');

    const handleChange = (event) => {
        setCalview(event.target.value);
    };

    if ((eventType.length > 0) && (montheventDB.length > 0)) {
        monthSelctionarray = findRecordsByMonth()
        localStorage.setItem('eventTypesColor', JSON.stringify(eventType));
    }

    const handleHomer = async () => {
        let tp = []
        console.log(tp)
    }

    const handlemontNav = () => {
        
       
        async function getData() {
            setLoading(true)
            montheventDB = await getallEvents(yearMMfetchdb)
            setLoading(false)
        }
        
        getData()
        
    }

    // integer state to force rerender ---
    const [value, setValue] = useState(0);     
    
    const hardresetRender = () => {        
        yearMMfetchdb = window.localStorage.getItem('currentDateView')   
        setLoading(true)
        handlemontNav()
        setValue(value => value + 1);
    }
    // ------------------------------------

    useEffect(() => {

        async function getClassData() {
            eventType = await getallEventTypes()
            const yearMM = selectedYear + '-' + selectedMonth            
            montheventDB = await getallEvents(yearMM)
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
                                    onClick={handleHomer}
                                />
                                <Box
                                    sx={{
                                        width: '150px',
                                        padding: '0px'                                        
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
                        <Typography variant='h5'> Events in the Month</Typography>
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
                                        resetRender={hardresetRender}
                                    />
                                case 'W':
                                    return <Weekview
                                        SelectedDateX={dateSelect}
                                        eventArr={montheventDB}
                                        resetRender={hardresetRender}
                                    />
                                case 'D':
                                    return <Dayview
                                        SelectedDateX={dateSelect}
                                        eventArr={montheventDB}
                                        resetRender={hardresetRender}
                                    />
                                default:
                                    return <Calandertab
                                        monthsh={selectedMonth}
                                        yearsh={selectedYear}
                                        monthevent={montheventDB}
                                        resetRender={hardresetRender}
                                    />
                            }
                        })()}

                    </Grid>

                </Grid>
            </>}
        </>
    )
}