const fetch = require("node-fetch");
const { key, modelId } = require("./config.json");

async function createPass(data = {}) {
  const url = `https://api.pass2u.net/v2/models/${modelId}/passes`;
  const options = {
    method: "POST",
    headers: {
      "x-api-key": key, // API unique key
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Data
  };

  const response = await fetch(url, options);
  return await response.json(); // Return response json
}

module.exports = createPass;
