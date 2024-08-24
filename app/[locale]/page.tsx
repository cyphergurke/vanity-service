import FormPage from "@/components/form/FormPage";
import { useTranslations } from 'next-intl';



export default function Home() {
  const t = useTranslations('Index');
  const f = useTranslations('Form');

  const addrTypeTranslation = {
    addrtypeTitle: f('addrtype-title'),
    legacyTitle: f('addrTypeSelection.legacy-title'),
    legacyText: f('addrTypeSelection.legacy-text'),
    nestedSegwitTitle: f('addrTypeSelection.nested-segwit-title'),
    nestedSegwitText: f('addrTypeSelection.nested-segwit-text'),
    nativeSegwitTitle: f('addrTypeSelection.native-segwit-title'),
    nativeSegwitText: f('addrTypeSelection.native-segwit-text'),
  };

  const prefixTranslation = {
    prefixTitle: f('prefix.title'),
    prefixSubTitle: f('prefix.subtitle'),
    prefixCasesensitive: f('prefix.casesensitive'),
    disallowedPrefix: f('prefix.disallowed-prefix'),
    disallowedfirstchar: f('prefix.disallowedfirstchar'),
    invalidPrefix: f('prefix.invalid-prefix'),
    price: f('price.price'),
    addrType: f('price.addr-type'),
    prefixLenght: f('price.prefix-lenght'),
    priceTitle: f('price.price-title'),
    yes: f('price.yes'),
    no: f('price.no'),
  }

  const pubkeyTranslation = {
    pubkeyTitle: f('pubkey.title'),
    pubkeyText: f('pubkey.text'),
    dialogBTN: f('pubkey.dialog-btn'),
    aboutPubkeyTitle: f('pubkey.aboutpubkey-title'),
    aboutPubkeyText: f('pubkey.aboutpubkey-text'),
    chooseWalletTitle: f('pubkey.chooseWallet-title'),
    chooseWalletText: f('pubkey.chooseWallet-text'),
    exportPubkeyTitle: f('pubkey.exportpubkey-title'),
    exportPubkeyText: f('pubkey.exportpubkey-text'),
    keypairGenerateBTN: f('pubkey.keypair-generate-btn'),
    entropyText: f('pubkey.entropy-text'),
    securityHint: f('pubkey.security-hint'),
    privateKey: f('pubkey.private-key'),
    privateKeyCopyDescription: f('pubkey.private-key-copy-description'),
    publicKey: f('pubkey.public-key'),
    publicKeyCopyDescription: f('pubkey.public-key-copy-description'),
    pubkeyTakethisPubKeyBTN: f('pubkey.usepubkey-btn'),
    pubkeyRegenerate: f('pubkey.regenerate-btn'),
  }

  const contactTranslation = {
    contactTitle: f('contact.title'),
    contactText: f('contact.text'),
  }

  const translation = {
    addrTypeTranslation,
    prefixTranslation,
    pubkeyTranslation,
    contactTranslation
  }

  return (
    <div className="flex flex-col justify-center mt-24 mb-10 items-center">
      <h1 className=" text-center text-white text-4xl p-4 lg:text-6xl font-thin">{t('title')}</h1>
      <h2 className=" text-left text-white text-xl p-4 lg:text-4xl  mb-10">{t('subtitle')}</h2>
      <FormPage translation={translation} />
    </div>
  );
}
