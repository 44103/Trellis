import React from "react";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { FormModel } from "./types";


const styles = makeStyles(() => ({
  paper: {
    margin: 30
  },
  text: {
    marginLeft: 20,
    width: 500
  },
  callbackText: {
    marginLeft: 20,
    width: 700
  },
  button: {
    marginLeft: 20
  }
}));

const EditForm = (props: { create: Function }) => {
  const classes = styles();
  const handleCreateWebhook = props.create;
  const { register, handleSubmit, errors } = useForm<FormModel>();

  const onSubmit = (data: FormModel) => handleCreateWebhook(data);

  return (
    <Paper elevation={3} className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              className={classes.text}
              label="Description"
              name="description"
              inputRef={register({ required: false })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.callbackText}
              label="Callback URL (Required)"
              name="callbackURL"
              inputRef={register({ required: true })}
              error={Boolean(errors.callbackURL)}
              helperText={errors.callbackURL && "Required."}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.text}
              label="ID Model (Required)"
              name="idModel"
              inputRef={register({
                required: true, pattern: /^[0-9a-fA-F]{24}$/
              })}
              error={Boolean(errors.idModel)}
              helperText={errors.idModel && "ID Model required 24 chars."}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              type="submit"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default EditForm;