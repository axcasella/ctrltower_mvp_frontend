import React from 'react'
import { Box, Typography } from '@mui/material'

const RecommendationsComponent = ({recommendationText}) => {
  return (
    <Box sx={{mt: "1rem", border: "2px solid #E1E2E9", borderRadius: "10px", p: "0.75rem"}}>
      <Typography fontSize="14px" fontWeight="600">{recommendationText}</Typography>
    </Box>
  )
}

export default RecommendationsComponent
