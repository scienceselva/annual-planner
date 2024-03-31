import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';

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