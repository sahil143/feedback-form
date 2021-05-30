import * as React from 'react';
import { Button } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

type UploadVideoProps = {
  /** key to be registered using react-hook-form `register` method */
  name: string;
  /**
   * label to show on the Upload button
   * @default 'Upload video'
   */
  label?: string;
};

const UploadVideo: React.FC<UploadVideoProps> = ({
  name,
  label = 'Upload video',
}) => {
  const { register, setValue } = useFormContext();

  const [previewVideo, setPreviewVideo] = React.useState<string>();
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target?.files?.[0]) return;
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewVideo(fileReader.result as string);
        setValue(name, fileReader.result);
      };
      fileReader.readAsDataURL(e.target?.files?.[0] as Blob);
    },
    [setPreviewVideo, setValue, name],
  );
  return (
    <>
      <input
        onChange={handleChange}
        accept="video/*"
        id="upload-video"
        style={{ display: 'none' }}
        multiple
        type="file"
      />
      {/* dummy component to hook the base64 value to form */}
      <input {...register(name)} style={{ display: 'none' }} type="text" />
      {previewVideo ? (
        <>
          <video src={previewVideo} autoPlay controls />
          <Button
            color="primary"
            onClick={() => {
              setPreviewVideo(undefined);
              setValue(name, '');
            }}
          >
            Clear
          </Button>{' '}
          this video
        </>
      ) : (
        <label htmlFor="upload-video">
          <Button variant="outlined" color="primary" component="span">
            {label}
          </Button>
        </label>
      )}
    </>
  );
};

export default UploadVideo;
