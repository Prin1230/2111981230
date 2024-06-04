const axios = require('axios');

let accessToken = null;

const getAccessToken = async () => {
    if (accessToken) return accessToken;

    const response = await axios.post('http://20.244.56.144/test/auth', {
        companyName: "goMart",
        clientID: "5abd5753-3f4a-4872-944e-17a19dc93e04",
        clientSecret: "gaCqQZrpiicjDoNF",
        ownerName: "PrinceRaj",
        ownerEmail: "prince1230.be21@chitkarauniversity.edu.in",
        rollNo: "2111981230"
    });

    accessToken = response.data.access_token;
    return accessToken;
};

module.exports = { getAccessToken };
