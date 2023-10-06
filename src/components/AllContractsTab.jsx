import React, { useState, useEffect } from 'react';
import {
  useTheme, Box, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper, Table, TablePagination, Button
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { convertDatabaseDateToReadableDate } from 'helpers';
import { useGetRFPRequestsByShipperIDQuery } from 'state/api';
import { useSelector } from 'react-redux';

const columns = [
  { field: '_id', label: 'RFP Req No.' },
  { field: 'vendorName', label: 'Carrier' },
  { field: 'RFPRequestStatus', label: 'Status' },
  { field: 'createdAt', label: 'Request Date' },
  { field: 'updatedAt', label: 'Last Update' },
];

const AllContractsTab = ({ shouldRefresh, onRefreshDone }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState(columns[0].field);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const rowsPerPage = 5;

  const shipperID = useSelector(state => state.global.shipperID);
  const { data, isLoading, refetch } = useGetRFPRequestsByShipperIDQuery(shipperID);
  console.log(shipperID);
  console.log(data);

  const sortedData = data?.slice().sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    return order === 'asc' ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setOrderBy(field);
      setOrder('asc');
    }
  };

  useEffect(() => {
    if (shouldRefresh) {
      refetch();
      onRefreshDone();
    }
  }, [shouldRefresh, refetch, onRefreshDone]);

  return (
    <Box>
      <TableContainer sx={{ mt: "3rem" }} component={Paper}>
        <Table sx={{ minWidth: "650px" }} aria-label="all requests table" stickyHeader>
          <TableHead>
            <TableRow>
            {columns.map((column) => (
              <TableCell
                  key={column.field}
                  align="left"
                  sx={{ fontSize: "14px", fontWeight: "600" }}
                >
                  {column.label}
                  {orderBy === column.field ? (
                    order === 'asc' ? 
                      <ArrowUpwardIcon fontSize="inherit" sx={{ ml: 1, cursor: "pointer" }} onClick={() => handleSort(column.field)} /> :
                      <ArrowDownwardIcon fontSize="inherit" sx={{ ml: 1, cursor: "pointer" }} onClick={() => handleSort(column.field)} />
                  ) : (
                    <ArrowDownwardIcon fontSize="inherit" style={{ opacity: 0.5 }} sx={{ ml: 1, cursor: "pointer" }} onClick={() => handleSort(column.field)} />
                  )}
                </TableCell>
              ))}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          {sortedData && !isLoading ? (
            <TableBody>
              {sortedData.map((row) => (
                <>
                  <TableRow key={row._id}>
                    <TableCell>{row._id}</TableCell>
                    <TableCell>{row.vendorName}</TableCell>
                    <TableCell>{row.RFPRequestStatus}</TableCell>
                    <TableCell>{convertDatabaseDateToReadableDate(row.createdAt)}</TableCell>
                    <TableCell>{convertDatabaseDateToReadableDate(row.updatedAt)}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => setExpandedRowId(expandedRowId === row._id ? null : row._id)}
                        sx={{
                          border: "1px solid",
                          borderColor: theme.palette.primary[100],
                          color: theme.palette.primary[100],
                          fontSize: "10px",
                          fontWeight: "bold",
                          boxShadow: "none",
                          '&:hover': {
                            color: "#ffffff"
                          }
                        }}
                      >
                        Analytics
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedRowId === row._id && (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1} sx={{ fontSize: "16px" }}>
                          <strong>Demand</strong> - September saw a 20% increase in shipping demand.
                          <br />
                          <strong>Fuel Prices</strong> - In May, diesel prices rose by $0.30/gallon.
                          <br />
                          <strong>Seasonality</strong> -  Upcoming holiday season shipping rates surged by 15%.
                          <br />
                          <strong>Route</strong> - West coast routes saw a 10% rate increase due to congestion.
                          <br />
                          <strong>Condition</strong> - Baby food shipments cost 8% more due to lower availability of reefers around this time of year.
                          <br />
                          <strong>Estimated Cost</strong> -  $2,250 per load
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">Loading...</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        {sortedData && !isLoading && (
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={sortedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        )}
      </TableContainer>
    </Box>
  );
};

export default AllContractsTab;
