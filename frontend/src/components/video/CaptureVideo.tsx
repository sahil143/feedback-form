import * as React from 'react';
import { Button } from '@material-ui/core';
import { FiberManualRecord, StopRounded } from '@material-ui/icons';
import { useFormContext } from 'react-hook-form';
import Webcam from 'react-webcam';

type CaptureVideoProps = {
  /** key to be registered using react-hook-form `register` method */
  name: string;
};

const CaptureVideo: React.FC<CaptureVideoProps> = ({ name }) => {
  const { register, setValue } = useFormContext();
  const [recordedVideo, setRecordedVideo] = React.useState<Blob[]>([]);
  const [previewVideo, setPreviewVideo] = React.useState<string>();
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const webCamRef = React.useRef<Webcam>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder>();

  const handleDataAvailable = React.useCallback(({ data }: BlobEvent) => {
    if (data.size > 0) {
      setRecordedVideo((prevState) => prevState.concat(data));
    }
  }, []);

  const startCapture = React.useCallback(() => {
    setIsRecording(true);
    mediaRecorderRef.current = new MediaRecorder(
      webCamRef.current?.stream as MediaStream,
      {
        mimeType: 'video/webm',
      },
    );
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable,
    );
    mediaRecorderRef.current.start();
  }, [handleDataAvailable]);

  const stopCapture = React.useCallback(() => {
    setIsRecording(false);
    mediaRecorderRef.current?.stop();
  }, []);

  React.useEffect(() => {
    let ignore = false;
    if (!isRecording && recordedVideo.length > 0) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        if (ignore) return;
        setPreviewVideo(fileReader.result as string);
        setValue(name, fileReader.result);
      };
      const blob = new Blob(recordedVideo, {
        type: 'video/webm',
      });
      fileReader.readAsDataURL(blob);
    }
    return () => {
      ignore = true;
    };
  }, [recordedVideo, isRecording, setValue, name]);

  const recorderElement = (
    <>
      <Webcam audio={false} ref={webCamRef} />
      {!isRecording ? (
        <Button variant="outlined" onClick={startCapture}>
          Start Recording <FiberManualRecord />{' '}
        </Button>
      ) : (
        <Button variant="outlined" onClick={stopCapture}>
          Stop Recording <StopRounded />
        </Button>
      )}
    </>
  );
  const previewElement = (
    <>
      <video src={previewVideo} autoPlay controls />
      <Button
        color="primary"
        onClick={() => {
          setPreviewVideo(undefined);
          setRecordedVideo([]);
          setValue(name, '');
        }}
      >
        Delete
      </Button>{' '}
      video.
      <input
        {...register(name)}
        accept="video/*"
        id="upload-video"
        style={{ display: 'none' }}
        multiple
        type="text"
      />
    </>
  );
  return !previewVideo ? recorderElement : previewElement;
};

export default CaptureVideo;
