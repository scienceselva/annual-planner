import PropTypes from 'prop-types';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, Paper, Stack, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow enterTouchDelay={0} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#C5FCF0',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '2px solid #C0C0C0',
    },
}));

export default function Daycardinactive({ dayX, eventArr, handlePopupedit }) {

    const dayshade = '#0BC199'
    const dayshade1 = '#C5FCF0'

    return (
        <>

            <Box sx={{ minHeight: '100px', minWidth: '100px', textAlign: 'center' }} >
                <Typography variant='body1'>{dayX}</Typography>
                {eventArr.map(dataX => (
                    <>

                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <Typography color="inherit" variant='body1'>{dataX.type} </Typography>
                                    <b> {dataX.start_time} to {dataX.end_time}</b><br />
                                    {dataX.description}
                                </React.Fragment>
                            }
                        >

                            <Paper sx={{
                                textAlign: 'left',
                                borderBottom: `5px solid ${dayshade}`,
                                backgroundColor: `${dayshade1}`,
                                padding: '5px',
                                maxHeight: '200px',                                
                            }}
                            >
                                <Stack direction="row">
                                    <Typography variant='body2'>
                                        {dataX.type}
                                    </Typography>
                                </Stack>
                            </Paper>
                        </HtmlTooltip>
                        <br />
                    </>
                ))}

            </Box>
        </>
    )
}

Daycardinactive.propTypes = {
    dayX: PropTypes.any,
    eventArr: PropTypes.any,
    handlePopupedit: PropTypes.func,
};