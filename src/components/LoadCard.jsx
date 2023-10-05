import React, { useState } from 'react'
import { Box, Card, Typography, useTheme, Button, CardActions, Collapse, CardContent } from "@mui/material";

const LoadCard = ({
  reference_number,
  origin_address,
  origin_city,
  origin_state,
  origin_country,
  origin_zip_code,
  destination_address,
  destination_city,
  destination_state,
  destination_country,
  destination_zip_code,
  pick_up_date,
  pick_up_time,
  delivery_date,
  delivery_time,
  freight_type,
  freight_weight,
  rate,
  payment_term,
  hazmat,
  dimension_length,
  dimension_width,
  dimension_height,
  freight_description,
  trailer_needed,
  special_equipment_description,
  check_in_instruction
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
        <Typography variant="h6"><strong>Reference:</strong> {reference_number}</Typography>
        <Typography><strong>Origin:</strong> {origin_address}, {origin_city}, {origin_state}, {origin_country} {origin_zip_code}</Typography>
        <Typography><strong>Destination:</strong> {destination_address}, {destination_city}, {destination_state}, {destination_country} {destination_zip_code}</Typography>
        <Typography><strong>Pick-up:</strong> {new Date(pick_up_date).toLocaleDateString()} at {pick_up_time}</Typography>
        <Typography><strong>Delivery:</strong> {new Date(delivery_date).toLocaleDateString()} at {delivery_time}</Typography>
        <Typography><strong>Type:</strong> {freight_type}</Typography>
        <Typography><strong>Weight:</strong> {freight_weight}</Typography>
        <Typography><strong>Rate:</strong> {rate}</Typography>
        <Typography><strong>Payment Term:</strong> {payment_term}</Typography>
        <Typography><strong>Hazmat:</strong> {hazmat ? "Yes" : "No"}</Typography>
      </CardContent>

      <CardActions sx={{justifyContent: 'center'}}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{color: 'white'}}
        >
          {isExpanded ? 'See Less' : 'See More'}
        </Button>
      </CardActions>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography><strong>Dimensions:</strong> {dimension_length} x {dimension_width} x {dimension_height}</Typography>
          <Typography><strong>Description:</strong> {freight_description}</Typography>
          <Typography><strong>Trailer Needed:</strong> {trailer_needed}</Typography>
          <Typography><strong>Special Equipment:</strong> {special_equipment_description}</Typography>
          <Typography><strong>Check-in Instruction:</strong> {check_in_instruction}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default LoadCard
