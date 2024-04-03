import React, { useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Divider, FormControlLabel, FormGroup, Grid, IconButton, TextField, Tooltip, Checkbox, Autocomplete, Alert, Snackbar } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CloseIcon from '@mui/icons-material/Close';

import Popover from '@mui/material/Popover';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { saveNewevent, updateEvent, deleteEvent } from './dbutils'

const options = [];

export default function Popupevent({ dataPass, handleClosex, anchorEl, inox, handleClickx }) {

    //console.log(options)
    const [formData, setFormData] = useState(dataPass);
    const [formError, setFormerror] = useState(false)
    const [snackMessage, setSnackmessage] = useState(false)



    // to generate unique ids for components

    function generateUniqueID() {

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return toString(result);
    }




    // load all local events from local storage to be displaye din auto complete    
    const typesOfevents = JSON.parse(window.localStorage.getItem('eventTypesColor'))
    if (options.length < 1) {

        for (let i = 0; i < typesOfevents.length; i++) {
            const occurNC = { label: `${typesOfevents[i].type}`, valuN: `${typesOfevents[i].type}` }
            options.push({ label: `${typesOfevents[i].type}`, valuN: `${typesOfevents[i].type}` })

        }
    }



    const newData = [
        {
            _id: "",
            dateFrom: "",
            dateTo: "",
            type: "",
            description: "",
            startTime: "00:00",
            endTime: "23:59",
            fullDayEvent: false,
            lastUpdateby: "",
            lastUpdatedtm: "",
            level: ""
        }
    ]

    /**
     *  for the all day event check box
     */

    const handleChangealldayevent = (event) => {

        formData[inox].fullDayEvent = event.target.checked
        newData[0].fullDayEvent = event.target.checked
    };

    /**
     *  handle the changes in using useref
     */

    //const holdData =useRef({...dataPass});

    const workData_type = useRef(null);
    const workData_desc = useRef(null);
    const workData_st = useRef(null);
    const workData_et = useRef(null);
    const workData_sd = useRef(null);
    const workData_ed = useRef(null);

    let placeholderSet = ""

    const updateNewEvents = () => {
        let errorFlag = false
        //console.log(newData[0].fullDayEvent)

        // to check if valid event type        
        if (!(options.some(item => item.label === workData_type.current.value))) {
            errorFlag = true
        }

        if (workData_ed.current.value === 'MM/DD/YYYY') {
            newData[0].dateTo = null
        } else {
            newData[0].dateTo = handleFormChangeDates(workData_ed.current.value)
        }

        if (workData_sd.current.value === 'MM/DD/YYYY') {
            errorFlag = true
        } else {
            newData[0].dateFrom = handleFormChangeDates(workData_sd.current.value)
        }

        if (workData_et.current.value === '00:00' || workData_et.current.value === 'hh:mm') {
            newData[0].endTime = '23:59'
        } else {
            newData[0].endTime = workData_et.current.value
        }

        if (workData_st.current.value === 'hh:mm') {
            newData[0].startTime = '00:00'
        } else {
            newData[0].startTime = workData_st.current.value
        }

        if (workData_type.current.value === '') {
            errorFlag = true
        } else {
            newData[0].type = workData_type.current.value
        }

        if (workData_desc.current.value === '') {
            errorFlag = true
        } else {
            newData[0].description = workData_desc.current.value
        }


        newData[0].lastUpdateby = "user_selva",
            newData[0].lastUpdatedtm = new Date(),
            newData[0].level = 'L1'

        return errorFlag
    }

    const handleUpdatedate = async () => {

        let errorFlag = false
        setFormerror(errorFlag)

        errorFlag = updateNewEvents()

        if (formData[inox]._id) {
            newData[0]._id = formData[inox]._id
            if (workData_ed.current.value === 'MM/DD/YYYY') {
                updatePropertyAtIndex(inox, "dateTo", null)
            } else {
                updatePropertyAtIndex(inox, "dateTo", handleFormChangeDates(workData_ed.current.value))
            }

            if (workData_sd.current.value === 'MM/DD/YYYY') {
                errorFlag = true
            } else {
                updatePropertyAtIndex(inox, "dateFrom", handleFormChangeDates(workData_sd.current.value))
            }

            if (workData_et.current.value === '00:00' || workData_et.current.value === 'hh:mm') {
                updatePropertyAtIndex(inox, "endTime", '23:59')
            } else {
                updatePropertyAtIndex(inox, "endTime", workData_et.current.value)
            }

            if (workData_st.current.value === 'hh:mm') {
                updatePropertyAtIndex(inox, "startTime", '00:00')
            } else {
                updatePropertyAtIndex(inox, "startTime", workData_st.current.value)
            }



            if (workData_type.current.value === '') {
                errorFlag = true
            } else {
                updatePropertyAtIndex(inox, "type", workData_type.current.value)
            }


            if (workData_desc.current.value === '') {
                errorFlag = true
            } else {
                updatePropertyAtIndex(inox, "description", workData_desc.current.value)
            }


            updatePropertyAtIndex(inox, "fullDayEvent", formData[inox].fullDayEvent)
            updatePropertyAtIndex(inox, "lastUpdateby", "user_selva")
            updatePropertyAtIndex(inox, "lastUpdatedtm", new Date())
            updatePropertyAtIndex(inox, "level", 'L1')

        }
        if (errorFlag) {
            //console.log("there are errors")
            setFormerror(true)
        } else {
            await updatetheDB()
        }


    }


    const updatetheDB = async () => {

        let status = 500
        // when the action is a new event
        if (!formData[inox]._id) {
            //console.log({ ...newData[0] })            
            status = await saveNewevent({ ...newData[0] })
        } else {
            //console.log({ ...newData[0] })
            status = await updateEvent({ ...newData[0] })
        }
        if ((status === 200) || (status === 201)) {
            setSnackmessage(true)
        } else {
            setSnackmessage(false)
        }
        handleClick()
        handleClosex()
    }

    const handleUpdates = async (flag) => {
        let status = 500
        if (flag === 2) {
            status = await deleteEvent(formData[inox]._id)
        }
        if (status === 200) {
            setSnackmessage(true)
        } else {
            setSnackmessage(false)
        }
        if (flag === 2) {
            handleClick()
            handleClosex()
        }
    };

    // to update actual state array to reflect in screen post DB Updates

    const updatePropertyAtIndex = (index, propertyName, newValue) => {

        setFormData((prevState) => {
            const newState = [...prevState]
            newState[inox][propertyName] = newValue
            return newState
        });
    };


    // to format date component onChange

    const handleFormChangeDates = (valX) => {
        const givenDate = new Date(valX)
        const month1 = String(givenDate.getMonth() + 1).padStart(2, '0');
        const day1 = String(givenDate.getDate()).padStart(2, '0');
        const passedDate = givenDate.getFullYear() + "-" + month1 + "-" + day1
        return passedDate
    }

    // to format time component onChange

    const handleFormChangeTime = (timex) => {
        //console.log(timex)
        const hours = timex.$H.toString().padStart(2, '0')
        const minutes = timex.$m.toString().padStart(2, '0')
        return `${hours}:${minutes}`;
    }

    /**
     * for popover functionality to work
     */

    let open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    //console.log(formData)


    /**
     *   Sanck bar hande to update
     */
    const [snackStatus, setSnackstatus] = React.useState(false);

    const handleClick = () => {
        setSnackstatus(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackstatus(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                Dismiss
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );



    return (
        <>
            <Popover
                key={inox}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosex}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ padding: '20px', maxWidth: '400px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant='h6'>{formData[inox].type}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ padding: '0px' }}>

                                <IconButton aria-label="delete" size="medium" sx={{ float: 'right' }} onClick={handleClosex}>
                                    <Tooltip title="Close">  <CancelOutlinedIcon fontSize="inherit" /> </Tooltip>
                                </IconButton>

                                <IconButton aria-label="delete" size="medium" sx={{ float: 'right' }} onClick={(e) => handleUpdates(1)}>
                                    <Tooltip title="Edit"><EditOutlinedIcon fontSize="inherit" /></Tooltip>
                                </IconButton>

                                <IconButton aria-label="delete" size="medium" sx={{ float: 'right' }} onClick={(e) => handleUpdates(2)}>
                                    <Tooltip title="Delete"> <DeleteOutlineOutlinedIcon fontSize="inherit" /></Tooltip>
                                </IconButton>

                            </Box>
                        </Grid>
                    </Grid>
                    <Divider />

                    {formError ?
                        <Alert severity="error"> Error in form please correct !</Alert>
                        : null
                    }
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>

                            <Autocomplete
                                value={formData[inox].type}
                                id={generateUniqueID()}
                                freeSolo
                                options={options}
                                renderInput={(params) => <TextField {...params} label='Type' inputRef={workData_type} />}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                key={generateUniqueID}
                                fullWidth
                                label="Description"
                                name="description"
                                defaultValue={formData[inox].description}
                                inputRef={workData_desc}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    key={generateUniqueID}
                                    ampm={false}
                                    label="Start Time"
                                    defaultValue={dayjs(`${formData[inox].dateFrom}T${formData[inox].startTime}`)}
                                    onChange={(newValue) => handleFormChangeTime(newValue)}
                                    inputRef={workData_st}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    key={generateUniqueID}
                                    ampm={false}
                                    label="End Time"
                                    defaultValue={dayjs(`${formData[inox].dateFrom}T${formData[inox].endTime}`)}
                                    onChange={(newValue) => handleFormChangeTime(newValue)}
                                    inputRef={workData_et}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    key={generateUniqueID}
                                    label="Start Date"
                                    defaultValue={dayjs(`${formData[inox].dateFrom}`)}
                                    onChange={(newValue) => handleFormChangeDates(newValue)}
                                    inputRef={workData_sd}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    key={generateUniqueID}
                                    label="End Date"
                                    defaultValue={dayjs(`${formData[inox].dateTo}`)}
                                    onChange={(newValue) => handleFormChangeDates(newValue)}
                                    inputRef={workData_ed}
                                    slotProps={{
                                        textField: {
                                            error: false
                                        },
                                    }}
                                />
                            </LocalizationProvider>


                        </Grid>
                        <Grid item xs={6}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked={formData[inox].fullDayEvent} key={generateUniqueID} onChange={handleChangealldayevent} />} label="All Day Event " />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <br />
                    <Button variant="outlined" onClick={handleUpdatedate} sx={{ float: 'right' }}>Update</Button>
                    <br /><br />
                </Box >
            </Popover>
            <Snackbar
                open={snackStatus}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                {snackMessage ?
                    <Alert variant="filled" severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                        Event update Sucessful !
                    </Alert>
                    :
                    <Alert variant="filled" severity="error" sx={{ width: '100%' }} onClose={handleClose} >
                        Event update Failed !
                    </Alert>
                }
            </Snackbar>
        </>
    )
}

Popupevent.propTypes = {
    dataPass: PropTypes.any,
    handleClosex: PropTypes.func,
    handleClickx: PropTypes.func,
    anchorEl: PropTypes.any,
    inox: PropTypes.any

};