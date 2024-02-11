import Prefix from "@/components/form/Prefix";
import PubKey from "@/components/form/PubKey";
import SelectAddrType from "@/components/form/SelectAddrType";
import { useTranslations } from 'next-intl';


export default function Home() {
  const t = useTranslations('Index');
  const f = useTranslations('Form');

  const formTranslation = {
    addrtypeTitle: f('addrtype-title'),
    legacyTitle: f('AddrTypeSelection.legacy-title'),
    legacyText: f('AddrTypeSelection.legacy-text'),
    nestedSegwitTitle: f('AddrTypeSelection.nested-segwit-title'),
    nestedSegwitText: f('AddrTypeSelection.nested-segwit-text'),
    nativeSegwitTitle: f('AddrTypeSelection.native-segwit-title'),
    nativeSegwitText: f('AddrTypeSelection.native-segwit-text'),
  };

  const prefixTranslation = {
    prefixTitle: f('prefix-title'),
    prefixSubTitle: f('prefix-sub-title'),
    prefixCasesensitive: f('prefix-casesensitive')
  }

  const pubkeyTranslation = {
    pubkeyTitle: f('pubkey-title'),
  }

  return (
    <div className="flex flex-col justify-center mt-24 mb-10 items-center gap-10">
      <h1 className="text-white text-6xl font-thin">{t('title')}</h1>
      <SelectAddrType translate={formTranslation} />
      <Prefix translate={prefixTranslation} />
      <PubKey translate={pubkeyTranslation} />
    </div>
  );
}
