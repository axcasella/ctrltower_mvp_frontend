import React from 'react'
import { Typography, Box, useTheme, Button, LinearProgress, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper, Table, Stack, Chip } from "@mui/material";
import DashboardPageHeader from 'components/DashboardPageHeader';
import FlexBetween from 'components/FlexBetween';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ErrorIcon from '@mui/icons-material/Error';

const createRenewalData = (service, cost, requester, dueDate) => {
  return { service, cost, requester, dueDate };
}

const createPipelineDueData = (service, dueDate) => {
  return { service, dueDate };
}

const Dashboard = () => {
  const theme = useTheme();

  const upcomingRenewalRows = [
    createRenewalData('Transportation', "$120,000", "Holly Flax", "Jun 15 2022"),
    createRenewalData('Transportation', "$120,000", "Holly Flax", "Jun 15 2022"),
  ];

  const negotiationPipelineRows = [
    createPipelineDueData('Warehousing', "June 15 2022"),
    createPipelineDueData('Inventory', "June 15 2022"),
    createPipelineDueData('Last-Mile Fulfillment', "June 15 2022"),
  ];

  const tags = ["Tag"];
  
  return (
    <Box
      sx={{
      padding: "1.5rem",
      backgroundColor: theme.palette.grey[100],
      minHeight: "100vh",}}
    >
      <DashboardPageHeader/>
      
      <FlexBetween gap="2rem">
        <Box sx={{
          backgroundColor: "#ffffff",
          p: "1.5rem",
          borderRadius: "0.75rem",
          height: "12rem",
          width: "45rem"
          }}>
          <FlexBetween gap="1rem">
            <Box>
              <Typography fontSize="18px" fontWeight="600">Total Savings</Typography>
              <Typography fontSize="32px" fontWeight="600" color="#16A34A">$ 3,401,800</Typography>
            </Box>
            <Box sx={{alignItems: "left"}}>
              <Typography fontSize="18px" fontWeight="600">Total Spend Under Management</Typography>
              <Typography fontSize="32px" fontWeight="600">$ 12,556,000</Typography>
            </Box>
          </FlexBetween>
          <Typography fontSize="15px" mt="1rem">Avg savings <span style={{fontSize: "12px", color: "#16A34A"}}>+32%</span></Typography>
        </Box>

        <Box sx={{
          backgroundColor: "#ffffff",
          p: "1.5rem",
          borderRadius: "0.75rem",
          height: "12rem",
          width: "45rem"
          }}>
          <FlexBetween>
            <Typography fontSize="18px" fontWeight="600">Savings Summary - 2022/2023</Typography>
            <Typography fontSize="15px" >ROI - 2.2x</Typography>            
          </FlexBetween>
          <Typography fontSize="15px" mt="2rem">Guaranteed savings - $1,500,000</Typography>
          <Box sx={{ mt: "0.5rem" }}>
            <LinearProgress variant="determinate" value={150} 
              sx={{
                backgroundColor: '#d6f3ff',
                height: "1rem",
                borderRadius: "0.5rem",
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#2DBFFD'
                }
              }}/>
          </Box>
          <Typography fontSize="15px" mt="0.5rem" fontWeight="600" textAlign="right">Actual savings - $3,401,800</Typography>
        </Box>
      </FlexBetween>

      <FlexBetween gap="2rem" mt="2rem">
          <Box sx={{
            backgroundColor: "#ffffff",
            p: "1.5rem",
            borderRadius: "0.75rem",
            height: "23rem",
            width: "65rem"
            }}>
              <FlexBetween>
                <Typography fontSize="16px" fontWeight="600">Upcoming Renewals</Typography>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  
                }}>
                  <Typography fontSize="14px" color="#26A0D5">View All</Typography>
                  <ArrowForwardIcon sx={{ml: "0.25rem", fontSize: "14px", fontWeight: "bold", color: "#26A0D5"}}/>
                </Box>
              </FlexBetween>

              <Typography fontSize="14px" mt="1rem" mb="2rem">Subscription that are expiring in next 120 days </Typography>

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

          <Box sx={{
            backgroundColor: "#ffffff",
            p: "1.5rem",
            borderRadius: "0.75rem",
            height: "23rem",
            width: "25rem"
            }}>
              <FlexBetween>
                <Typography fontSize="16px" fontWeight="600">Negotiations Pipeline</Typography>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    
                  }}>
                    <Typography fontSize="14px" color="#26A0D5">View All</Typography>
                    <ArrowForwardIcon sx={{ml: "0.25rem", fontSize: "14px", fontWeight: "bold", color: "#26A0D5"}}/>
                </Box>
              </FlexBetween>

              <Typography fontSize="14px" mt="1rem" mb="2rem">Procurements in negotiations right now </Typography>
              
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: "350px" }} aria-label="pipeline table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{fontSize: "14px", fontWeight: "600"}}>Service</TableCell>
                      <TableCell sx={{fontSize: "14px", fontWeight: "600"}} align="left">Due On</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {negotiationPipelineRows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell sx={{fontSize: "14px", color: "#9CA0AB"}} component="th" scope="row">
                          {row.service}
                        </TableCell>
                        <TableCell sx={{fontSize: "14px", color: "#9CA0AB"}} align="left">{row.dueDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </Box>
      </FlexBetween>
      
      <FlexBetween gap="2rem" mt="2rem">
        <Box sx={{
            backgroundColor: "#ffffff",
            p: "1.5rem",
            borderRadius: "0.75rem",
            height: "23rem",
            width: "28rem"
            }}>
              <FlexBetween>
                <Typography fontSize="16px" fontWeight="600">My Tasks</Typography>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    
                  }}>
                    <Typography fontSize="14px" color="#26A0D5">View All</Typography>
                    <ArrowForwardIcon sx={{ml: "0.25rem", fontSize: "14px", fontWeight: "bold", color: "#26A0D5"}}/>
                </Box>
              </FlexBetween>
              
              <Box>
                <FlexBetween mt="1rem">
                  <Typography fontSize="12px">Warehousing (#0911)</Typography>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {tags.map((tag) => (
                      <Chip label={tag} 
                        sx={{
                          height: "20px",
                          borderRadius: "5px",
                          color: "theme.palette.grey[1000]",
                          fontSize: "10px",
                          minWidth: "50px",
                          backgroundColor: "#F4F5FA",
                      }} />
                    ))}
                  </Stack>
                </FlexBetween>

                <Typography fontSize="14px" fontWeight="600">Upgrade Approval</Typography>

                <FlexBetween>
                  <Typography fontSize="12px">June 15 2022</Typography>
                  
                </FlexBetween>
              </Box>
              
        </Box>

        <Box sx={{
            backgroundColor: "#ffffff",
            p: "1.5rem",
            borderRadius: "0.75rem",
            height: "23rem",
            width: "28rem"
            }}>
              <FlexBetween>
                <Typography fontSize="16px" fontWeight="600">My Tasks</Typography>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    
                  }}>
                    <Typography fontSize="14px" color="#26A0D5">View All</Typography>
                    <ArrowForwardIcon sx={{ml: "0.25rem", fontSize: "14px", fontWeight: "bold", color: "#26A0D5"}}/>
                </Box>
              </FlexBetween>
        </Box>

        <Box sx={{
            backgroundColor: "#ffffff",
            p: "1.5rem",
            borderRadius: "0.75rem",
            height: "23rem",
            width: "28rem"
            }}>
              <FlexBetween>
                <Typography fontSize="16px" fontWeight="600">Recommendation</Typography>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    
                  }}>
                    <Typography fontSize="14px" color="#26A0D5">View All</Typography>
                    <ArrowForwardIcon sx={{ml: "0.25rem", fontSize: "14px", fontWeight: "bold", color: "#26A0D5"}}/>
                </Box>
              </FlexBetween>
        </Box>
      </FlexBetween>
    </Box>
  )
}

export default Dashboard

