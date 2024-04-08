import PropTypes from 'prop-types';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Paper, Stack, TextField, Tooltip } from '@mui/material';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';

import Popupevent from './popupevent';


export default function Daycard({ dayX, eventArr, updateMasterarr }) {

    const [anchorElm, setAnchorEl] = React.useState(false);

    // to force rerendering of the page
    const handleUpdateDelete = () => {        
        updateMasterarr()
    }

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

    const distanceCalcualtor = (e, date1, date2) => {

        const divWidth = e.target.clientWidth;

        const divRect = e.target.getBoundingClientRect();
        const distanceToViewportRight = window.innerWidth - divRect.right;

        console.log("Width of the div:", divWidth);
        console.log("Distance to viewport right:", distanceToViewportRight);

        const date1Ms = new Date(date1).getTime();
        const date2Ms = new Date(date2).getTime();
        const differenceMs = Math.abs(date2Ms - date1Ms);
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

        console.log("date differance", differenceDays);
        let extender = divWidth * differenceDays
        if (extender < distanceToViewportRight) {
            console.log("new width = ", extender - 20)
            extender = extender - 20
        } else {

            console.log("new width big= ", distanceToViewportRight - 20)
            extender = distanceToViewportRight - 20
        }


        respElement = <Paper
            key={index}
            sx={{
                textAlign: 'left',
                borderBottom: `5px solid ${dataX.colorScheme}`,
                backgroundColor: `rgb(from ${dataX.colorScheme} r g b / 35%)`,
                padding: '5px',
                maxHeight: '200px',
                cursor: 'pointer',
                minWidth: `${extender}`
            }}
        >
        </Paper>


        return respElement

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
                        handleClickx={handleUpdateDelete}
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
    eventArr: PropTypes.any,
    updateMasterarr: PropTypes.func
};