const nodemailer = require('nodemailer');

class EmailHandler {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_POST,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendPartialPriv(booking) {
        let info = await this.transporter.sendMail({
            from: '"₿itcoin-Uni.de" info@bitcoin-uni.de',
            to: booking.email,
            bcc: process.env.VANITY_BBC_EMAIL,
            subject: 'VanityAddressGenerator - Your address was calculated',
            text: `
      Your order has been processed and your requested address has been successfully calculated.
        
      Your public address is: ${booking.pubAddress}
      Your partial private key: ${booking.partialPriv}
      Your private key: stored by you (when creating the key pair).
      
      The next and therefore last step is now to calculate your final private key using your stored private key (when creating the key pair) and the partial private key.
      
      For a secure private key calculation (keymerging) we recommend to open the following link in incognito mode (right click on the link -> "Open link in incognito mode") and to go offline before the calculation.
      Click here to calculate your final private key.
      
      CAUTION: Save the calculated private key in a safe place and do not share it with anyone.
      
      If you have any questions, please contact our support info@bitcoin-uni.de.

        Please Support the us, by donating and share this Service on Twitter or somewhere else.

        Follow us on Instagram and Twitter 
        `,
            html: `
      <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>VanityAddressKey</title>
    <!-- FONT-AWESOME 4.7.0 -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">


    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            min-width: 100% !important;
            font-family: arial
        }

        .content {
            width: 100%;
            max-width: 700px;
        }

        h1,
        h2,
        h3,
        h4 {
            margin: .3rem .5rem 1rem;

        }

        h1 {
            padding: .5rem;
        }

        .wrapper {
            /*text-align: center;*/
            padding: 0 1rem;

        }

        .btn {
            background-color: black;
            border-color: #ffe70e !important;
            font-size: 20px;
            display: inline-block;
            padding: 1rem;
            border-radius: 4px;

        }

        .key {

            margin-bottom: 1rem;
            display: inline-block;
            font-size: 22px;
        }

        .green {
            color: green;
        }

        .red {
            color: red;
        }

        a.btn:link,
        a.btn:visited {
            color: #ffe70e;
            text-decoration: none;
            border-color: #ffe70e;
        }

        a.btn:focus,
        a.btn:hover,
        a.btn:active {
            color: white;
        }

        a:link,
        a:visited {
            color: #ffe70e;
            text-decoration: none;
        }

        a:focus,
        a:hover,
        a:active {
            color: rgb(87, 74, 0);
        }

        .icons {
            font-size: 30px;
        }
    </style>
</head>

<body yahoo bgcolor="#fff">
    <table width="100%" bgcolor="#fff" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <table class="content" align="center" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="color: white; background-color: #111;">
                            <div style="text-align: center; background-color: black;">
                                <br>
                                <h1 style="font-weight: 50; color: #ffe70e; text-align: center;">Vanity Address
                                    Generator</h1>
                                <h2 style="font-weight: 50;">Your address was calculated</h2>

                                <br>
                                <hr color="#ffe70e">
                            </div>

                            <div style="padding:0 30px 0 30px">
                                <p>Your order has been processed and your requested address has been successfully
                                    calculated.
                                   <br> Read this instruction careful.
                                <h3>Your public address is:</h3>
                                <span id="vaddr" class="green key">${booking.pubAddress}</span>
                                <br />
                                <h3>Your partial private key:</h3>
                                <span id="partkey" class="green key">${booking.partialPriv}</span>
                                <br />
                                <h3>Your private key:</h3>
                                <span class="red key"> stored by you (when creating the key pair).</span>
                                <br />

                                <br>



                                The next and therefore last step is now to calculate your final private key using
                                your
                                stored private
                                key
                                (when creating the key pair) and the partial private key.

                                <br> <br><br> <br>
                                <div style="text-align: center;">
                                    <span class="red key ">Private Keys merge only
                                        offline!</span>

                                </div>
                                <p>
                                    <span style="color: red">CAUTION: </span> Save the calculated private key in a
                                    safe
                                    place and do not
                                    share
                                    it with anyone.
                                </p>
                                <br> <br>
                                For a secure calculation of the private key (key merging), <br>
                                we recommend them the following link in incognito mode <br>
                                (right click on the link -> "Open link in incognito mode),<br />
                                and go offline before calculation.
                                To calculate your final private key, click the following button:
                                </p>

                                <div style="text-align: center;">
                                    <a style="font-weight: 100; font-size: 22px;"
                                        href="http://vanity-address.bitcoin-uni.de/en/keymerging?pubAddress=${booking.pubAddress}&partialPriv=${booking.partialPriv}"><i
                                            class="fa fa-key" aria-hidden="true"></i><i class="fa fa-compress"
                                            aria-hidden="true"></i> KEY
                                        MERGING Webapp
                                    </a>
                                </div>

                                <br>
                                <p>Download the keymerging tool as Progressive Web Application to your smartphone or
                                    desktop
                                </p>
                                <p>Click on the following Button, it opens the minimalize keymerging tool in your
                                    browser,
                                    now click the
                                    plus
                                    sign (desktop) at the end of the domain line (https://...) to install the app local.
                                </p>
                                <p>On your smartphone browser it shows an information to install the app, or go to
                                    options
                                    and click
                                    'install
                                    application'.</p>
                                <div style="text-align: center;">
                                    <a style="font-weight: 100;font-size: 22px;"
                                        href="https://bitcoin-uni.de/vanityAddressMerger/">
                                        <i class="fa fa-key" aria-hidden="true"></i>
                                        <i class="fa fa-compress" aria-hidden="true"></i> Download KEY MERGING APP
                                    </a>
                                </div>

                                <p>
                                    Or download the full version of the Key Merging Tool, from Github to use it on an
                                    offline PC!
                                </p>
                                <div style="text-align: center;">
                                    <a style="font-size: 22px; text-align: center;"
                                        href="https://github.com/sashmaaan/VanityAddressMerger">Web3.0 App
                                        VanityAddressMerger</a>
                                    </a>
                                    <br> <br>
                                    <a style="font-size: 22px; text-align: center;"
                                        href="https://github.com/sashmaaan/VanityAddressMerger">Github
                                        VanityAddressMerger</a>
                                    </a>
                                    <br><br> <br>
                                    <a href="https://vanity-address.bitcoin-uni.de/en/sites/faq-vanity-address.html">
                                        Guide
                                    </a> <br> </a> <br>
                                    <a href="https://vanity-address.bitcoin-uni.de/en/sites/faq-vanity-address.html">
                                        FAQ - Vanity Addresses
                                    </a> <br>
                                </div>
                            </div>
                            <br>
                            <div
                                style="text-align:center; color: white; background-color: rgb(0, 0, 0); border-radius: 5px;">
                                <hr color="#ffe70e">
                                <br>
                                <a style="margin-right:10px" href="https://twitter.com/cryptxraver">
                                    <i class="bi bi-twitter icons"></i>Twitter
                                </a>
                                <a style="margin-right:10px" href="https://t.me/bitcoin_uni_support">
                                    <i class="bi bi-telegram icons"></i> Telegram
                                </a>
                                <a style="margin-right:10px" href="https://www.instagram.com/bitcoin_cypher_uni/">
                                    <i class="bi bi-instagram icons"></i>Instagram
                                </a>
                                <a href="https://bitcointalk.org/index.php?topic=5281176.0">
                                    <i class="fa fa-btc icons"></i>Bitcointalk
                                </a>
                                <br>
                                <p>Follow us on Social media and discuss on Bitcointalk!</p>
                                <p>Please donate if you get addresses for free!</p>
                                <p><b>3BitunigscbkbD6pRpRN32S79UZqJhTxge</b></p>
                                <p>
                                    If you have any questions please contact our <a
                                        href="mailto:info@bitcoin-uni.de">Support</a>
                                </p>
                                <br>
                                <a href="https://vanity-address.bitcoin-uni.de/en/sites/impressum.html">
                                    Impressum
                                </a> <br><a href="https://vanity-address.bitcoin-uni.de/en/sites/impressum.html">
                                    General Terms and Conditions
                                </a>
                                <br><br>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>


</html>
      `
        });

        console.info(`Calculated keys sent by Email to ${booking.email}`);
        return info;
    }
}

module.exports = EmailHandler;
