const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Ajoutez cette ligne

const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Remplacez par le domaine de votre client
};


const app = express();


app.use(cors(corsOptions));
app.use(bodyParser.json());

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'prouta@gmail.com',
//     pass: 'prout'
//   }
// });
// Configuration pour Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  }
});

app.post('/envoyer-email', (req, res) => {
  const { message } = req.body;

  const mailOptions = {
    from: 'louiserondia@gmail.com',
    to: 'louiserondia@gmail.com',
    subject: 'Nouveau message depuis votre site web',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
      res.status(500).send('Erreur lors de l\'envoi de l\'email');
    } else {
      console.log('Email envoyé avec succès:', info.response);
      res.status(200).send('Email envoyé avec succès');
    }
  });
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
