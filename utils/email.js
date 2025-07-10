const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE || 'gmail', // Service de messagerie, ex: gmail
    auth: {
        user: process.env.MAIL_USER, // ex: espbudget@gmail.com
        pass: process.env.MAIL_PASS  // mot de passe de l'application ou token sécurisé
    }
});

/**
 * Envoie un email de définition de mot de passe
 * @param {string} to - Adresse email du destinataire
 * @param {string} token - Jeton de création de mot de passe
 */
exports.sendResetPasswordEmail = async (to, token) => {
    const url = `${process.env.FRONTEND_URL}/definir-mot-de-passe?token=${token}`;

    const mailOptions = {
        from: `"ESP Budget" <${process.env.MAIL_USER}>`,
        to,
        subject: 'Définir votre mot de passe - ESP Budget',
        html: `
        <p>Bonjour,</p>
        <p>Un compte a été créé pour vous dans le système de gestion budgétaire de l'ESP.</p>
        <p>Veuillez cliquer sur le lien ci-dessous pour définir votre mot de passe :</p>
        <p><a href="${url}">${url}</a></p>
        <p>Ce lien est à usage unique.</p>
        <br/>
        <p>Merci,</p>
        <p><b>L'équipe ESP</b></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Mail envoyé à ${to}`);
    } catch (error) {
        console.error('❌ Erreur envoi mail :', error.message);
        throw new Error("Échec d'envoi de l'email");
    }
};
