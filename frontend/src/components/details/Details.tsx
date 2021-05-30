import * as React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { match as RMatch } from 'react-router';
import { useFeedbacks } from '../../hooks/useFeedbacks';

type DetailsProps = {
  match: RMatch<{
    id: string;
  }>;
};

const Details: React.FC<DetailsProps> = () => {
  const [feedbacks] = useFeedbacks();
  return (
    <Grid container direction="column" style={{ padding: '50px' }} spacing={5}>
      {feedbacks ? (
        feedbacks.map((feedback) => (
          <Grid key={feedback.id} item>
            <Paper style={{ padding: '20px' }}>
              {JSON.stringify(feedback)}
            </Paper>
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
