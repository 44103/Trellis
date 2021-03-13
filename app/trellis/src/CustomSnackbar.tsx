import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const CustomSnackbar = (props: {
  open: boolean; handleClose: (event?: React.SyntheticEvent, reason?: string) => void; type: "success" | "info" | "warning" | "error"; message: string
}) => {
  const { open, handleClose, type, message } = props;

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default CustomSnackbar;