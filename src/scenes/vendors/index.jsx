import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
  Pagination
} from "@mui/material";
import ExplorePageHeader from "components/ExplorePageHeader";
import { useGetVendorsQuery, useSearchVendorsQuery } from "state/api";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "helpers";
import FlexBetween from "components/FlexBetween";

const Vendor = ({
  legal_name,
  dba_name,
  entity_type,
  mailing_address,
  mc_mx_ff_numbers,
  operation_classification,
  operating_status,
  phone,
  usdot,
  cargo_carried,
  carrier_operation
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent
         onClick={() => {
          navigate(`/vendor/${usdot}`);
        }}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Typography
          sx={{ fontSize: 14, mb: "0.5rem" }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {capitalizeFirstLetter(entity_type)}
        </Typography>
        <Typography sx={{mb: "0.2rem"}} variant="h4" component="div">
          {/* Some don't have a doing business as name */}
          {dba_name ? dba_name : legal_name}
        </Typography>
        <Typography sx={{mb: "1rem"}} variant="h6" component="div">
          {/* Some don't have a doing business as name */}
          USDOT - {usdot}
        </Typography>
        {/* <Typography variant="body2">{description}</Typography> */}

        {/* <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${shipperStats.vestimateLowerRange} - ${shipperStats.vestimateUpperRange}
        </Typography> */}

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {cargo_carried.map((tag) => (
            <Chip label={tag} 
              sx={{
                height: "1.5rem",
                borderRadius: "0",
                color: theme.palette.grey[1000],
                backgroundColor: theme.palette.grey[0],
            }} />
          ))}
        </Stack>

      </CardContent>

      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>

      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Box sx={{display: "flex", alignItems: "left"}}> 
            <Typography sx={{fontWeight: "bold", mr: "0.5rem"}}>Legal name:</Typography> 
            <Typography>{legal_name}</Typography>
          </Box>
          <Box sx={{display: "flex", alignItems: "left"}}> 
            <Typography sx={{fontWeight: "bold", mr: "0.5rem"}}>Phone: </Typography> 
            <Typography>{phone}</Typography>
          </Box>
          <Box sx={{display: "flex", alignItems: "left"}}> 
            <Typography sx={{fontWeight: "bold", mr: "0.5rem"}}>Address: </Typography> 
            <Typography>{mailing_address}</Typography>
          </Box>
          <Box sx={{display: "flex", alignItems: "left"}}> 
            <Typography sx={{fontWeight: "bold", mr: "0.5rem"}}>MC/MX/FF: </Typography> 
            <Typography>{mc_mx_ff_numbers || "Not available"}</Typography>
          </Box>
          <Box sx={{display: "flex", alignItems: "left"}}> 
            <Typography sx={{fontWeight: "bold", mr: "0.5rem"}}>Carrier operation: </Typography> 
            <Typography>{carrier_operation}</Typography>
          </Box>
          <Box sx={{display: "flex", alignItems: "left"}}> 
            <Typography sx={{fontWeight: "bold", mr: "0.5rem"}}>Operating status:</Typography> 
            <Typography>{operating_status}</Typography>
          </Box>
          <Box sx={{display: "flex", alignItems: "left"}}> 
            <Typography sx={{fontWeight: "bold", mr: "0.5rem"}}>Operation classification: </Typography> 
            <Typography>{operation_classification}</Typography>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Vendors = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("A");
  const { data, error, isLoading } = useSearchVendorsQuery({name: searchTerm, pageNumber});

  console.log("data", data);

  const setPage = (e, page) => {
    setPageNumber(page);
  }

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  }

  return (
    <Box sx={{
      padding: "1.5rem",
      backgroundColor: theme.palette.grey[100],
      minHeight: "100vh"
    }}>
      <Box m="1rem 0.5rem"
        sx={{
          backgroundColor: "#ffffff",
          padding: "1.5rem",   
          borderRadius: "0.55rem",
          minHeight: "80vh"
        }}
      >
        <ExplorePageHeader title="Explore" subtitle="" onSearchButtonClick={updateSearchTerm} />
        {data || !isLoading ? (
          <Box>
            <Typography variant="h5" fontWeight="600">
              Found {data.totalResults} results
            </Typography>

            <Box
              mt="20px"
              display="grid"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              justifyContent="space-between"
              rowGap="20px"
              columnGap="1.33%"
              sx={{
                mb: "2rem",
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {data.data.map(
                ({
                  legal_name,
                  dba_name,
                  entity_type,
                  mailing_address,
                  mc_mx_ff_numbers,
                  operation_classification,
                  operating_status,
                  phone,
                  usdot,
                  cargo_carried,
                  carrier_operation
                }) => (
                  <Vendor
                    key={usdot}
                    legal_name={legal_name}
                    dba_name={dba_name}
                    entity_type={entity_type}
                    mailing_address={mailing_address}
                    mc_mx_ff_numbers={mc_mx_ff_numbers}
                    operation_classification={operation_classification}
                    operating_status={operating_status}
                    phone={phone}
                    usdot={usdot}
                    cargo_carried={cargo_carried}
                    carrier_operation={carrier_operation}
                  />
                )
              )}
            </Box>
            
            <Pagination 
              count={data.totalPages} 
              variant="outlined" 
              shape="rounded"
              page={pageNumber}
              onChange={setPage}
            />
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Vendors;