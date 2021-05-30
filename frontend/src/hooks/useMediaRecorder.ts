import * as React from 'react';
import Webcam from 'react-webcam';

export const useMediaRecorder = (
  callback: (event: BlobEvent) => void,
): [(webcam: Webcam) => void, () => void, () => void, boolean] => {
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const recorderRef = React.useRef<MediaRecorder>();

  const camRef = React.useCallback(
    (webcam: Webcam) => {
      if (webcam?.stream) {
        recorderRef.current = new MediaRecorder(webcam.stream as MediaStream, {
          mimeType: 'video/webm',
        });
        recorderRef.current.addEventListener('dataavailable', callback);
      }
    },
    [callback],
  );

  React.useEffect(
    () => () =>
      recorderRef.current?.removeEventListener('dataavailable', callback),
    [callback],
  );

  const startRecording = React.useCallback(() => {
    recorderRef.current?.start();
    setIsRecording(true);
  }, []);

  const stopRecording = React.useCallback(() => {
    recorderRef.current?.stop();
    setIsRecording(false);
  }, []);

  return [camRef, startRecording, stopRecording, isRecording];
};
