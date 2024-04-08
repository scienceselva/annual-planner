import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Divider, Stack } from '@mui/material';
import Popupevent from './popupevent';

const dayArr = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const timeArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function Weekview({ SelectedDateX, eventArr }) {


    const givenDate = new Date(SelectedDateX)
    const yearsh = givenDate.getFullYear()
    const monthsh = givenDate.getMonth() + 1

    let weekDateArr = []
    let weekDayArr = []

    /**
     *  dummy array         //////////////     pop up related code
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


    const [anchorElm, setAnchorEl] = React.useState(false);

    //const [selectedCardindex, setSelectedCindex] = React.useState(0);
    let selectedCardindex = React.useRef(0);

    const handleClick = (event, index) => {

        setAnchorEl(event.currentTarget)
        //setSelectedCindex(index)
        selectedCardindex.current = index

    };

    const handleClosepop = () => {
        resetarrayMaker();
        setAnchorEl(null);
    };

    const handleaddNewEvent = (e, daySel, subIndex, flag) => {

        dummyArray[0].dateFrom = weekDateArr[daySel]
        if (flag === 'PM') {
            subIndex += 12
        }
        dummyArray[0].startTime = `${subIndex}:00`
        dummyArray[0].endTime = `${subIndex + 1}:00`
        let elementID = parseInt(e.target.id)
        console.log(dummyArray, elementID, daySel)

        handleClick(e, 0)


    }

    const handleaddEditEvent = (e, dayDetails) => {

        dummyArray[0]._id = dayDetails._id
        dummyArray[0].dateFrom = dayDetails.dateFrom
        dummyArray[0].dateTo = dayDetails.dateTo
        dummyArray[0].type = dayDetails.type
        dummyArray[0].description = dayDetails.description
        dummyArray[0].startTime = dayDetails.startTime
        dummyArray[0].endTime = dayDetails.endTime
        dummyArray[0].fullDayEvent = dayDetails.fullDayEvent
        dummyArray[0].lastUpdateby = dayDetails.lastUpdateby
        dummyArray[0].lastUpdatedtm = dayDetails.lastUpdatedtm
        dummyArray[0].level = dayDetails.level

        handleClick(e, 0)

    }

    const resetarrayMaker = () => {
        dummyArray[0]._id = ""
        dummyArray[0].dateFrom = ""
        dummyArray[0].dateTo = ""
        dummyArray[0].type = ""
        dummyArray[0].description = ""
        dummyArray[0].startTime = "00:00"
        dummyArray[0].endTime = "23:59"
        dummyArray[0].fullDayEvent = false
        dummyArray[0].lastUpdateby = ""
        dummyArray[0].lastUpdatedtm = ""
        dummyArray[0].level = ""
    }
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
     *   get the event matching the 7 days from main array ------------------------------------------------------
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


    // for rendering items inteh table 

    const renderItems = (masterIndex, subIndex, flag) => {

        let finalRender = ""
        if (inScopeitemsarr[masterIndex].length <= 0) {
            finalRender = <div style={{ height: '60px', borderBottom: '1px solid #c0c0c0', marginTop: '0px', display: 'flex' }}
                id={`${monthsh}${subIndex}`}
                onClick={(e) => handleaddNewEvent(e, masterIndex, subIndex, flag)}
            ></div>
        } else {
            finalRender = <div style={{ height: '60px', borderBottom: '1px solid #c0c0c0', marginTop: '0px', display: 'flex' }}>
                <Stack direction="row" spacing={0}>{timeCalculator(masterIndex, subIndex, flag)}</Stack>
            </div>
        }

        return finalRender
    }

    /**
     *  function to calcualte and paint the div in weekly format
     * @param {main index} masterIndex 
     * @param {sub index or its the actual time} subIndex 
     * @param {AM / PM flag} flag 
     * @returns full painted div
     */
    const timeCalculator = (masterIndex, subIndex, flag) => {

        let finalRenderDetails = []
        let renderDetails = ""

        if (flag == 'PM') {
            subIndex += 12
        }

        for (let i = 0; i < inScopeitemsarr[masterIndex].length; i += 1) {

            if (inScopeitemsarr[masterIndex][i].fullDayEvent) {
                inScopeitemsarr[masterIndex][i].startTime = "00:00"
                inScopeitemsarr[masterIndex][i].endTime = "23:59"
            }

            let [hoursF, minutesF] = inScopeitemsarr[masterIndex][i].startTime.split(":");
            let [hoursT, minutesT] = inScopeitemsarr[masterIndex][i].endTime.split(":");
            let schemeColor = inScopeitemsarr[masterIndex][i].colorScheme



            let fromTime = parseInt(hoursF, 10) * 3600000 + parseInt(minutesF, 10) * 60000;
            let toTime = parseInt(hoursT, 10) * 3600000 + parseInt(minutesT, 10) * 60000;
            let differanceInMinutes = (toTime - fromTime) / 60000;

            if (hoursF == subIndex) {
                //console.log(subIndex,"-->",inScopeitemsarr[masterIndex])
                renderDetails = <div
                    style={{
                        minHeight: `${differanceInMinutes}px`,
                        marginTop: `${minutesF}px`,
                        marginLeft: `5px`,
                        borderRight: `1px solid ${schemeColor}`,
                        borderLeft: `1px solid ${schemeColor}`,
                        borderTop: `1px solid ${schemeColor}`,
                        borderBottom: `5px solid ${schemeColor}`,
                        borderRadius: '10px',
                        backgroundColor: `rgb(from ${schemeColor} r g b / 45%)`,
                        display: 'flex',

                    }}
                    onClick={(e) => handleaddEditEvent(e, inScopeitemsarr[masterIndex][i])}
                >
                    <Typography style={{ padding: '5px' }} variant='h6'>
                        {inScopeitemsarr[masterIndex][i].type}
                    </Typography>
                    <Typography style={{ padding: '5px' }} variant='inherit'>
                        {inScopeitemsarr[masterIndex][i].description}
                    </Typography>
                </div>
                finalRenderDetails.push(renderDetails)
            }

        }

        return finalRenderDetails
    }


    //console.log(inScopeitemsarr)

    return (
        <>
            <table style={{ borderCollapse: 'collapse', width: '100%', minHeight: '90vh' }}>
                <tr key="123Time" style={{ height: '10%' }}>
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
                <tr key="124Time" style={{ height: '90%' }}>
                    <td
                        align="center"
                        style={{ borderRight: '1px solid #c0c0c0', color: 'primary.dark', borderRadius: '5px', padding: '0px' }}>
                        {timeArr.map(timeVal => (
                            <div style={{ height: '60px', borderBottom: '1px solid #c0c0c0', marginTop: '0px', display: 'flex' }}>
                                <Typography variant="caption" color={'primary.dark'} sx={{ alignSelf: 'flex-end' }}>{timeVal} AM</Typography>
                            </div>
                        ))}
                        {timeArr.map(timeVal => (
                            <div style={{ height: '60px', borderBottom: '1px solid #c0c0c0', marginTop: '0px', display: 'flex' }}>
                                <Typography variant="caption" color={'primary.dark'} sx={{ alignSelf: 'flex-end' }}>{timeVal} PM</Typography>
                            </div>
                        ))}
                    </td>
                    {dayArr.map((dayVal, index1) => (
                        <td
                            align="center"
                            style={{ width: '200px', borderRight: '1px solid #c0c0c0', color: 'primary.dark', borderRadius: '5px', padding: '0px' }}>
                            {timeArr.map((timeVal, index) => (
                                renderItems(index1, index, 'AM')
                            ))}
                            {timeArr.map((timeVal, index) => (
                                renderItems(index1, index, 'PM')
                            ))}
                        </td>
                    ))}
                </tr>
            </table>
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


Weekview.propTypes = {
    SelectedDateX: PropTypes.any,
    eventArr: PropTypes.any
};