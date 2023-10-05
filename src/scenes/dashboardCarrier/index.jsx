import React from 'react'
import { Typography, Box, useTheme, Icon } from "@mui/material";
import DashboardPageHeader from 'components/DashboardPageHeader';
import FlexBetween from 'components/FlexBetween';
import DashboardTeamTasks from 'components/DashboardTeamTasks';
import DashboardLoggedInUserTasks from 'components/DashboardLoggedInUserTasks';
import RecommendationsComponent from 'components/RecommendationsComponent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import truckIcon from '../../assets/truckIcon.png';
import destinationIcon from '../../assets/destinationIcon.png';

// oklahoma
const centerPosition = [35.0078, -97.0929];

const DashboardCarrier = () => {
  const theme = useTheme();

  // simulate data
  const truckMarkers = [
    {
      // ohio
      geocode: [40.4173, -82.9071],
      popUp: "Awaiting pickup as of 10/6/2023",
    },
    {
      geocode: [33.4484, -112.0740],
      popUp: "Arizona",
    },
    {
      geocode: [33.7488, -84.3877],
      popUp: "Georgia",
    }
  ];

  const destinationMarkers = [
    {
      geocode: [40.7128, -74.0060],
      popUp: "Delivery date: 10/14/2023",
    },
    {
      geocode: [34.0549, -118.2426],
      popUp: "California",
    },
    {
      // geocode for louisiana
      geocode: [30.9843, -91.9623],
      popUp: "Louisiana",
    }
  ];

  const customTruckIcon = new L.Icon({
    iconUrl: truckIcon,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });

  const customDestinationIcon = new L.Icon({
    iconUrl: destinationIcon,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });

  const tags = ["Tag"];
  
  return (
    <Box
      sx={{
      padding: "1.5rem",
      backgroundColor: theme.palette.grey[100],
      minHeight: "100vh",}}
    >
      <DashboardPageHeader/>

      <Box sx={{
        backgroundColor: "#ffffff",
        p: "1.5rem",
        borderRadius: "0.75rem",
        height: "30rem",
        width: "95rem"
        }}>
          {/* center on ohio */}
          <MapContainer center={centerPosition} zoom={5} scrollWheelZoom={false} attributionControl={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {truckMarkers.map(marker => (
              <Marker key={marker.popUp} position={marker.geocode} icon={customTruckIcon}>
                <Popup>{marker.popUp}</Popup>
                <Tooltip>{marker.popUp}</Tooltip>
              </Marker>
            ))}

            {destinationMarkers.map(marker => (
              <Marker key={marker.popUp} position={marker.geocode} icon={customDestinationIcon}>
                <Popup>{marker.popUp}</Popup>
                <Tooltip>{marker.popUp}</Tooltip>
              </Marker>
            ))}
          </MapContainer>
      </Box>
      
      <FlexBetween gap="2rem" mt="2rem">
        <Box sx={{
            backgroundColor: "#ffffff",
            p: "1.5rem",
            borderRadius: "0.75rem",
            height: "22rem",
            width: "28rem"
            }}>
              <FlexBetween>
                <Typography fontSize="16px" fontWeight="600">Team Tasks</Typography>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    
                  }}>
                    <Typography fontSize="14px" color="#26A0D5">View All</Typography>
                    <ArrowForwardIcon sx={{ml: "0.25rem", fontSize: "14px", fontWeight: "bold", color: "#26A0D5"}}/>
                </Box>
              </FlexBetween>
              
              <DashboardTeamTasks tags={tags} taskName="Delivery (#067)"/>
              <DashboardTeamTasks tags={tags} taskName="Pickup Urgent"/>
        </Box>

        <Box sx={{
            backgroundColor: "#ffffff",
            p: "1.5rem",
            borderRadius: "0.75rem",
            height: "22rem",
            width: "28rem"
            }}>
              <FlexBetween>
                <Typography fontSize="16px" fontWeight="600">My Tasks</Typography>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    
                  }}>
                    <Typography fontSize="14px" color="#26A0D5">View All</Typography>
                    <ArrowForwardIcon sx={{ml: "0.25rem", fontSize: "14px", fontWeight: "bold", color: "#26A0D5"}}/>
                </Box>
              </FlexBetween>

              <DashboardLoggedInUserTasks tags={tags} userName="Erin M." taskName="11/25 Holiday Planning"/>
              <DashboardLoggedInUserTasks tags={tags} userName="Erin M." taskName="BFCM Dates Saved"/>
        </Box>

        <Box sx={{
            backgroundColor: "#ffffff",
            p: "1.5rem",
            borderRadius: "0.75rem",
            height: "22rem",
            width: "28rem"
            }}>
              <FlexBetween>
                <Typography fontSize="16px" fontWeight="600">Recommendation</Typography>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    
                  }}>
                    <Typography fontSize="14px" color="#26A0D5">View All</Typography>
                    <ArrowForwardIcon sx={{ml: "0.25rem", fontSize: "14px", fontWeight: "bold", color: "#26A0D5"}}/>
                </Box>
              </FlexBetween>

              <RecommendationsComponent recommendationText="Keep at least 1 truck near ATL Georgia"/>
              <RecommendationsComponent recommendationText="Severe weather alert near Ohio"/>
              <RecommendationsComponent recommendationText="Spot market rates for your lanes are 25% lower than usual for September."/>
        </Box>
      </FlexBetween>
    </Box>
  )
}

export default DashboardCarrier

