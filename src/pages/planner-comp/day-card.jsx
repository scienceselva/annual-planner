import PropTypes from 'prop-types';
import * as React from 'react';
import { styled } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import { Divider, Paper, Stack } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#C5FCF0',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '2px solid #0BC199',
    },
}));

export default function Daycard({ dayX, eventArr }) {

    const dayshade = '#0BC199'
    const dayshade1 = '#C5FCF0'


    return (
        <>
            <Typography variant='h5' sx={{ marginLeft: '0px', marginTop: '0px' }}>{dayX}</Typography>
            <Paper sx={{
                textAlign: 'left',
                minHeight: '100px',
                minWidth: '100px',
            }}>

                {eventArr.map(dataX => (
                    <>

                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">{dataX.type} </Typography>
                                    <hr/>
                                    <b> {dataX.start_time} to {dataX.end_time}</b><br/>
                                    <b>{dataX.description}</b>                                    
                                </React.Fragment>
                            }
                        >


                            <Paper sx={{
                                textAlign: 'left',
                                borderBottom: `5px solid ${dayshade}`,
                                backgroundColor: `${dayshade1}`,
                                padding: '5px',
                                maxHeight: '200px',
                                cursor: 'pointer'
                            }}>
                                <Stack direction="row">
                                    <Typography variant='body2'>
                                        {dataX.type}  
                                    </Typography>
                                    <IconButton aria-label="delete" size="small" sx={{float: 'right'}}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </Stack>
                            </Paper>
                        </HtmlTooltip>
                        <br />
                    </>
                ))}

            </Paper>
        </>
    )
}

Daycard.propTypes = {
    dayX: PropTypes.any,
    eventArr: PropTypes.any,
};