import React, {useState} from 'react'
import { useTheme, Box, Typography, Button, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper, Table, TablePagination } from '@mui/material'
import { convertDatabaseDateToReadableDate } from 'helpers';
import { useGetRFPRequestsByShipperIDQuery } from 'state/api';
import { useSelector } from 'react-redux';

const columns = [
  { field: 'id', label: 'RFP Req No.', width: 40 },
  { field: 'carrier', label: 'Carrier', width: 130 },
  { field: 'status', label: 'Status', width: 130 },
  { field: 'request_date', label: 'Request Date', width: 130 },
  { field: 'last_update_date', label: 'Last Update', width: 130 },
];

const AllContractsTab = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const shipperID = useSelector(state => state.global.shipperID);
  console.log("shipperID: ", shipperID);
  const { data, isLoading } = useGetRFPRequestsByShipperIDQuery(shipperID);
  console.log("RFPs data", data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box>
      <TableContainer sx={{ mt: "3rem" }} component={Paper}>
        <Table sx={{ minWidth: "650px" }} aria-label="all requests table" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ width: column.width }}
                  sx={{fontSize: "14px", fontWeight: "600"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {data && !isLoading ? (
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{fontSize: "14px"}} component="th" scope="row">
                    {row.RFPRequestID}
                  </TableCell>
                  <TableCell sx={{fontSize: "14px"}} align="left">{row.vendorName}</TableCell>
                  <TableCell sx={{fontSize: "14px"}} align="left">{row.RFPRequestStatus}</TableCell>
                  <TableCell sx={{fontSize: "14px"}} align="left">{convertDatabaseDateToReadableDate(row.createdAt)}</TableCell>
                  <TableCell sx={{fontSize: "14px"}} align="left">{convertDatabaseDateToReadableDate(row.updatedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <>Loading...</>
          )}
        </Table>
      </TableContainer>
      {data && !isLoading ? (
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      ) : (
        <></>
      )}
    </Box> 
  )
}

export default AllContractsTab
