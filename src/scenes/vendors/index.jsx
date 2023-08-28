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
import VendorPageHeader from "components/VendorPageHeader";
import { useGetVendorsQuery } from "state/api";

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
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
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
          $30000 - $50000
        </Typography>
        {/* <Rating value={complianceInfo.rating} readOnly /> */}

        <Stack direction="row" spacing={1}>
          {tags.map((tag) => (
            <Chip label={tag} 
              sx={{
                height: "1.5rem",
                borderRadius: "0",
                color: "black",
                backgroundColor: "lightgrey",
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
  const { data, isLoading } = useGetVendorsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  console.log("data", data);

  return (
    <Box m="1.5rem 2.5rem">
      <VendorPageHeader title="Explore" subtitle="" />
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
  );
};

export default Vendors;