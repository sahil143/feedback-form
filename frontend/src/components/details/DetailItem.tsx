import { Paper } from '@material-ui/core';
import * as React from 'react';
import { Feedback } from '../../type';

type DetailItemProps = {
  feedback: Feedback;
};

const DetailItem: React.FC<DetailItemProps> = ({
  feedback: { id, name, email, phone_number, password, video },
}) => {
  return (
    <Paper style={{ padding: '20px' }}>
      <p>Id: {id}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Phone Number: {phone_number}</p>
      <p>Password: {password}</p>
      <video src={video} controls />
    </Paper>
  );
};

export default DetailItem;
