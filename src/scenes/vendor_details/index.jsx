import { Search } from "@mui/icons-material";
import React, { useState } from "react";
import { Typography, Box, useTheme, InputBase, IconButton, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import FlexBetween from 'components/FlexBetween';
import { useParams } from 'react-router-dom';
import { useGetVendorByIDQuery } from "state/api";
import { useSelector } from "react-redux";


const VendorDetails = () => {
  const { id } = useParams();

  const shipperID = useSelector(state => state.global.shipperID);

  const { data, isLoading } = useGetVendorByIDQuery({vendorID: id, shipperID});
  console.log("vendor detail data", data);

  const theme = useTheme();
  const [question, askQuestion] = useState("");
  const [requestBtn, subRequest] = useState("");

  return (
    <Box>
      {/* <Box>
        <FlexBetween>
          <Typography
            variant="h4"
            color={theme.palette.secondary[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            {name}
          </Typography>
        </FlexBetween>
      </Box>

      <Box>
        <Typography color={theme.palette.secondary[300]}>
          {description}
        </Typography>
      </Box> */}
    </Box>
  );
};

export default VendorDetails
