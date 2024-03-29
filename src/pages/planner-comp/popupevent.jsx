import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Divider, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function Popupevent({dataPass, handleClosex}) {

    const [formData, setFormData] = useState(dataPass);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdates = (flag) => {
        console.log(flag)
    };
    const handleUpdatedate = () => {
        console.log("Update")
    };
 
    return (

        <Box sx={{ padding: '20px', maxWidth: '400px' }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant='h6'>{formData.type}</Typography>
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
            <br />
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
                        value={formData.startTime}
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
                        value={formData.endTime}
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
                        label="Start Date"
                        type="date"
                        name="startdate"
                        value={formData.dateFrom}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    {formData.fullDayEvent ? "Full Day Event" :
                        <TextField
                            fullWidth
                            label="End Date"
                            type="date"
                            name="enddate"
                            value={formData.dateTo}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    }
                </Grid>
            </Grid>
            <br/>
            <Button variant="outlined" onClick={handleUpdatedate} sx={{float: 'right'}}>Update</Button>
            <br/><br/>
        </Box >
    )
}

Popupevent.propTypes = {
    dataPass: PropTypes.any,
    handleClosex: PropTypes.func
};