import * as React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { useFeedbacks } from '../../hooks/useFeedbacks';
import DetailItem from './DetailItem';

const Details: React.FC = () => {
  const [feedbacks] = useFeedbacks();
  return (
    <Grid container direction="column" style={{ padding: '50px' }} spacing={5}>
      {feedbacks ? (
        feedbacks.map((feedback) => (
          <Grid key={feedback.id} item>
            <DetailItem feedback={feedback} />
          </Grid>
        ))
      ) : (
        <Grid item>
          <Paper style={{ padding: '20px' }}>No Feedback Available</Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default Details;
