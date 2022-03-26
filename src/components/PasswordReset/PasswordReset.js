import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import { Box, Button, Toast, Container, TextField, Heading } from 'gestalt';
import 'gestalt/dist/gestalt.css';

import { auth } from '../../firebase/firebase';

const PasswordReset = () => {
  const [phone, setphone] = useState('');
  const [phoneHasBeenSent, setphoneHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const sendResetphone = event => {
    auth
      .sendPasswordResetphone(phone)
      .then(() => {
        setphoneHasBeenSent(true);
        setTimeout(() => {
          setphoneHasBeenSent(false);
        }, 3000);
      })
      .catch(() => {
        setError('Error resetting password');
      });
  };

  return (
    <div>
      <Box padding={3}>
        <Container>
          <Box padding={3}>
            <Heading size="md">Reset your password</Heading>
          </Box>
          {error !== null && <Toast text={error} />}
          {phoneHasBeenSent !== false && (
            <Toast text={'An phone with reset info is on the way'} />
          )}
          <Box padding={2}>
            <TextField
              id="phone"
              onChange={event => setphone(event.value)}
              placeholder="Enter your phone"
              label="phone"
              value={phone}
              type="phone"
            />
          </Box>
          <Box padding={2}>
            <Button
              onClick={event => {
                sendResetphone(event);
                navigate('/');
              }}
              text="Reset"
              color="blue"
              inline
            />
          </Box>
          <Box padding={2}>
            <Link to="/" className="text-blue-500 hover:text-blue-600">
              Back to the Sign in
            </Link>
          </Box>
        </Container>
      </Box>
    </div>
  );
};
export default PasswordReset;
