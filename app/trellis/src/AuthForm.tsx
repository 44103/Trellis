import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
  text: {
    marginLeft: 20,
    width: 700
  },
  button: {
    margin: 20
  }
}));

const AuthForm = (props: { setAuth: Function }) => {
  const classes = styles();
  const { setAuth } = props;
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => setAuth(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={classes.text}
        label="Token"
        name="token"
        fullWidth
        inputRef={register({ required: true, pattern: /^[0-9a-fA-F]{64}$/ })}
        error={Boolean(errors.token)}
        helperText={errors.token && "Token required 64 chars."}
      />
      <TextField
        className={classes.text}
        label="API Key"
        name="apiKey"
        fullWidth
        inputRef={register({ required: true, pattern: /^[0-9a-fA-F]{32}$/ })}
        error={Boolean(errors.apiKey)}
        helperText={errors.apiKey && "API Key required 32 chars."}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AuthForm;
