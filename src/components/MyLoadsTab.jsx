import React, { useState, useEffect } from 'react';
import { useTheme, Box, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper, Table, Button } from '@mui/material';
import { useGetLoadsByShipperIDQuery } from 'state/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const columns = [
  { field: '_id', label: 'Load ID' },
  { field: 'reference_number', label: 'Reference No.' },
  { field: 'origin_city', label: 'Origin City' },
  { field: 'origin_state', label: 'Origin State' },
  { field: 'destination_city', label: 'Destination City' },
  { field: 'destination_state', label: 'Destination State' },
  { field: 'freight_type', label: 'Freight Type' },
  { field: 'rate', label: 'Rate' },
  { field: 'payment_term', label: 'Payment Term' }
];

const MyLoadsTab = ({ shouldRefresh, onRefreshDone }) => {
  const theme = useTheme();
  const shipperID = useSelector(state => state.global.shipperID);
  const { data, isLoading, refetch } = useGetLoadsByShipperIDQuery(shipperID);
  console.log(shipperID);
  console.log(data);
  const navigate = useNavigate();

  // Sorting Logic
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(columns[0].field);

  const sortedData = data?.slice().sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
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
                  {columns.map((column) => (
                    <TableCell key={column.field} sx={{ fontSize: "14px" }} align="left">
                      {load[column.field]}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    onClick={() => navigate(`/load-details/${load._id}`)}
                    sx={{ 
                      backgroundColor: theme.palette.primary[100], 
                      color: "white", 
                      fontSize: "12px", 
                      boxShadow: "none", 
                      width: "8rem" 
                    }}>
                    See More
                  </Button>
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

export default MyLoadsTab;
