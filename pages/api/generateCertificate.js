//--------------------------------------------- imports ---------------------------------------------

const Jimp = require("jimp");
const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const path = require("path");
const sdk = require("node-appwrite");

//--------------------------------------------- SDK setups ---------------------------------------------

const client = new sdk.Client()
  .setEndpoint("https://backend.myconsilium.tech/v1")
  .setProject("62d3d27563e7e0bc765d")
  .setKey(
    "514ce0ecdb93cc1e8897fe08ea5219e9fea435c127d67460d431782d99d01d6a11e7cc9ea46a089ca0020ab905d9678424f89e1bc71848cb6044b2a696a27b32c20bb98eb784d3edb67b294d1ee1fd10aaffa18f8b68b9825659fe89636c90ffbcbd5932bf1679dcbfe76e941dd29ed9713e9613bb87e891465877218ac186e8"
  );
const storage = new sdk.Storage(client);

sgMail.setApiKey(
  "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"
);

const fontPath = path.join(
  process.cwd(),
  "fonts",
  "VH09Fr_IVUGrnKVtOvgreV1r.ttf.fnt"
);
const fontFile = fs.readFileSync(fontPath);
const fontPath2 = path.join(
  process.cwd(),
  "fonts",
  "VH09Fr_IVUGrnKVtOvgreV1r.ttf_0.png"
);
const fontFile2 = fs.readFileSync(fontPath2);
//--------------------------------------------- exports ---------------------------------------------

export const config = {
  api: {
    bodyParser: true,
  },
  unstable_includeFiles: ["fonts"],
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : res.send("Invalid request").status(500);
};

//--------------------------------------------- post function ------------------------------------------------------

const post = async (req, res) => {
  const { certificateID, participantEmail } = req.body;
  const participantName = toTitleCase(req.body.participantName.toString());
  const mailResp = await generateCertificate(
    certificateID,
    participantName,
    participantEmail,
    res
  );
};

//--------------------------------------------- title case function ---------------------------------------------

const generateCertificate = async function (
  certificateID,
  participantName,
  participantEmail,
  res
) {
  try {
    const promise = storage.getFileView(
      "63036a0e8745eb1d273c",
      "6343c5496d2728f1f019"
    );
    promise.then((response) => {
      const img = Jimp.read(response);
      const font = Jimp.loadFont(fontPath); //fontPath

      font.then((fontRes) => {
        img
          .then((image) => {
            return image
              .print(
                fontRes,
                1070,
                610,
                {
                  text: participantName,
                  alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                  alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                },
                0,
                0
              )
              .getBufferAsync(Jimp.MIME_PNG);
          })
          .then(async (imageRes) => {
            return mailer(participantEmail, participantName, "", "", imageRes);
          })
          .then((mailResp) => {
            res.status(200).json({ message: "Done" });
          });
      });
    });
  } catch (err) {
    console.warn(err);
    res.status(400).json({ err: err });
  }
};

//--------------------------------------------- mail certificate ---------------------------------------------

const mailer = async (email, name, subject, message, image) => {
  try {
    const attachment = image.toString("base64");
    message = `Thank you ${name} for Manthan a huge success! Here's your certificate.\nLooking forward to more fun times!`;
    subject = "Thank you for participating!";
    //preparing attachment

    const SGmessage = {
      personalizations: [
        {
          to: email,
        },
      ],
      from: {
        email: "studentdeveloperinitiative@gmail.com",
      },
      subject: subject,
      content: [
        {
          type: "text/html",
          value: message,
        },
      ],
      attachments: [
        {
          content: attachment,
          filename: `certificate.png`,
          type: "image/png",
          disposition: "attachment",
        },
      ],
    };
    return sgMail.send(SGmessage);
  } catch (err) {
    return err;
  }
  //sending mail and returning appropriate response
};

//--------------------------------------------- title case function ---------------------------------------------

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
