import React, { useCallback, useState } from 'react';
import Webcam, { WebcamProps } from 'react-webcam';
import { Button } from './ui/button';

const videoConstraints: WebcamProps['videoConstraints'] = {
  width: 1280,
  height: 720,
  facingMode: "enviroment"
};

const WebcamCapture = ({ setEntropy, setProgress }: any) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const webcamRef = React.useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
        setEntropy(imageSrc);
        setProgress(100)
      }
    }
  },
    [webcamRef]
  );

  return (
    <>
      {!image && (
        <>
          <Webcam
            audio={false}
            height={240}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={420}
            videoConstraints={videoConstraints}
          />
          <Button onClick={() => capture()}>Capture photo</Button>
        </>
      )}
      {image && (
        <div>
          <img src={image} alt="Webcam" />
          <Button onClick={() => { capture(); setImage('') }}>Capture new photo</Button>
        </div>
      )}
    </>
  );
};

export default WebcamCapture;
