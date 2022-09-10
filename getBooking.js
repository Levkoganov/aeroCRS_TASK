const fetch = require("node-fetch");

async function getBooking(data = {}) {
  const url = "https://api.aerocrs.com/v5/getBooking";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      auth_id: "54352965-a646-4621-9c00-cdf3063295c4", // Unique id
      auth_password: "7VNbHUH3rm840jQ071", // Unique pass
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ aerocrs: { parms: data } }), // Data
  };

  const response = await fetch(url, options);
  return await response.json(); // Return response json
}

module.exports = getBooking;
