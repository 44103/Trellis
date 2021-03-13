import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthForm from "./AuthForm";
import EditForm from "./EditForm";
import { Auth, FormModel, SnackbarState, WebhookItem } from "./types";
import WebhookList from "./WebhookList";
import queryString from "query-string";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles, Theme, createStyles, CircularProgress } from "@material-ui/core";
import CustomSnackbar from "./CustomSnackbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const FormContainer = () => {
  const classes = useStyles();
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false, type: "info", message: ""
  });
  const [visible, setVisible] = useState(false);
  const handleClose = () => setBackdropOpen(false);
  const handleOpen = () => setBackdropOpen(true);
  const [auth, setAuth] = useState<Auth>({
    apiKey: "", token: ""
  });
  const [rows, setRows] = useState<WebhookItem[]>([]);
  const handleCloseSnackbar = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarState({ ...snackbarState, open: false });
  }

  useEffect(() => {
    if (!(auth.apiKey && auth.token)) return;
    handleReadWebhook(true);
    setVisible(true);
    // if auth is correct value, this effect work.
    // eslint-disable-next-line
  }, [auth]);

  const handleCreateWebhook = (data: FormModel) => {
    const { apiKey, token } = auth;
    handleOpen();
    const url = queryString.stringifyUrl({
      url: `https://api.trello.com/1/tokens/${token}/webhooks`,
      query: {
        key: apiKey,
        token: token,
        ...data
      }
    });
    axios
      .post(url)
      .then(res => {
        handleReadWebhook();
        setSnackbarState({
          open: true,
          type: "success",
          message: "Success Created!"
        });
      })
      .catch(err => {
        handleClose();
        setSnackbarState({
          open: true,
          type: "error",
          message: "Failure Created!"
        });
      });
  }

  const handleReadWebhook = (isFirst: boolean = false) => {
    const { apiKey, token } = auth;
    handleOpen();
    axios
      .get(`https://api.trello.com/1/tokens/${token}/webhooks`, {
        params: {
          key: apiKey
        }
      })
      .then(res => {
        setRows(res.data);
        handleClose();
        if (isFirst)
          setSnackbarState({
            open: true,
            type: "success",
            message: "Success Loaded!"
          });
      })
      .catch(err => {
        handleClose();
        if (isFirst)
          setSnackbarState({
            open: true,
            type: "error",
            message: "Failure Loaded!"
          });
        setVisible(false);
      });
  }

  const handleUpdateWebhook = (data: FormModel) => {
    const { apiKey, token } = auth;
    const { id, ...others } = data;
    handleOpen();
    const url = queryString.stringifyUrl({
      url: `https://api.trello.com/1/webhooks/${id}`,
      query: {
        key: apiKey,
        token: token,
        ...others
      }
    });
    axios
      .put(url)
      .then(res => {
        handleReadWebhook();
        handleClose();
        setSnackbarState({
          open: true,
          type: "success",
          message: "Success Updated!"
        });
      })
      .catch(err => {
        handleClose();
        setSnackbarState({
          open: true,
          type: "error",
          message: "Failure Updated!"
        });
      });
  }

  const handleDeleteWebhook = (idWebhook: string) => {
    const { apiKey, token } = auth;
    handleOpen();
    const url = queryString.stringifyUrl({
      url: `https://api.trello.com/1/tokens/${token}/webhooks/${idWebhook}`,
      query: {
        key: apiKey,
        token: token
      }
    });
    axios
      .delete(url)
      .then(res => {
        handleReadWebhook();
        handleClose();
        setSnackbarState({
          open: true,
          type: "success",
          message: "Success Deleted!"
        });
      })
      .catch(err => {
        handleClose();
        setSnackbarState({
          open: true,
          type: "error",
          message: "Failure Deleted!"
        });
      });
  }

  return (
    <>
      <AuthForm setAuth={setAuth} />
      {visible
        ?
        <>
          <EditForm create={handleCreateWebhook} />
          <WebhookList
            update={handleUpdateWebhook}
            delete={handleDeleteWebhook}
            rows={rows} />
        </>
        : <></>}

      <Backdrop className={classes.backdrop} open={backdropOpen} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <CustomSnackbar
        open={snackbarState.open}
        handleClose={handleCloseSnackbar}
        type={snackbarState.type}
        message={snackbarState.message} />
    </>
  );
}

export default FormContainer;