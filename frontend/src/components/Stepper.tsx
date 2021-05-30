import * as React from 'react';
import {
  Button,
  Grid,
  Stepper as MuiStepper,
  Paper,
  Step,
  StepLabel,
} from '@material-ui/core';

type StepperContextType = {
  isInitialStep?: boolean;
  isFinalStep?: boolean;
  nextStep?: () => void;
  prevStep?: () => void;
};

export const StepperContext = React.createContext<StepperContextType>({});

type StepperProps = {
  /**
   * should be set to true when steps are controlled by another compoenent using StepperContext
   * @default false
   */
  controlled?: boolean;
};

const Stepper: React.FC<StepperProps> = ({ children, controlled = false }) => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const [activeStepContent, childrenLength] = React.useMemo(() => {
    const step = React.Children.toArray(children).filter(
      (_, i) => i === activeStep,
    );
    const length = React.Children.count(children);
    return [step, length];
  }, [activeStep, children]);

  const nextStep = React.useCallback(() => {
    setActiveStep((state) => state + 1);
  }, []);
  const prevStep = React.useCallback(() => {
    setActiveStep((step) => step - 1);
  }, []);

  const isInitialStep = activeStep === 0;
  const isFinalStep = activeStep === childrenLength;
  return (
    <StepperContext.Provider
      value={{
        isInitialStep,
        isFinalStep,
        nextStep,
        prevStep,
      }}
    >
      <Grid
        direction="column"
        justify="center"
        alignItems="center"
        style={{ padding: '50px' }}
      >
        <Grid item>
          <MuiStepper activeStep={activeStep}>
            {Array.from({ length: childrenLength }).map((_, i) => (
              <Step key={i}>
                <StepLabel />
              </Step>
            ))}
          </MuiStepper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: '50px' }}>{activeStepContent}</Paper>
        </Grid>
        {!controlled && (
          <Grid container item justify="flex-end" spacing={2}>
            {!isInitialStep && (
              <Grid item>
                <Button
                  variant="outlined"
                  color="default"
                  onClick={() => {
                    isFinalStep ? setActiveStep(0) : prevStep();
                  }}
                >
                  {isFinalStep ? 'Reset' : 'Back'}
                </Button>
              </Grid>
            )}
            {!isFinalStep && (
              <Grid item>
                <Button
                  variant="outlined"
                  color="default"
                  onClick={() => {
                    nextStep();
                  }}
                >
                  Next
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </StepperContext.Provider>
  );
};

export default Stepper;
