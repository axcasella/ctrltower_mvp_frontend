import { Typography, Box, useTheme, InputBase, IconButton, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import FlexBetween from 'components/FlexBetween';
import { Search } from "@mui/icons-material";
import React, { useState } from "react";

const ExplorePageHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Box>
       <Typography
        variant="h4"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>

      <FlexBetween>
        <FlexBetween 
          // backgroundColor={theme.palette.background.alt} 
          // borderRadius="9px" 
          gap="3rem" 
          p="0.1rem 1.5rem"
        >
          <InputBase placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton>

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