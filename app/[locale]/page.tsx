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
  }
  const translation = {
    addrTypeTranslation,
    prefixTranslation,
    pubkeyTranslation,
  }

  return (
    <div className="flex flex-col justify-center mt-24 mb-10 items-center gap-10">
      <h1 className="text-white text-4xl p-4 lg:text-6xl font-thin">{t('title')}</h1>
      <FormPage translation={translation} />
    </div>
  );
}
