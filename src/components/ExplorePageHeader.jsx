import { Typography, Box, useTheme, InputBase, IconButton, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import FlexBetween from 'components/FlexBetween';
import { Search } from "@mui/icons-material";
import React, { useState } from "react";
import { InputAdornment } from "@mui/material";

const ExplorePageHeader = ({ title, subtitle, onSearchButtonClick }) => {
  const theme = useTheme();

  // Search
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    onSearchButtonClick(localSearchTerm);
  };

  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
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
          
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                labelId="catetory-select-label"
                id="category-select"
                value={category}
                label="Category"
                onChange={handleChangeCategory}
              >
                <MenuItem value={"carrier"}>Carrier</MenuItem>
                <MenuItem value={"warehouse"}>Warehouse</MenuItem>
                <MenuItem value={"3pl"}>3PL</MenuItem>
              </Select>
            </FormControl> 
          </Box>
 
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>Filter</InputLabel>

              <Select
                labelId="filter-select-label"
                id="filter-select"
                value={filter}
                label="Filter"
                onChange={handleChangeFilter}
              >
              </Select>
            </FormControl>
          </Box>
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};

export default ExplorePageHeader;