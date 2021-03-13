import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TextField from '@material-ui/core/TextField';
import { FormModel, WebhookItem } from './types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { green, red } from "@material-ui/core/colors";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const Row = (props: { delete: Function; update: Function; row: WebhookItem }) => {
  const { row } = props;

  const handleUpdateWebhook = props.update;
  const handleDeleteWebhook = props.delete;
  const { register, handleSubmit, errors } = useForm<FormModel>();
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const onSubmit = (data: FormModel) => handleUpdateWebhook(data);

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell align="center">
          {row.active
            ? <CheckCircleOutlineIcon style={{ color: green[500] }} />
            : <RemoveCircleOutlineIcon style={{ color: red[500] }} />}
        </TableCell>
        <TableCell align="right">{row.consecutiveFailures}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container alignItems="center" justify="center">
                <Grid item xs={10}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      name="id"
                      ref={register({ required: true })}
                      style={{ display: "none" }}
                      defaultValue={row.id} />
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      inputRef={register({ required: false })}
                      defaultValue={row.description} />
                    <TextField
                      fullWidth
                      label="Callback URL (Required)"
                      name="callbackURL"
                      inputRef={register({ required: true })}
                      error={Boolean(errors.callbackURL)}
                      helperText={errors.callbackURL && "Required."}
                      defaultValue={row.callbackURL} />
                    <TextField
                      fullWidth
                      label="ID Model (Required)"
                      name="idModel"
                      inputRef={register({ required: true, pattern: /^[0-9a-fA-F]{24}$/ })}
                      error={Boolean(errors.idModel)}
                      helperText={errors.idModel && "ID Model required 24 chars."}
                      defaultValue={row.idModel} />
                    <IconButton type="submit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteWebhook(row.id)}>
                      <DeleteIcon style={{ color: red['A400'] }} />
                    </IconButton>
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;