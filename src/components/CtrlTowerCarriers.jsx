import { useState } from 'react';
import { useMediaQuery, Card, CardContent, CardActions, Button, Typography, Collapse, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useGetCTCarriersQuery } from 'state/api';

const CarrierTile = ({ carrier }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = (event) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        border: `1px solid lightgrey`,
      }}
      // onClick={() => {
      //   navigate(`/vendor/${carrier.usdot}`);
      // }}
    >
      <CardContent
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Typography sx={{ mb: "0.5rem" }} variant="h4" color={theme.palette.secondary[700]} gutterBottom>
          {carrier.name}
        </Typography>
        <Typography sx={{ fontSize: 14, mb: "0.2rem" }} variant="h4" component="div">
          {carrier.description}
        </Typography>
        <Typography sx={{ mb: "1rem" }} variant="h6" component="div">
          USDOT - {carrier.usdot}
        </Typography>
      </CardContent>
      
      <CardActions>
        <Button 
          variant="primary"
          size="small" 
          onClick={handleExpandClick} 
          sx={{ 
            backgroundColor: "#2DBFFD",
            fontSize: "11px",
            ml: 1, 
          }}
        >
          See More
        </Button>
      </CardActions>
      
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Box>
                <Typography component="span" fontWeight="bold">Address:</Typography> {carrier.address}, {carrier.city}, {carrier.zip}, {carrier.country}
            </Box>
            <Box>
                <Typography component="span" fontWeight="bold">Email:</Typography> {carrier.email}
            </Box>
            <Box>
                <Typography component="span" fontWeight="bold">Phone:</Typography> {carrier.phone}
            </Box>
            <Box>
                <Typography component="span" fontWeight="bold">Website:</Typography> {carrier.website}
            </Box>
            <Box>
                <Typography component="span" fontWeight="bold">Equipment Types:</Typography> {carrier.equipment_types.join(', ')}
            </Box>
            <Box>
                <Typography component="span" fontWeight="bold">MC Number:</Typography> {carrier.mc_number}
            </Box>
            <Box>
                <Typography component="span" fontWeight="bold">Insurance on File:</Typography> {carrier.insurance_on_file}
            </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const CtrlTowerCarriers = () => {
  const { data, error, isLoading } = useGetCTCarriersQuery();
  console.log(data);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
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
      {data?.map(carrier => (
          <CarrierTile key={carrier._id} carrier={carrier} />
      ))}
  </Box>
  );
}

export default CtrlTowerCarriers;
