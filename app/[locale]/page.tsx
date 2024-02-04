
import SelectAddrType from "@/components/form/SelectAddrType";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <div className="flex flex-col justify-center mt-24 mb-10 items-center gap-10">
      <h1 className="text-white text-4xl font-thin">{t('title')}</h1>
     <SelectAddrType />
    </div>
  );
}
