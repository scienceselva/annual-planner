import PropTypes from 'prop-types';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Paper, Stack, TextField } from '@mui/material';
import Popover from '@mui/material/Popover';
import Popupevent from './popupevent';


export default function Daycard({ dayX, eventArr, handlePopupedit }) {

    const [anchorEl, setAnchorEl] = React.useState(false);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseButton = (event) => {        
        open = false        
    }

    let open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>

            <Box sx={{ minHeight: '100px', minWidth: '100px', textAlign: 'center' }}>

                <Typography variant='body1'>{dayX}</Typography>
                {eventArr.map((dataX, index) => (
                    <>
                        <Paper
                            key={index}
                            onClick={handleClick}
                            sx={{
                                textAlign: 'left',
                                borderBottom: `5px solid ${dataX.colorScheme}`,
                                backgroundColor: `rgb(from ${dataX.colorScheme} r g b / 35%)`,
                                padding: '5px',
                                maxHeight: '200px',
                                cursor: 'pointer',
                            }}
                        >
                            <Stack direction="row">
                                <Typography variant='body2'>
                                    {dataX.type}
                                </Typography>
                            </Stack>
                        </Paper>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <Popupevent
                                dataPass={dataX}
                                handleClosex={handleClose}
                            />
                        </Popover>
                    </>
                ))}



            </Box >
        </>
    )
}

Daycard.propTypes = {
    dayX: PropTypes.any,
    eventArr: PropTypes.any,
    handlePopupedit: PropTypes.func,
};