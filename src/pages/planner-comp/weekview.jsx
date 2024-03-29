import PropTypes from 'prop-types';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const dayArr = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const timeArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function Weekview({ SelectedDateX, eventArr }) {


    const givenDate = new Date(SelectedDateX)

    let weekDateArr = []
    let weekDayArr = []

    /**
     *   get the 7 day dates to show in the week view   -------------------------------------------------
     */
    const calculateWeekdays = () => {
        const midpoint = givenDate.getDay()

        let currentDate = givenDate

        for (let i = 0; i < midpoint; i += 1) {
            currentDate.setDate(currentDate.getDate() - 1);
        }

        const month1 = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day1 = String(currentDate.getDate()).padStart(2, '0');
        weekDateArr.push(currentDate.getFullYear() + "-" + month1 + "-" + day1)
        weekDayArr.push(currentDate.getDate())

        for (let i = 0; i < 6; i += 1) {
            currentDate.setDate(currentDate.getDate() + 1);

            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            weekDateArr.push(currentDate.getFullYear() + "-" + month + "-" + day)
            weekDayArr.push(currentDate.getDate())
        }
    }

    calculateWeekdays()

    /**
     *   get the event matching teh 7 days from main array ------------------------------------------------------
     */

    let inScopeitemsarr = []
    const gettasksIndaterange = () => {

        for (let i = 0; i < weekDateArr.length; i++) {
            inScopeitemsarr.push(findRecordsByDate(weekDateArr[i]))
        }
    }
    // find the records for given date 
    const findRecordsByDate = (fmtDt) => {
        return eventArr.filter(record => record.dateFrom === fmtDt)
    }
    gettasksIndaterange()

    console.log(inScopeitemsarr)

    return (
        <>
            <table style={{ borderCollapse: 'collapse', width: '100%', minHeight: '90vh' }}>
                <tr style={{ height: '10%' }}>
                    <td style={{ width: '50px', minHeight: '90vh' }}>
                        <Typography variant='body2' color={'primary.dark'}>Time</Typography>
                    </td>
                    {dayArr.map((dayVal, index) => (

                        <td
                            align="center"
                            style={{ color: 'primary.dark', borderRadius: '5px', padding: '0px' }}>

                            <Typography variant='body2' color={'primary.dark'}>{dayVal}</Typography>
                            <Typography variant='h5' color={'primary.dark'}>{weekDayArr[index]}</Typography>
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


Weekview.propTypes = {
    SelectedDateX: PropTypes.any,
    eventArr: PropTypes.any
};