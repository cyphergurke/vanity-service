import FormPage from "@/components/form/FormPage";
import { useTranslations } from 'next-intl';



export default function Home() {
  const t = useTranslations('Index');

  return (
    <div className="flex flex-col justify-center mt-24 mb-10 items-center">
      <h1 className=" text-center text-white text-4xl p-4 lg:text-6xl font-thin">{t('title')}</h1>
      <h2 className=" text-left text-white text-xl p-4 lg:text-4xl  mb-10">{t('subtitle')}</h2>
      <FormPage />
    </div>
  );
}
