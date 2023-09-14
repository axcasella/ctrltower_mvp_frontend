import { Typography, Box, useTheme, InputBase, IconButton, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import FlexBetween from 'components/FlexBetween';
import { Search } from "@mui/icons-material";
import React, { useState } from "react";

const ExplorePageHeader = ({ title, subtitle, onSearchButtonClick }) => {
  const theme = useTheme();

  // Search
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    onSearchButtonClick(localSearchTerm, category);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    onSearchButtonClick(localSearchTerm, event.target.value);
  };

  return (
    <Box
      sx={{ marginBottom: "2rem" }}
    >
      <Box
        sx={{ marginBottom: "2rem" }}
      >
        <Typography
          variant="h4"
          color={theme.palette.grey[1000]}
          fontWeight="600"
          sx={{ mb: "5px" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={theme.palette.grey[1000]}>
          {subtitle}
        </Typography>
      </Box>

      <FlexBetween>
        <FlexBetween 
          gap="3rem" 
          p="0.1rem 1.5rem"
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: "1px solid lightgrey",
              borderRadius: "0.55rem",
              padding: "0.5rem",
              pl: "1rem",
            }}
          >
            <InputBase 
              placeholder="Search..."  
              value={localSearchTerm}             
              onChange={handleSearchChange}         
              fullWidth
              sx={{
                flex: 1, // to ensure the input takes full width
              }}
            />
            <IconButton onClick={handleSearchClick}>
              <Search />
            </IconButton>
          </Box>
          
          <Box sx={{ minWidth: 175 }}>
            <FormControl fullWidth>
              <InputLabel>Cargo carried</InputLabel>
              <Select
                labelId="catetory-select-label"
                id="category-select"
                value={category}
                label="Category"
                onChange={handleChangeCategory}
                sx={{ borderRadius: "0.55rem"}}
              >
                <MenuItem value={"General Freight"}>General Freight</MenuItem>
                <MenuItem value={"Metal: sheets, coils, rolls"}>Metal: sheets, coils, rolls</MenuItem>
                <MenuItem value={"Fresh Produce"}>Fresh Produce</MenuItem>
                <MenuItem value={"Grain, Feed, Hay"}>Grain, Feed, Hay</MenuItem>
                <MenuItem value={"Meat"}>Meat</MenuItem>
                <MenuItem value={"Garbage/Refuse"}>Garbage/Refuse</MenuItem>
                <MenuItem value={"Commodities Dry Bulk"}>Commodities Dry Bulk</MenuItem>
                <MenuItem value={"Refrigerated Food"}>Refrigerated Food</MenuItem>
                <MenuItem value={"Paper Products"}>Paper Products</MenuItem>
                <MenuItem value={"Logs, Poles, Beams, Lumber"}>Logs, Poles, Beams, Lumber</MenuItem>
                <MenuItem value={"Building Materials"}>Building Materials</MenuItem>
                <MenuItem value={"US Mail"}>US Mail</MenuItem>
                <MenuItem value={"Beverages"}>Beverages</MenuItem>
                <MenuItem value={"Agricultural/Farm Supplies"}>Agricultural/Farm Supplies</MenuItem>
                <MenuItem value={"Construction"}>Construction</MenuItem>
                <MenuItem value={"Motor Vehicles"}>Motor Vehicles</MenuItem>
                <MenuItem value={"Machinery, Large Objects"}>Machinery, Large Objects</MenuItem>
                <MenuItem value={"Intermodal Cont."}>Intermodal Cont.</MenuItem>
                <MenuItem value={"Household Goods"}>Household Goods</MenuItem>
                <MenuItem value={"Utilities"}>Utilities</MenuItem>
                <MenuItem value={"Passengers"}>Passengers</MenuItem>
                <MenuItem value={"Chemicals"}>Chemicals</MenuItem>
                <MenuItem value={"Liquids/Gases"}>Liquids/Gases</MenuItem>
                <MenuItem value={"Drive/Tow away"}>Drive/Tow away</MenuItem>
                <MenuItem value={"Mobile Homes"}>Mobile Homes</MenuItem>
                <MenuItem value={"Intrastate"}>Intrastate</MenuItem>
                <MenuItem value={"Coal/Coke"}>Coal/Coke</MenuItem>
                <MenuItem value={"Livestock"}>Livestock</MenuItem>
                <MenuItem value={"Water Well"}>Water Well</MenuItem>
                <MenuItem value={"Oilfield Equipment"}>Oilfield Equipment</MenuItem>
              </Select>
            </FormControl> 
          </Box>
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};

export default ExplorePageHeader;