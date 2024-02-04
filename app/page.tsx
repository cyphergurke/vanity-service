import ChooseType from "@/components/form/ChooseType";


export default function Home() {
  return (
    <div className="flex flex-col justify-center mt-36 mb-10 items-center gap-10">
      <div className="flex flex-row gap-10 ">
        <ChooseType
          title="Legacy 1BTC..."
          description={
            <>
              <p >
                Bitcoin Legacy Adresse
                beginnend mit einer 1,&nbsp;

                erlaubte Zeichen:&nbsp;1-9, a-z, A-Z
                nicht erlaubte Zeichen: 0, O, l, I
                bis zu acht Zeichen
                Höhere Transaktionsgebühren
              </p>

            </>
          }
          content={<p>awdawd</p>}
        />

        <ChooseType
          title="Nested SegWit 3Miaow..."
          description="erlaubte erste Zeichen: 2-9, A-Q
                ab zweitem Zeichen: 0-9, a-z, A-Z
                nicht erlaubte Zeichen: 0, O, l, I
                bis zu acht Zeichen
                Mittlere Transaktionsgebühren
                                                                                          
                "
          content={<p>awdawd</p>}
        />
      </div>
      <div className="flex flex-row mt-10">
        <ChooseType
          title=" Native Segwit bc1q... "
          description=""
          content={<p>awdawd</p>}
        />
      </div>
    </div>
  );
}
