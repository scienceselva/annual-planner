import * as React from 'react';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Card, Container, Fab, Grid, Typography } from "@mui/material";
import { DateCalendar, DayCalendarSkeleton, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';

import Calandertab from './planner-comp/calandertab';

// sample data from DB for each month

export default function Planner() {

    const [dateSelect, setDateselect] = useState(new Date());
    const [selectedMonth, setSelectedmonth] = useState(new Date().getMonth())
    const [selectedYear, setSelectedyear] = useState(new Date().getFullYear())


    const handleDatechange = (newValue) => {

        let dt = new Date(newValue)
        setSelectedmonth(dt.getMonth() + 1)
        setSelectedyear(dt.getFullYear())

    };

    return (

        <Container maxWidth='xl'>

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
                    </Card>
                </Grid>

                <Grid item xs={12} sm={9}>                   
                    <Calandertab
                        monthsh={selectedMonth}
                        yearsh={selectedYear} />
                </Grid>

            </Grid>

        </Container>
    )
}