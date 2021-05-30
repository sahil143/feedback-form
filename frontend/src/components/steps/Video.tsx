import * as React from 'react';
import * as yup from 'yup';
import { Button, FormHelperText } from '@material-ui/core';
import { FormStateContext } from '../../hooks';
import { REQUIRED } from '../../const';
import { useFormContext } from 'react-hook-form';
import CaptureVideo from '../video/CaptureVideo';
import FormWrapper from '../FormWrapper';
import UploadVideo from '../video/UploadVideo';

const videoValidationSchema = yup.object({
  video: yup.string().required(REQUIRED),
});

const Video: React.FC = () => {
  const {
    setValue,
    formState: { errors, touchedFields },
  } = useFormContext();
  const [isUploadEnabled, setUploadEnabled] = React.useState<boolean>(true);
  return (
    <>
      {isUploadEnabled ? (
        <UploadVideo name="video" />
      ) : (
        <CaptureVideo name="video" />
      )}{' '}
      or{' '}
      <Button
        color="primary"
        onClick={() => {
          setUploadEnabled((toggle) => !toggle);
          setValue('video', '');
        }}
      >
        {isUploadEnabled ? 'Capture' : 'Upload'}
      </Button>{' '}
      a new video.
      {!!errors['video'] && !!touchedFields['video'] ? (
        <FormHelperText error>{errors['video'].message}</FormHelperText>
      ) : undefined}
    </>
  );
};

const VideoForm: React.FC = () => {
  const { formState, setFormState } = React.useContext(FormStateContext);
  return (
    <FormWrapper
      onSubmit={(data) => {
        if (data) {
          setFormState?.((prevState) => ({ ...prevState, ...data }));
        }
      }}
      defaultValues={{ ...formState }}
      validationSchema={videoValidationSchema}
      submitLabel="Next"
      cancelLabel="Back"
      stepperForm
    >
      <Video />
    </FormWrapper>
  );
};

export default VideoForm;
