import PropTypes from 'prop-types';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const dayArr = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const timeArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function Dayview({ SelectedDateX, eventArr }) {

    const givenDate = new Date(SelectedDateX)
    const month1 = String(givenDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(givenDate.getDate()).padStart(2, '0');
    const passedDate = givenDate.getFullYear() + "-" + month1 + "-" + day1

    // find the records for given date 
    const findRecordsByDate = () => {
        return eventArr.filter(record => record.dateFrom === passedDate)
    }


    // for rendering items inteh table 
    let inScopeitemsarr = []
    inScopeitemsarr.push(findRecordsByDate())

    const renderItems = (masterIndex, subIndex, flag) => {

        let finalRender = ""
        if (inScopeitemsarr[masterIndex].length <= 0) {
            finalRender = <div style={{ height: '60px', borderBottom: '1px solid #c0c0c0', marginTop: '0px', display: 'flex' }}></div>
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


                    }}>
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


    return (
        <>
            <table style={{ borderCollapse: 'collapse', width: '100%', minHeight: '90vh' }}>
                <tr style={{ height: '10%' }}>
                    <td style={{ width: '50px', minHeight: '90vh' }}>
                        <Typography variant='body2' color={'primary.dark'}>Time</Typography>
                    </td>

                    <td
                        align="center"
                        style={{ color: 'primary.dark', borderRadius: '5px', padding: '0px' }}>
                        <Typography variant='body2' color={'primary.dark'}>{dayArr[givenDate.getDay()]}</Typography>
                        <Typography variant='h5' color={'primary.dark'}>{day1}</Typography>
                    </td>

                </tr>
                <tr style={{ height: '90%' }}>
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

                    <td
                        align="center"
                        style={{ borderRight: '1px solid #c0c0c0', color: 'primary.dark', borderRadius: '5px', padding: '0px' }}>

                        {timeArr.map((timeVal, index) => (
                            renderItems(0, index, 'AM')
                        ))}
                        {timeArr.map((timeVal, index) => (
                            renderItems(0, index, 'PM')
                        ))}
                    </td>

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