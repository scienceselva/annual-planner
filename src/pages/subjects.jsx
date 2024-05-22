import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Card, Divider, FormControlLabel, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

// sample data

const subjectListArr = [
    {
        "_id": "661bd96d60137a1b431c66f6",
        "subjectCode": "ENG101",
        "subjectName": "English Literature",
        "subjectType": "regular",
        "subjectStatus": "Active",
        "subjectStaff": "John Doe",
        "__v": 0
    },
    {
        "_id": "661bd99860137a1b431c66f8",
        "subjectCode": "MATH202",
        "subjectName": "Advanced Calculus",
        "subjectType": "regular",
        "subjectStatus": "Active",
        "subjectStaff": "Jane Smith",
        "__v": 0
    },
    {
        "_id": "661bd9b460137a1b431c66fa",
        "subjectCode": "PHY303",
        "subjectName": "Quantum Mechanics",
        "subjectType": "Elective",
        "subjectStatus": "Active",
        "subjectStaff": "Michael Johnson",
        "__v": 0
    }
]
export default function Subjects() {
    const initSubjectVal = {
        subjectCode: '',
        subjectName: '',
        subjectType: '',
        subjectStatus: '',
        subjectStaff: '',
    }
    const [formData, setFormData] = useState(initSubjectVal);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [view, setView] = React.useState("new");

    const [deciderFlagNew, setDeciderFlagnew] = useState(true)

    const handleListChange = (event, nextView) => {
        if (nextView === null) {
            console.log("you clicked the same item again")
        } else {
            setView(nextView);
            if (nextView === "new") {
                setDeciderFlagnew(true)
                setFormData(initSubjectVal)
            } else {
                setDeciderFlagnew(false)
                setFormData(subjectListArr[nextView])
            }
        }
    };

    return (
        <Card sx={{ padding: '15px', width: '600px' }}>
            <Stack direction={'row'}>
                <Box>
                    <Typography variant='h6' sx={{ padding: '15px' }}> List of Subjects</Typography>
                    <Divider />
                    <Box
                        sx={{
                            mb: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 500,
                            overflow: "hidden",
                            overflowY: "scroll",
                            padding: '5px'
                        }}
                    >

                        <ToggleButtonGroup
                            orientation="vertical"
                            value={view}
                            exclusive
                            onChange={handleListChange}
                        >
                            <ToggleButton value="new" aria-label="list" color='primary' sx={{ textTransform: 'none' }}>
                                <Typography variant='h6'>Add New Subject</Typography>
                            </ToggleButton>
                            {subjectListArr.map((sublst, index) => (
                                <ToggleButton
                                    value={index}
                                    aria-label="list"
                                    color='primary'
                                    sx={{ textTransform: 'none' }}

                                >
                                    <Typography variant='body1'>{sublst.subjectName}</Typography>
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Box>
                </Box>
                <Box sx={{ padding: '20px', maxWidth: '350px', minWidth: '350px' }}>
                    <Stack spacing={2}>
                        {deciderFlagNew ?
                            <Typography variant='h6'> Add a new Subject</Typography>
                            :
                            <Typography variant='h6'> Edit Subject</Typography>
                        }
                        <Divider />
                        <TextField
                            label="Subject Code"
                            name="subjectCode"
                            value={formData.subjectCode}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Subject Name"
                            name="subjectName"
                            value={formData.subjectName}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Subject Type"
                            name="subjectType"
                            value={formData.subjectType}
                            onChange={handleChange}
                        />
                        <Box>
                            <FormControlLabel
                                value={formData.subjectStatus}
                                control={<Switch defaultChecked color="primary" />}
                                label="Status"
                                labelPlacement="start"
                            />
                        </Box>
                        <TextField
                            label="Subject Staff"
                            name="subjectStaff"
                            value={formData.subjectStaff}
                            onChange={handleChange}
                        />
                        {deciderFlagNew ?
                            <Button variant="contained" sx={{width: '100px', alignSelf: 'center'}} >Save</Button>
                            :
                            <Button variant="contained" sx={{width: '100px', alignSelf: 'center'}} >Update</Button>
                        }
                    </Stack>
                </Box>
            </Stack>
        </Card>
    )
}