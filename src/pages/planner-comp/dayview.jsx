import PropTypes from 'prop-types';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const dayArr = ['MON']
const timeArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function Dayview({ SelectedDateX, eventArr, handlePopupedit }) {

    const dayshade = '#0BC199'
    const dayshade1 = '#C5FCF0'

    return (
        <>
            <table style={{ borderCollapse: 'collapse', width: '100%', minHeight: '90vh' }}>
                <tr style={{ height: '10%' }}>
                    <td style={{ width: '50px', minHeight: '90vh' }}>
                        <Typography variant='body2' color={'primary.dark'}>Time</Typography>
                    </td>
                    {dayArr.map(dayVal => (
                        <td
                            align="center"
                            style={{ color: 'primary.dark', borderRadius: '5px', padding: '0px' }}>
                            <Typography variant='body2' color={'primary.dark'}>{dayVal}</Typography>
                            <Typography variant='h5' color={'primary.dark'}>26</Typography>
                        </td>
                    ))}
                </tr>
                <tr style={{ height: '90%' }}>
                    <td
                        align="center"
                        style={{ borderRight: '1px solid #c0c0c0', color: 'primary.dark', borderRadius: '5px', padding: '0px' }}>
                        {timeArr.map(timeVal => (
                            <div style={{ height: '50px', borderBottom: '1px solid #c0c0c0', marginTop: '0px', display: 'flex' }}>
                                <Typography variant="caption" color={'primary.dark'} sx={{ alignSelf: 'flex-end' }}>{timeVal} AM</Typography>
                            </div>
                        ))}
                        {timeArr.map(timeVal => (
                            <div style={{ height: '50px', borderBottom: '1px solid #c0c0c0', marginTop: '0px', display: 'flex' }}>
                                <Typography variant="caption" color={'primary.dark'} sx={{ alignSelf: 'flex-end' }}>{timeVal} PM</Typography>
                            </div>
                        ))}
                    </td>
                    {dayArr.map(dayVal => (
                        <td
                            align="center"
                            style={{ borderRight: '1px solid #c0c0c0', color: 'primary.dark', borderRadius: '5px', padding: '0px' }}>

                            {timeArr.map(timeVal => (
                                <div style={{ height: '50px', borderBottom: '1px solid #c0c0c0', marginTop: '0px', display: 'flex' }}>
                                    
                                </div>
                            ))}
                            {timeArr.map(timeVal => (
                                <div style={{ height: '50px', borderBottom: '1px solid #c0c0c0', marginTop: '0px', display: 'flex' }}>
                                    
                                </div>
                            ))}
                        </td>
                    ))}
                </tr>
            </table>
        </>
    )
}

Dayview.propTypes = {
    SelectedDateX: PropTypes.any,
    eventArr: PropTypes.any,
    handlePopupedit: PropTypes.func,
};