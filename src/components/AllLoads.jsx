import React, { useState, useEffect } from 'react';
import { useTheme, Box, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper, Table, IconButton } from '@mui/material';
import { useGetAllLoadsQuery } from 'state/api';
import { useNavigate } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const columns = [
  { field: 'shipperID.name', label: 'Shipper Name' },
  { field: 'origin_city', label: 'Origin City' },
  { field: 'origin_state', label: 'Origin State' },
  { field: 'destination_city', label: 'Destination City' },
  { field: 'destination_state', label: 'Destination State' },
  { field: 'freight_type', label: 'Freight Type' },
  { field: 'pick_up_date', label: 'Pick-up Date' },
  { field: 'delivery_date', label: 'Delivery Date' },
  { field: 'rate', label: 'Rate' },
  { field: 'payment_term', label: 'Payment Term' }
];

const getValueByPath = (obj, path) => {
  return path.split('.').reduce((o, p) => (o ? o[p] : null), obj);
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AllLoadstabs = ({ shouldRefresh, onRefreshDone }) => {
  const theme = useTheme();
  const { data, isLoading, refetch } = useGetAllLoadsQuery();
  const navigate = useNavigate();

  // Sorting Logic
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(columns[0].field);

  const sortedData = data?.slice().sort((a, b) => {
    const aValue = getValueByPath(a, orderBy);
    const bValue = getValueByPath(b, orderBy);
    let comparison = 0;
    if (aValue < bValue) {
      comparison = -1;
    } else if (aValue > bValue) {
      comparison = 1;
    }
    return order === 'asc' ? comparison : -comparison;
  });

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
    <Box sx={{ mt: 3 }}>
      <TableContainer component={Paper}>
        <Table aria-label="loads table" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align="left"
                  sx={{ fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                  onClick={() => handleSort(column.field)}
                >
                  <Box display="flex" alignItems="center">
                    {column.label}
                    {orderBy === column.field ? (
                      order === 'asc' ? <ArrowUpwardIcon fontSize="inherit" sx={{ ml: 1 }} /> : <ArrowDownwardIcon fontSize="inherit" sx={{ ml: 1 }} />
                    ) : (
                      <ArrowUpwardIcon fontSize="inherit" style={{opacity: 0.5}} sx={{ ml: 1 }} />
                    )}
                  </Box>
                </TableCell>
              ))}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          {sortedData && !isLoading ? (
            <TableBody>
              {sortedData.map((load) => (
                <TableRow key={load._id}>
                  {columns.map((column) => {
                    let value = getValueByPath(load, column.field);
                    if (column.field === 'pick_up_date' || column.field === 'delivery_date') {
                      value = formatDate(value);
                    }
                    return (
                      <TableCell key={column.field} sx={{ fontSize: "14px" }} align="left">
                        {value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <IconButton onClick={() => navigate(`/load-details/${load._id}`)}>
                      <ArrowForwardIcon sx={{color: "#2DBFFD"}}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
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
      </TableContainer>
    </Box>
  );
};

export default AllLoadstabs;
