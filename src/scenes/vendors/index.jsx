import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
  Tabs,
  Tab
} from "@mui/material";
import ExplorePageHeader from "components/ExplorePageHeader";
import { useSearchVendorsQuery } from "state/api";
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from "helpers";
import CtrlTowerCarriers from "components/CtrlTowerCarriers";

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
        border: `1px solid lightgrey`,
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
          sx={{
            backgroundColor: "#2DBFFD",
            fontSize: "11px",
            ml: 1,
          }}
        >
          See More
        </Button>
      </CardActions>

      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: "black",
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
  const [cursor, setCursor] = useState();  
  const [cursorStack, setCursorStack] = useState([]);
  const [searchTerm, setSearchTerm] = useState("A");
  const [searchCategory, setSearchCategory] = useState();
  const { data, error, isLoading } = useSearchVendorsQuery({name: searchTerm, cursor, cargoFilter: searchCategory});
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (e, newValue) => {
    setCurrentTab(newValue);
  };

  const goNext = () => {
    setCursorStack(prevStack => [...prevStack, cursor]);
    setCursor(data.cursor);
  };  

  const goBack = () => {
    const newCursor = cursorStack.pop();
    setCursor(newCursor);
    setCursorStack([...cursorStack]);
  };

  const updateSearchTermAndCategory = (term, category) => {
    setSearchTerm(term || "a");
    setSearchCategory(category);
    setCursor(null);
    setCursorStack([]);
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
        <ExplorePageHeader title="Carrier network" subtitle="" onSearchButtonClick={updateSearchTermAndCategory} />

        <Tabs value={currentTab} onChange={handleTabChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#2DBFFD",
              height: 3,
            },
            "& .MuiTab-root.Mui-selected": {
              color: '#2DBFFD'
            },
            mb: 5
          }}
        >
          <Tab label="All carriers"
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              textTransform: "none"
            }}/>

          <Tab label="Verified carriers"
            sx={{
              fontWeight: "600",
              fontSize: "18px",
              textTransform: "none"
            }}
            />
        </Tabs>

        {currentTab === 0 && (
          <>
            {data || !isLoading ? (
              <Box key={searchTerm}>
                <Typography variant="h5" fontWeight="600">
                  Found {data?.totalResults} results
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
                  {data?.data.map(
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
                
                <Button 
                  variant="contained" 
                  disabled={cursorStack.length === 0} 
                  onClick={goBack}
                  sx={{
                    border: cursorStack.length === 0 ? 'none' : `1px solid ${theme.palette.primary[100]}`,
                    fontSize: "1rem", 
                    boxShadow: "none",
                    mr: "0.5rem"}}>
                    Previous
                </Button>

                <Button 
                  variant="contained" 
                  disabled={data?.cursor >= data?.totalResults} 
                  onClick={goNext}
                  sx={{
                    border: data?.cursor >= data?.totalResults ? 'none' : `1px solid ${theme.palette.primary[100]}`,
                    fontSize: "1rem", 
                    boxShadow: "none",
                    mr: "0.5rem"}}>
                    Next
                </Button>
              </Box>
          ) : (
            <>Loading...</>
          )}
        </>
      )}

      {currentTab === 1 && <CtrlTowerCarriers />}
    </Box>
  </Box>
  );
};

export default Vendors;





