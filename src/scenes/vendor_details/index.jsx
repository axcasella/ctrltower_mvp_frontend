import { Search } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Typography, Box, useTheme, Stack,
  Chip, InputBase, IconButton, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import FlexBetween from 'components/FlexBetween';
import { useParams } from 'react-router-dom';
import { useGetVendorByIDQuery } from "state/api";
import { useSelector } from "react-redux";


const VendorDetails = () => {
  const { id } = useParams();

  const shipperID = useSelector(state => state.global.shipperID);

  const { data, isLoading } = useGetVendorByIDQuery({vendorID: id, shipperID});
  console.log("vendor detail data", data);

  // useEffect(() => {
  //   setPageName(pathname.substring(1));
  // }, [pathname]);

  const theme = useTheme();
  const [question, askQuestion] = useState("");
  const [requestBtn, subRequest] = useState("");

  return (
    <Box
    sx={{
      padding: "1.5rem",
      backgroundColor: theme.palette.grey[100],
      minHeight: "100vh",}}
    >
      <Box 
        m="1rem 0.5rem"
        sx={{
          backgroundColor: "#ffffff",
          padding: "1.5rem",   
          borderRadius: "0.55rem",
          minHeight: "80vh"
        }}>
          {data || !isLoading ? (
            <Box> 
              <Box sx={{ mb: "25px" }}>
                <FlexBetween>
                  <Typography
                    variant="h3"
                    color={theme.palette.grey[1000]}
                    fontWeight="bold"
                    sx={{ mb: "5px" }}
                  >
                    {data.name}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    {data.tags.map((tag) => (
                      <Chip label={tag} 
                        sx={{
                          height: "2rem",
                          borderRadius: "10px",
                          color: theme.palette.grey[1000],
                          fontSize: "1.1rem",
                          backgroundColor: theme.palette.grey[100],
                      }} />
                    ))}
                  </Stack>
                </FlexBetween>    
              </Box>

              <Box sx={{mb: "1rem"}}>
                <Typography color={theme.palette.grey[1000]} variant="h5">
                  {data.description}
                </Typography>
              </Box>

              <Box>
                <FlexBetween>
                  <Box>
                      <Box
                        sx = {{
                          textAlign: "center",
                          alignItems: "center",
                          boxSizing: "border-box",
                          border: "1px solid lightgrey",
                          borderRadius: "0.55rem",
                          padding: "1.5rem",
                          backgroundColor: theme.palette.grey[0],
                          m: "1rem"
                        }}
                      >
                        <Box>
                          <Typography variant="h5" sx={{mb: "0.5rem"}}>
                            VESTIMATE CONTRACT PRICE
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="h4" fontWeight="bold" sx={{mb: "0.5rem"}}>
                            ${data.shipperStats.vestimateLowerRange}K - ${data.shipperStats.vestimateUpperRange}K
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="h5">
                            per year
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box>
                        <FlexBetween>
                          <Box sx={{
                            textAlign: "center",
                            alignItems: "center",
                            boxSizing: "border-box",
                            border: "1px solid lightgrey",
                            borderRadius: "0.55rem",
                            padding: "1.5rem",
                            backgroundColor: theme.palette.grey[0],
                            height: "7rem",
                            m: "0.5rem"
                          }}>
                            <Typography sx={{fontSize: "13px", mb: "0.5rem"}}>
                              VEST.CLOSE TIME
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              {data.shipperStats.vestimateCloseTime} Days
                            </Typography>
                          </Box>
                          <Box sx={{
                            textAlign: "center",
                            alignItems: "center",
                            boxSizing: "border-box",
                            border: "1px solid lightgrey",
                            borderRadius: "0.55rem",
                            padding: "1.5rem",
                            backgroundColor: theme.palette.grey[0],
                            height: "7rem",
                            m: "0.5rem"
                          }}>
                            <Typography sx={{fontSize: "13px", mb: "0.5rem"}}>
                              VEST.SAVINGS
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {data.shipperStats.vestimateSavings}%
                            </Typography>
                          </Box>
                          <Box sx={{
                            textAlign: "center",
                            alignItems: "center",
                            boxSizing: "border-box",
                            border: "1px solid lightgrey",
                            borderRadius: "0.55rem",
                            padding: "1.5rem",
                            backgroundColor: theme.palette.grey[0],
                            height: "7rem",
                            m: "0.5rem"
                          }}>
                            <Typography sx={{fontSize: "13px", mb: "0.5rem"}}>
                              VEST.MKT.SHARE
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {data.shipperStats.vestimateMarketShare}%
                            </Typography>
                          </Box>
                        </FlexBetween>
                      </Box>
                  </Box>

                  <Box 
                    sx = {{
                      textAlign: "center",
                      alignItems: "center",
                      boxSizing: "border-box",
                      border: "1px solid lightgrey",
                      borderRadius: "0.55rem",
                      padding: "1.5rem",
                      backgroundColor: theme.palette.grey[0],
                      alignSelf: "stretch",
                      m: "1rem",
                      mb: "0.5rem"
                    }}>
                    <Box>
                      <Typography variant="h4" sx={{textAlign: "left", mb: "1rem"}}>
                        Compliance
                      </Typography>
                    </Box>
                      
                    <Box>
                      <FlexBetween>
                        <Box sx={{m: "1rem"}}>
                          <Typography variant="h4" sx={{mb: "1rem"}}>
                            SAFER Verification
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {data.complianceInfo.safer_fmcsa.safety_rating === "S" ? "Satisfactory" : "Unsatisfactory"}
                          </Typography>
                        </Box>

                        <Box sx={{m: "1rem"}}>
                          <Typography variant="h4" sx={{mb: "1rem"}}>
                            D&B Verification
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            Passed
                          </Typography>
                        </Box>
                      </FlexBetween>
                    </Box>
                  </Box>
                </FlexBetween>
              </Box>

              <Box sx={{mt: "2rem"}}>
                <FlexBetween sx = {{ 
                  justifyContent: "center",
                }}>
                  <Stack spacing={2} direction="row">
                    <Button variant="contained" sx={{border: `1px solid ${theme.palette.primary[100]}`, fontSize: "1rem", boxShadow: "none"}}>Ask a Question</Button>
                    <Button variant="contained" sx={{backgroundColor: theme.palette.primary[100], color: "white", fontSize: "1rem", boxShadow: "none"}}>Submit Request</Button>
                  </Stack>
                </FlexBetween>
              </Box>
            </Box>
          ) : (
            <>Loading...</>
          )}
      </Box>
    </Box>
  );
};

export default VendorDetails
