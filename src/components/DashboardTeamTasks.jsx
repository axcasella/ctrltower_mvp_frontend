import React from 'react'

import { Box, Chip, Stack, Typography } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import user1Image from "assets/user1.png"
import user2Image from "assets/user2.png"
import user3Image from "assets/user3.png"

const DashboardTeamTasks = ({tags, taskName}) => {
  return (
    <Box sx={{mt: "1rem", border: "2px solid #E1E2E9", borderRadius: "10px", p: "0.75rem"}}>
      <FlexBetween>
        <Typography fontSize="12px">{taskName}</Typography>
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

      <Typography fontSize="14px" fontWeight="600" mt="0.75rem">Upgrade Approval</Typography>

      <FlexBetween mt="0.75rem">
        <Typography fontSize="12px">June 15 2022</Typography>
        <Box>
          <Box
            component="img"
            alt="profile"
            src={user1Image}
            height="20px"
            width="20px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />
          <Box
            component="img"
            alt="profile"
            src={user2Image}
            height="20px"
            width="20px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />
          <Box
            component="img"
            alt="profile"
            src={user3Image}
            height="20px"
            width="20px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />
        </Box>
      </FlexBetween>
    </Box>
  )
}

export default DashboardTeamTasks
