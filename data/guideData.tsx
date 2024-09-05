
export const guideDataEN = [
    {
        title: "Step 1",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Choose the Address Format
                </p>
                <div className="flex flex-col md:lg:flex-row gap-4">
                    <p>Bitcoin addresses come in three formats:</p>
                    <ul className="list-disc list-inside">
                        <li>
                            <strong>Legacy:</strong> Oldest format, higher fees.
                        </li>
                        <li>
                            <strong>P2SH:</strong> Allows lower fees and complex payments.
                        </li>
                        <li>
                            <strong>SegWit (Bech32):</strong> Recommended as it offers the lowest fees.
                        </li>
                    </ul>
                </div>
            </div>
        ),
    },
    {
        title: "Step 2",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Choose Your Prefix
                </p>
                <div className="flex flex-col md:lg:flex-row gap-4">
                    <p>
                        Enter the string or word you want in your vanity address. Note
                        that special characters are not allowed.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "Step 3",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Provide Public Key
                </p>
                <div className="flex flex-col md:lg:flex-row gap-4">
                    <p>
                        Use a wallet like Electrum to export your public key. Follow
                        these steps:
                    </p>
                    <ol className="list-decimal list-inside">
                        <li>In Electrum, go to View {'->'} Show Addresses.</li>
                        <li>Select an address and label it.</li>
                        <li>Click on Details and copy the public key.</li>
                    </ol>
                </div>
            </div>
        ),
    },
    {
        title: "Step 4",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Enter Your Email Address
                </p>
                <div className="flex flex-col md:lg:flex-row gap-4">
                    <p>
                        Enter your email address to receive the order confirmation and
                        the partial private key for the vanity address.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "Step 5",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Accept Terms and Solve CAPTCHA
                </p>
                <div className="flex flex-col md:lg:flex-row gap-4">
                    <p>
                        Read and accept the terms, solve the CAPTCHA, and confirm your
                        order.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "Step 6",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Complete Payment
                </p>
                <div className="flex flex-col md:lg:flex-row gap-4">
                    <p>
                        Pay with Bitcoin, Litecoin, or PayPal to start generating your
                        vanity address.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "Step 7",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Key-Merging (Combine Keys)
                </p>
                <div className="flex flex-col md:lg:flex-row gap-4">
                    <p>
                        After the vanity address is created, merge the received partial
                        private key with your own private key to get the final private key.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "Step 8",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Import the Final Key into Your Wallet
                </p>
                <div className="flex flex-col md:lg:flex-row gap-4">
                    <p>
                        Import the final private key into any wallet that supports WIF
                        compressed keys.
                    </p>
                    <p>
                        In Electrum, you can specify the address type by adding prefixes like
                        "p2pkh:" (Legacy) or "p2wpkh:" (SegWit) before the final key.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "Step 9",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Backup and Security
                </p>
                <div className="flex flex-col md:lg:flex-row gap-4">
                    <p>
                        Ensure your final private key is securely backed up in multiple
                        places, and create a plan for inheritance in case of loss or
                        death.
                    </p>
                </div>
            </div>
        ),
    },
];

export const guideDataDE = [
    {
        title: "Schritt 1",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Wählen Sie das Adressformat
                </p>
                <div className="flex flex-col lg:flex-row gap-4">
                    <p>Bitcoin-Adressen gibt es in drei Formaten:</p>
                    <ul className="list-disc list-inside">
                        <li>
                            <strong>Legacy:</strong> Ältestes Format, höhere Gebühren.
                        </li>
                        <li>
                            <strong>P2SH:</strong> Erlaubt niedrigere Gebühren und
                            komplexere Zahlungen.
                        </li>
                        <li>
                            <strong>SegWit (Bech32):</strong> Empfohlen, da es die
                            niedrigsten Gebühren bietet.
                        </li>
                    </ul>
                </div>
            </div>
        ),
    },
    {
        title: "Schritt 2",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Wählen Sie Ihr Präfix
                </p>
                <div className="flex flex-col lg:flex-row gap-4">
                    <p>
                        Geben Sie die Zeichenfolge ein, die in Ihrer Vanity-Adresse
                        erscheinen soll. Beachten Sie, dass keine Sonderzeichen
                        erlaubt sind.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "Schritt 3",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Public Key bereitstellen
                </p>
                <div className="flex flex-col lg:flex-row gap-4">
                    <p>
                        Nutzen Sie eine Wallet wie Electrum, um Ihren öffentlichen
                        Schlüssel zu exportieren. Folgen Sie diesen Schritten:
                    </p>
                    <ol className="list-decimal list-inside">
                        <li>Gehen Sie in Electrum zu Ansicht {'->'} Adressen anzeigen.</li>
                        <li>Wählen Sie eine Adresse, beschriften Sie sie.</li>
                        <li>Klicken Sie auf Details und kopieren Sie den öffentlichen Schlüssel.</li>
                    </ol>
                </div>
            </div>
        ),
    },
    {
        title: "Schritt 4",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    E-Mail-Adresse angeben
                </p>
                <div className="flex flex-col lg:flex-row gap-4">
                    <p>
                        Tragen Sie Ihre E-Mail-Adresse ein, um eine Bestellbestätigung
                        und den Teilschlüssel zu erhalten.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "Schritt 5",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    AGB und CAPTCHA lösen
                </p>
                <div className="flex flex-col lg:flex-row gap-4">
                    <p>
                        Lesen Sie die AGB, lösen Sie das CAPTCHA und bestätigen Sie die Bestellung.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "Schritt 6",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Bezahlung abschließen
                </p>
                <div className="flex flex-col lg:flex-row gap-4">
                    <p>
                        Zahlen Sie mit Bitcoin oder Paypal, um die Berechnung
                        Ihrer Vanity-Adresse zu starten.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "Schritt 7",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Key-Merging (Schlüssel zusammenführen)
                </p>
                <div className="flex flex-col lg:flex-row gap-4">
                    <p>
                        Sobald die Vanity-Adresse erstellt wurde, führen Sie den
                        erhaltenen Teilschlüssel mit Ihrem privaten Schlüssel
                        zusammen, um den endgültigen Schlüssel zu erhalten.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "Schritt 8",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Finalen Schlüssel in die Wallet importieren
                </p>
                <div className="grid lg:grid-cols-2 gap-4">
                    <p>
                        Importieren Sie den endgültigen privaten Schlüssel in eine
                        Wallet, die WIF-komprimierte Schlüssel unterstützt.
                    </p>
                    <p>
                        In Electrum können Sie den Adresstyp durch Präfixe wie „p2pkh:“
                        (Legacy) oder „p2wpkh:“ (SegWit) festlegen.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "Schritt 9",
        content: (
            <div>
                <p className="text-neutral-300 text-2xl font-normal mb-8">
                    Sicherung
                </p>
                <div className="flex flex-col md:lg:flex-row gap-4">
                    <p>
                        Sichern Sie Ihren privaten Schlüssel an mehreren Orten und
                        erstellen Sie einen Plan für den Fall eines Verlustes oder
                        Todes (Nachlass).
                    </p>
                </div>
            </div>
        ),
    },
];



