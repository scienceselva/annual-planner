/**
 *  calander view of events ( Monthly)
 * 
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, Typography } from "@mui/material";
import Daycard from './day-card';
import Popupevent from './popupevent';

export default function Calandertab({ monthsh, yearsh, monthevent }) {
    /**
    *     defaults or constants
    */
    const dayArr = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    let montharr = []
    let monthName = ''

    /**
     *    --------------------------------------------- new event popup
     */
    const [dummyArray, setDummyarray] = useState([
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
    ])
    /**
     * function to calcualte the calander days and format them
     */
    const calculateDays = () => {

        let finddate = monthsh + '-' + '01' + '-' + yearsh
        const d = new Date(finddate);
        monthName = d.toLocaleString('default', { month: 'long' });
        const day = d.getDay()
        let maxdays = new Date(yearsh, monthsh, 0).getDate();

        let temparr = []

        for (let j = 1; j < day; j += 1) {
            temparr.push(0)
        }

        for (let index = 1; index <= maxdays; index += 1) {

            if (temparr.length < 7) {
                temparr.push(index)
            } else {
                montharr.push(temparr)
                temparr = []
                temparr.push(index)
            }

        }
        if (temparr.length > 0) {
            for (let j = temparr.length; j < 7; j += 1) {
                temparr.push(0)
            }
            montharr.push(temparr)
        }

        //        console.log(montharr)
    }

    /**
     *   function to find record by date and formatter and event handlers        ----------------------------------
     */

    const dataFormatterYYYYMMDD = (year, month, day) => {
        const formattedMonth = Number(month).toString().padStart(2, '0')
        const formattedDay = Number(day).toString().padStart(2, '0')
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`
        return formattedDate
    }

    // find the records for given date 
    const findRecordsByDate = (year, month, day) => {
        const fmtDt = dataFormatterYYYYMMDD(year, month, day)
        return monthevent.filter(record => record.dateFrom === fmtDt)
    }

    calculateDays()


    const [anchorElm, setAnchorEl] = React.useState(false);

    //const [selectedCardindex, setSelectedCindex] = React.useState(0);
    let selectedCardindex = React.useRef(0);

    const handleClick = (event, index) => {

        setAnchorEl(event.currentTarget)
        //setSelectedCindex(index)
        selectedCardindex.current = index

    };

    const handleClosepop = () => {
        setAnchorEl(null);
    };


    const handleaddNewEvent = (e, daySel) => {
        dummyArray[0].dateFrom = `${yearsh}-${monthsh}-${daySel}`        
        let elementID = parseInt(e.target.id)
        if ((daySel > 0) & (!isNaN(elementID))) {
            handleClick(e, 0)
        }

    }

    return (
        <>
            <Box sx={{ padding: '15px' }}>
                <table style={{ border: '1px solid #c0c0c0', borderCollapse: 'collapse', width: '100%', minHeight: '90vh' }}>
                    <tr>
                        {dayArr.map(dayVal => (
                            <td
                                key={dayVal}
                                align="center"
                                style={{ borderLeft: '1px solid #c0c0c0', borderBottom: '1px solid #fff', backgroundColor: '#F7F7F7', color: 'primary.dark', borderRadius: '5px', padding: '0px' }}>
                                <Typography variant='body2' color={'primary.dark'}>{dayVal}</Typography>
                            </td>
                        ))}
                    </tr>
                    {montharr.map((monX, index) => (
                        <tr key={index}>
                            {monX.map((dayNum, index) => (
                                <td id={`${monthsh}${dayNum}`}
                                    style={{ border: '1px solid #C0C0C0', backgroundColor: '#FFF', padding: '5px', verticalAlign: 'top' }}
                                    onClick={(e) => handleaddNewEvent(e, dayNum)}>
                                    {(dayNum === 0) ? '' :
                                        <Daycard
                                            dayX={dayNum}
                                            eventArr={findRecordsByDate(yearsh, monthsh, dayNum)}
                                            sx={{ marginTop: '0px' }}
                                        />}
                                </td>

                            ))}

                        </tr>
                    ))}
                </table>

            </Box>

            <Popupevent
                dataPass={[...dummyArray]}
                handleClosex={handleClosepop}
                handleClickx={handleClick}
                anchorEl={anchorElm}
                inox={selectedCardindex.current}

            />
        </>
    )
}
Calandertab.propTypes = {
    monthsh: PropTypes.any,
    yearsh: PropTypes.any,
    monthevent: PropTypes.any

};