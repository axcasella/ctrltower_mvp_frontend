import { Search } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Typography, Box, useTheme, Stack,
  Chip, InputBase, IconButton, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import FlexBetween from 'components/FlexBetween';
import { useParams } from 'react-router-dom';
import { useGetVendorByIDQuery, useGetVendorByUSDOTFromFMCSAQuery } from "state/api";
import { useSelector } from "react-redux";

// Info on fields:
// https://safer.fmcsa.dot.gov/saferhelp.aspx#Inspections
const VendorDetails = () => {
  const { usdot } = useParams();

  const shipperID = useSelector(state => state.global.shipperID);

  const { data, isLoading } = useGetVendorByUSDOTFromFMCSAQuery(usdot);
  console.log("vendor detail data", data);

  const totalDriverInspections = data && parseInt(data.united_states_inspections.driver.inspections || 0)+parseInt(data.canada_inspections.driver.inspections || 0);
  const totalDriverInspectionsFailed = data && parseInt(data.united_states_inspections.driver.out_of_service || 0) + parseInt(data.canada_inspections.driver.out_of_service || 0);
  const totalDriverInspectionsPassed = totalDriverInspections-totalDriverInspectionsFailed;

  const totalVehicleInspections = data && parseInt(data.united_states_inspections.vehicle.inspections || 0)+parseInt(data.canada_inspections.vehicle.inspections || 0);
  const totalVehicleInspectionsFailed = data && parseInt(data.united_states_inspections.vehicle.out_of_service || 0) + parseInt(data.canada_inspections.vehicle.out_of_service || 0);
  const totalVehicleInspectionsPassed = totalVehicleInspections-totalVehicleInspectionsFailed;

  const totalTow = data && parseInt(data.united_states_crashes.tow || 0) + parseInt(data.canada_crashes.tow || 0);
  const totalFatal = data && parseInt(data.united_states_crashes.fatal || 0) + parseInt(data.canada_crashes.fatal || 0);
  const totalInjury = data && parseInt(data.united_states_crashes.injury || 0) + parseInt(data.canada_crashes.injury || 0);
  const totalCrashes = data && parseInt(data.united_states_crashes.total || 0) + parseInt(data.canada_crashes.total || 0);


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
                    {data.dba_name ? data.dba_name : data.legal_name}
                  </Typography>

                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {data.cargo_carried.map((tag) => (
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
              
              <Box>
                <FlexBetween>
                  <Box
                    sx={{minWidth: "45rem", ml: "3rem"}}
                  >
                      <Box
                        sx = {{
                          textAlign: "center",
                          alignItems: "center",
                          boxSizing: "border-box",
                          border: "1px solid lightgrey",
                          borderRadius: "0.55rem",
                          padding: "1.5rem",
                          backgroundColor: theme.palette.grey[0],
                          m: "1rem",
                          mb: "1.5rem"
                        }}
                      > 
                        <Typography variant="h4" sx={{textAlign: "left", mb: "1rem"}} fontWeight="bold">
                          General info
                        </Typography>
                        
                        <Typography variant="h5" sx={{mb: "1rem", textAlign: "left"}}>
                            Legal name: &nbsp;
                            <span style={{fontWeight: "bold"}}>{data.legal_name}</span>
                        </Typography>

                        {data.duns_number ? (
                          <Typography variant="h5" sx={{mb: "1rem", textAlign: "left"}}>
                            Duns number: &nbsp;
                            <span style={{fontWeight: "bold"}}>{data.duns_number}</span>
                        </Typography>
                        ) : (
                          ""
                        )}

                        <FlexBetween>
                          <Typography variant="h5" sx={{mb: "1rem"}}>
                            USDOT: &nbsp;
                            <span style={{fontWeight: "bold"}}>{data.usdot}</span>
                          </Typography>
                          <Typography variant="h5" sx={{mb: "1rem"}}>
                            MC/MX/FF: &nbsp;
                            <span style={{fontWeight: "bold"}}>{data.mc_mx_ff ? data.mc_mx_ff : "Not Available"}</span>
                          </Typography>
                        </FlexBetween>

                        <FlexBetween>
                          <Typography variant="h5" sx={{mb: "1rem"}}>
                            Fleet size: &nbsp;
                            <span style={{fontWeight: "bold"}}>{data.power_units}</span>
                          </Typography>
                          <Typography variant="h5" sx={{mb: "1rem"}}>
                            Drivers: &nbsp;
                            <span style={{fontWeight: "bold"}}>{data.drivers}</span>
                          </Typography>
                          <Typography variant="h5" sx={{mb: "1rem"}}>
                            Phone: &nbsp;
                            <span style={{fontWeight: "bold"}}>{data.phone}</span>
                          </Typography>
                        </FlexBetween>

                        <Typography variant="h5" sx={{mb: "1rem"}}>
                          Mailing address: &nbsp;
                          <span style={{fontWeight: "bold"}}>{data.mailing_address}</span>
                        </Typography>
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
                          m: "1rem"
                        }}
                      >
                        <Typography variant="h5" sx={{mb: "0.5rem"}}>
                          VESTIMATE CONTRACT PRICE
                        </Typography>
                      
                        <Typography variant="h4" fontWeight="bold" sx={{mb: "0.5rem"}}>
                          ${20000}K - ${30000}K
                        </Typography>
                      
                        <Typography variant="h5">
                          per year
                        </Typography>
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
                              {27} Days
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
                              {17}%
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
                              {8}%
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
                      mb: "0.5rem",
                      mr: "3rem",
                      minWidth: "35rem"
                    }}>
                      <Box sx={{ mb: "2rem"}}>
                        <Typography variant="h4" sx={{textAlign: "left", mb: "1rem"}} fontWeight="bold">
                          Compliance
                        </Typography>

                        <Box>
                          <FlexBetween>
                            <Box sx={{m: "1rem"}}>
                              <Typography variant="h5" sx={{mb: "0.5rem"}}>
                                SAFER Safety Rating
                              </Typography>
                              <Typography variant="h5" fontWeight="bold">
                                {data.safety_rating? data.safety_rating : "Not Available"}
                              </Typography>
                            </Box>

                            <Box sx={{m: "1rem"}}>
                              <Typography variant="h5" sx={{mb: "0.5rem"}}>
                                D&B Verification
                              </Typography>
                              <Typography variant="h5" fontWeight="bold">
                                Passed
                              </Typography>
                            </Box>
                          </FlexBetween>

                          <FlexBetween>
                            <Box sx={{m: "1rem"}}>
                              <Typography variant="h5" sx={{mb: "0.5rem"}}>
                                Operation classification
                              </Typography>
                              <Typography variant="h5" fontWeight="bold">
                                {data.operation_classification[0]? data.operation_classification[0] : "Not Available"}
                              </Typography>
                            </Box>

                            <Box sx={{m: "1rem"}}>
                              <Typography variant="h5" sx={{mb: "0.5rem"}}>
                                Operation Status
                              </Typography>
                              <Typography variant="h5" fontWeight="bold">
                                {data.operating_status? data.operating_status : "Not Available"}
                              </Typography>
                            </Box>
                          </FlexBetween>

                          {data.mcs_150_mileage_year.milage ? (
                            <FlexBetween>
                              <Box sx={{m: "1rem"}}>
                                <Typography sx={{mb: "0.5rem"}}>
                                  MCS 150 Milage (Year)
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                  {data.mcs_150_mileage_year.mileage} ({data.mcs_150_mileage_year.year})
                                </Typography>
                              </Box>

                              <Box sx={{m: "1rem"}}>
                                <Typography variant="h5" sx={{mb: "0.5rem"}}>
                                  MCS 150 form date
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                  {data.mcs_150_form_date}
                                </Typography>
                              </Box>
                            </FlexBetween>
                          ) : (
                            ""
                          )}
                        </Box>
                      </Box>

                      <Box sx={{textAlign: "left", mb: "2rem"}}>
                        <Typography variant="h4" sx={{mb: "1rem"}} fontWeight="bold">
                          Inspections in US & Canada (last 2 yrs)
                        </Typography>
                 
                        <Typography variant="h5" sx={{m: "1rem"}}>
                          Total driver inspections passed - &nbsp;  
                          {totalDriverInspectionsPassed} / {totalDriverInspections}
                        </Typography>
                          
                        <Typography variant="h5" sx={{m: "1rem"}}>
                          Total vehicle inspections passed - &nbsp; 
                          {totalVehicleInspectionsPassed} / {totalVehicleInspections}
                        </Typography>
                      </Box>

                      <Box sx={{textAlign: "left"}}>
                        <Typography variant="h4" sx={{mb: "1rem"}} fontWeight="bold">
                          Crashes in US and Canada 
                        </Typography>

                        <FlexBetween>
                          <Typography variant="h5" sx={{ml: "1rem", mb: "1rem"}}>
                            Tow - &nbsp;  
                            {totalTow}
                          </Typography>
                          
                          <Typography variant="h5" sx={{mb: "1rem"}}>
                            Fatal - &nbsp;  
                            {totalFatal}
                          </Typography>

                          <Typography variant="h5" sx={{mb: "1rem"}}>
                            Injury - &nbsp;  
                            {totalInjury}
                          </Typography>

                          <Typography variant="h5" sx={{mr: "1rem", mb: "1rem"}}>
                            Total - &nbsp;  
                            {totalCrashes}
                          </Typography>
                        </FlexBetween>
                      </Box>
                  </Box>
                </FlexBetween>
              </Box>

              <Box sx={{mt: "2rem", mb: "2rem"}}>
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
