const { default: axios } = require("axios");
const sdk = require("node-appwrite");
const XLSX = require("xlsx");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client()
    .setEndpoint("https://backend.myconsilium.tech/v1")
    .setProject("62d3d27563e7e0bc765d")
    .setKey(
      "514ce0ecdb93cc1e8897fe08ea5219e9fea435c127d67460d431782d99d01d6a11e7cc9ea46a089ca0020ab905d9678424f89e1bc71848cb6044b2a696a27b32c20bb98eb784d3edb67b294d1ee1fd10aaffa18f8b68b9825659fe89636c90ffbcbd5932bf1679dcbfe76e941dd29ed9713e9613bb87e891465877218ac186e8"
    )
    .setSelfSigned(true);
  const xlsxID = req.payload;
  let storage = new sdk.Storage(client);

  try {
    const xlsx = await storage.getFileView("630d073858785919de38", xlsxID);
    const wb = XLSX.read(xlsx);
    const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    const response = await Promise.all(
      data.map(async (item, i) => {
        const { Name, Email } = item;
        const res = await axios.post(
          "https://sdi-admin-c4jb3a7oz-vaithisniper.vercel.app/api/generateCertificate",
          JSON.stringify({
            certificateID: "1",
            participantName: Name,
            participantEmail: Email,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return res;
      })
    );
    res.json(
      {
        body: response,
      },
      200
    );
  } catch (err) {
    res.json(err, 500);
  }
};
