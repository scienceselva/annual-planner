import PropTypes from 'prop-types';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Paper, Stack, TextField, Tooltip } from '@mui/material';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';

import Popupevent from './popupevent';


export default function Daycard({ dayX, eventArr }) {

    const [anchorElm, setAnchorEl] = React.useState(false);

    //const [selectedCardindex, setSelectedCindex] = React.useState(0);
    let selectedCardindex = React.useRef(0);

    const handleClick = (event, index) => {
        setAnchorEl(event.currentTarget)
        //setSelectedCindex(index)
        selectedCardindex.current = index
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dateCheckG = (fDt, tDt) => {
        if (new Date(fDt) < new Date(tDt)) {
            return true
        }
        return false
    }

    return (
        <>

            <Box id='testx' sx={{ minHeight: '100%', minWidth: '100px', textAlign: 'center' }}>
                <Typography variant='body1'>{dayX}</Typography>
                {eventArr.map((dataX, index) => (
                    <>
                        <Paper
                            key={index}
                            onClick={(e) => handleClick(e, index)}
                            sx={{
                                textAlign: 'left',
                                borderBottom: `5px solid ${dataX.colorScheme}`,
                                backgroundColor: `rgb(from ${dataX.colorScheme} r g b / 35%)`,
                                padding: '5px',
                                maxHeight: '200px',
                                cursor: 'pointer',
                            }}
                        >
                            <Stack direction="row" spacing={2}>
                                <Typography variant='body2'>
                                    {dataX.type}
                                </Typography>
                                {dateCheckG(dataX.dateFrom, dataX.dateTo) ?
                                    <><Tooltip title="Multi-dated event"><DynamicFeedOutlinedIcon /></Tooltip></>
                                    : ''}

                            </Stack>

                        </Paper>
                    </>
                ))}
                {eventArr.length === 0 ? null :
                    <Popupevent
                        dataPass={eventArr}
                        handleClosex={handleClose}
                        handleClickx={handleClick}
                        anchorEl={anchorElm}
                        inox={selectedCardindex.current}
                      
                    />
                }

            </Box >
        </>
    )
}

Daycard.propTypes = {
    dayX: PropTypes.any,
    eventArr: PropTypes.any
    
};