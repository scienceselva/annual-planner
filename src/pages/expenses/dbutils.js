import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';

const homeURL = "https://script.google.com/macros/s/AKfycbwFS5hCTMkP-ezfAQN32uVSB8iZx0Ah9JvRwASdR1H74DLnCW1z2qJY5eVwkJlDr70oCg/exec"
const postURL = "https://script.google.com/macros/s/AKfycbxbacTUTo_fDNvnhovjRs9qc1vD5TRPkbEnXw5DXVXwOWhHleJVxIik6xYg1Dso-RysPQ/exec"
//const homeURL = import.meta.env.VITE_BASE_ENDPOINT
/**
 * @returns []list of events
 * to get all event types 
 */
export async function getallExpense() {
    console.log(homeURL)
    let response = []
    try {
        response = await axios.get(homeURL, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    catch (error) {
        if (error.response) {
            console.log(error.response.status);
            if (error.response.status === 401) {
                console.log("Not Authorised")
            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error during request setup:', error.message);
        }
    }
    console.log(response.data)
    return response.data
}


export async function saveNewexp(eventData) {

    let response = []
    try {
        const finURL = postURL.concat(eventData)
        console.log(finURL)
        response = await axios.post(finURL, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3030'
            }
        })
    }
    catch (error) {
        if (error.response) {
            console.log(error.response.status)
            if (error.response.status === 401) {
                console.error('Not Authorized:', error.request);
            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error during request setup:', error.message);
        }
    }

    console.log(response.status)
    return response
}