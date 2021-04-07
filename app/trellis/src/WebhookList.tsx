import {
  Box, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Row from "./EditRow";
import { WebhookItem } from "./types";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const WebhookList = (props: { update: Function; delete: Function; rows: WebhookItem[] }) => {
  const classes = useStyles();

  const handleUpdateWebhook = props.update;
  const handleDeleteWebhook = props.delete;
  const rows = props.rows;

  return (
    <Box p={3}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell width="50%">Description</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="right">Consecutive Failures</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.id}
                row={row}
                delete={handleDeleteWebhook}
                update={handleUpdateWebhook} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default WebhookList;