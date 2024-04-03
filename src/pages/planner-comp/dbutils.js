import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';

/**
 * @returns []list of events
 * to get all event types 
 */
export async function getallEventTypes() {

  let response = []
  try {
    const baseUrl = 'http://localhost:3000/apstatic'
    response = await axios.get(baseUrl, {
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
  console.log("in utils")
  return response.data[0].eventTypes
}

/**
 *  to get list of event  ---------------------------------------------
 * @returns 
 */

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function getallEvents(month) {

  let response = []
  try {
    const baseUrl = `http://localhost:3000/apdata/${month}`
    response = await axios.get(baseUrl, {
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

  let events = response.data
  events.forEach(event => {
    event.dateFrom = formatDate(event.dateFrom);
    if (event.dateTo !== null) {
      event.dateTo = formatDate(event.dateTo);
    }
  });

  return events
}


/**
   * to save the entered data into database
   */

export async function saveNewevent(eventData) {
  delete eventData._id; 
  //console.log(eventData) 
  let response = []
  try {

    const baseUrl = 'http://localhost:3000/apdata'
    response = await axios.post(baseUrl, eventData, {
      headers: {

        'Content-Type': 'application/json'
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
  return response.status
}



/**
* to update a particualr record
*/

export async function updateEvent(eventData) {
  delete eventData.__v; 
  console.log(eventData)
  let response = []
  try {

    const baseUrl = 'http://localhost:3000/apdata'
    response = await axios.put(baseUrl, JSON.stringify(eventData), {
      headers: {

        'Content-Type': 'application/json'
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
  return response.status
}


/**
* to delete a particualr record
*/

export async function deleteEvent(eventID) {
  
  console.log(eventID)
  let response = []
  try {

    const baseUrl = `http://localhost:3000/apdata/${eventID}`
    response = await axios.delete(baseUrl, JSON.stringify(eventID), {
      headers: {

        'Content-Type': 'application/json'
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
  return response.status
}