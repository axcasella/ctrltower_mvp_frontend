import React from 'react'

import { Box, Chip, Stack, Typography } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import user4 from "assets/user4.png"

const DashboardLoggedInUserTasks = ({tags, userName, taskName}) => {
  return (
    <Box sx={{mt: "1rem", border: "2px solid #E1E2E9", borderRadius: "10px", p: "0.75rem"}}>
      <Box sx={{display: "flex"}}>
        <Box
          component="img"
          alt="profile"
          src={user4}
          height="39px"
          width="39px"
          borderRadius="50%"
          sx={{ objectFit: "cover" }}
        />
      
        <Box sx={{ml: "1rem", mb: "0.5rem"}}>
          <Typography fontSize="12px" mb="0.75rem">{userName}</Typography>
          <FlexBetween gap="7rem">
            <Typography fontSize="14px" fontWeight="600" mb="0.75rem">{taskName}</Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {tags.map((tag) => (
                <Chip label={tag} 
                  sx={{
                    height: "20px",
                    borderRadius: "5px",
                    color: "theme.palette.grey[1000]",
                    fontSize: "10px",
                    minWidth: "50px",
                    backgroundColor: "#F4F5FA",
                }} />
              ))}
            </Stack>
          </FlexBetween>
          <Typography fontSize="12px">June 15 2022</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardLoggedInUserTasks
