import React, { useState } from "react";
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
} from "@mui/material";
import ExplorePageHeader from "components/ExplorePageHeader";
import { useGetVendorsQuery } from "state/api";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Vendor = ({
  _id,
  name,
  type,
  description,
  tags,
  address,
  city,
  state,
  zip,
  phone_number,
  email,
  website,
  complianceInfo,
  shipperStats,
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
          navigate(`/vendor/${_id}`);
        }}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        {/* <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {type}
        </Typography> */}
        <Typography variant="h4" component="div">
          {name}
        </Typography>
        <Typography variant="body2">{description}</Typography>

        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {/* ${Number(price).toFixed(2)} */}
          ${shipperStats.vestimateLowerRange} - ${shipperStats.vestimateUpperRange}
        </Typography>
        {/* <Rating value={complianceInfo.rating} readOnly /> */}

        <Stack direction="row" spacing={1}>
          {tags.map((tag) => (
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
          <Typography>address: {address}</Typography>
          <Typography>city: {city}</Typography>
          <Typography>state: {state}</Typography>
          <Typography>Phone: {phone_number}</Typography>
          <Typography>
            Email: {email}
          </Typography>
          <Typography>
            Website: {website}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Vendors = () => {
  const theme = useTheme();

  const shipperID = useSelector(state => state.global.shipperID);

  const { data, isLoading } = useGetVendorsQuery(shipperID);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  console.log("data", data);

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
        <ExplorePageHeader title="Explore" subtitle="" />
        {data || !isLoading ? (
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {data.map(
              ({
                _id,
                name,
                type,
                description,
                tags,
                address,
                city,
                state,
                zip,
                phone_number,
                email,
                website,
                complianceInfo,
                shipperStats,
              }) => (
                <Vendor
                  key={_id}
                  _id={_id}
                  name={name}
                  type={type}
                  tags={tags}
                  description={description}
                  address={address}
                  complianceInfo={complianceInfo}
                  shipperStats={shipperStats}
                  city={city}
                  state={state}
                  zip={zip}
                  phone_number={phone_number}
                  email={email}
                  website={website}
                />
              )
            )}
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Vendors;