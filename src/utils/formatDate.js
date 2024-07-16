// dateFormatter.js

// Function to convert an ISO date string to dd-mm-yyyy format
export function formatDate(isoDateString) {
    // Create a Date object from the string
    const date = new Date(isoDateString);
  
    // Format the date to dd-mm-yyyy
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
  
    return formattedDate;
  }
  