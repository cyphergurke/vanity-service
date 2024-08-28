import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AiOutlineQrcode } from 'react-icons/ai';
import { QrReader } from 'react-qr-reader'

type TQrDialog = {
    setgenpubkey: React.Dispatch<React.SetStateAction<string>>;
}

const QrDialog = ({ setgenpubkey }: TQrDialog) => {
    const handleScan = async (data: any | null) => {
        if (data && data.text) {
            setgenpubkey(data.text)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='p-1'>
                    <AiOutlineQrcode className='ml-2 text-xl  text-white transition-all ease-in-out hover:text-[27px]' />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle> </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col gap-y-5 justify-center items-center'>
                    <QrReader
                        className=' max-w-screen w-[340px] lg:w-[400px]'
                        constraints={{ facingMode: "environment" }}
                        scanDelay={30}
                        onResult={(result: any) => handleScan(result)}
                    />
                    <DialogClose asChild >
                        <Button type="button">
                            Close
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog >
    )
}

export default QrDialog
