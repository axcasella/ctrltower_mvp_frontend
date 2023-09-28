import React from 'react'
import { useTheme, Box, Typography, Button, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper, Table } from '@mui/material'

import ErrorIcon from '@mui/icons-material/Error';

const createRenewalData = (service, cost, requester, dueDate) => {
  return { service, cost, requester, dueDate };
}

const MyApprovalsTab = ({value, index}) => {
  const theme = useTheme();

  const upcomingRenewalRows = [
    createRenewalData('Transportation', "$120,000", "Holly Flax", "Jun 15 2022"),
    createRenewalData('Transportation', "$120,000", "Holly Flax", "Jun 15 2022"),
  ];

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "650px" }} aria-label="renewal table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontSize: "14px", fontWeight: "600"}}>Service</TableCell>
              <TableCell sx={{fontSize: "14px", fontWeight: "600"}} align="left">Cost</TableCell>
              <TableCell sx={{fontSize: "14px", fontWeight: "600"}} align="left">Requester</TableCell>
              <TableCell sx={{fontSize: "14px", fontWeight: "600"}} align="left">Due Date</TableCell>
              <TableCell sx={{fontSize: "14px", fontWeight: "600"}} align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcomingRenewalRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{fontSize: "14px"}} component="th" scope="row">
                  {row.service}
                </TableCell>
                <TableCell sx={{fontSize: "14px"}} align="left">{row.cost}</TableCell>
                <TableCell sx={{fontSize: "14px"}} align="left">{row.requester}</TableCell>
                <TableCell sx={{fontSize: "14px"}} align="left">
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    {row.dueDate}
                    <ErrorIcon sx={{ml: "0.25rem", fontSize: "16px", color: "#DC2626"}}/>
                  </Box>
                </TableCell>
                <TableCell>
                  <Button variant="contained" sx={{border: `1px solid ${theme.palette.primary[100]}`, fontSize: "13px", boxShadow: "none", textTransform: "none"}}>Renew/Upgrade</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box> 
  )
}

export default MyApprovalsTab
