import React, { useState } from 'react';
import {
  Box, FormControl, InputLabel, Input, Alert, Collapse, IconButton, useTheme, Select, MenuItem, Typography, ListItemText, Button, TextField, Checkbox, FormControlLabel
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useOnboardShipperMutation } from 'state/api';

const freightOptions = [
  "General Freight",
  "Metal: sheets, coils, rolls",
  "Fresh Produce",
  "Grain, Feed, Hay",
  "Meat",
  "Garbage/Refuse",
  "Commodities Dry Bulk",
  "Refrigerated Food",
  "Paper Products",
  "Logs, Poles, Beams, Lumber",
  "Building Materials",
  "US Mail",
  "Beverages",
  "Agricultural/Farm Supplies",
  "Construction",
  "Motor Vehicles",
  "Machinery, Large Objects",
  "Intermodal Cont.",
  "Household Goods",
  "Utilities",
  "Passengers",
  "Chemicals",
  "Liquids/Gases",
  "Drive/Tow away",
  "Mobile Homes",
  "Intrastate",
  "Coal/Coke",
  "Livestock",
  "Water Well",
  "Oilfield Equipment"
];

const shippingFrequencies = [
  'Daily', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Annually', 'On-Demand'
];

const OnboardShipper = () => {
  const theme = useTheme();

  const initialState = {
    name: "",
    description: "",
    freight_types: [],
    industry: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    primary_contact_name: "",
    shipping_frequency: "",
    common_routes: [],
    hazard_requirement: false,
  };

  const [shipperDetails, setShipperDetails] = useState(initialState);
  const [onboardShipper] = useOnboardShipperMutation();
  const [error, setError] = useState('');
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipperDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    console.log(shipperDetails);

    const requiredFields = ["name", "description", "industry", "address", "city", "state", "zip", "phone", "email", "website", "primary_contact_name"];

    const missingFields = requiredFields.filter(field => !shipperDetails[field]);
    if (missingFields.length > 0) {
        // Showing the missing fields in an error. You can modify this to be more user-friendly if needed.
        setError(`The following fields are required: ${missingFields.join(", ")}`);
        return;
    }

    try {
        const result = await onboardShipper(shipperDetails);
        if (result.data) {
            console.log("Successfully onboarded shipper!");
            setOpenSuccessAlert(true);  // Show the success alert
            setError(''); // Reset any errors if present
        } else {
            setError("Failed to onboard the shipper.");
        }
    } catch (err) {
        setError(`An error occurred: ${err.message}`);
    }
  };

  const handleFreightTypeChange = (event) => {
    setShipperDetails(prevState => ({
      ...prevState,
      freight_types: event.target.value
    }));
  };

  return (
    <Box
      sx={{
        padding: "1.5rem",
        backgroundColor: theme.palette.grey[100],
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box m="1rem 0.5rem"
        sx={{
          backgroundColor: "#ffffff",
          padding: "1.5rem",
          borderRadius: "0.55rem",
          minHeight: "80vh",
          width: "50vw",
        }}
      >
        <Typography variant="h4" mb={4} sx={{ color: "#2DBFFD", fontWeight: "bold" }}>
          New Shipper Onboarding
        </Typography>

        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label="Shipper name" variant="outlined" name="name" value={shipperDetails.name} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                  color: "#2DBFFD",
                  fontWeight: "600",
              },
              "& .MuiInputBase-input:focus": {
                backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label="Description" variant="outlined" name="description" value={shipperDetails.description} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                  color: "#2DBFFD",
                  fontWeight: "600",
              },
              "& .MuiInputBase-input:focus": {
                backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" 
          sx={{ mb: 5,
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2DBFFD',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2DBFFD',
            }
          }}>
          <InputLabel 
            id="freight-types-label"
            htmlFor="freight-types" 
            shrink={shipperDetails.freight_types.length > 0}
            sx={{
              '&.Mui-focused': {
                color: '#2DBFFD'
              }
            }}
          >
            Freight Types
          </InputLabel>
          <Select
            labelId="freight-types-label"
            id="freight-types"
            multiple
            value={shipperDetails.freight_types}
            onChange={handleFreightTypeChange}
            renderValue={(selected) => selected.join(', ')}
            label="Freight Types"
          >
            {freightOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox 
                  checked={shipperDetails.freight_types.includes(option)} 
                  style={{color: '#2DBFFD'}}
                />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label="Industry" variant="outlined" name="industry" value={shipperDetails.industry} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                color: "#2DBFFD",
                fontWeight: "600",
             },
             "& .MuiInputBase-input:focus": {
              backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label="Address" variant="outlined" name="address" value={shipperDetails.address} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                color: "#2DBFFD",
                fontWeight: "600",
              },
               "& .MuiInputBase-input:focus": {
                backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label="City" variant="outlined" name="city" value={shipperDetails.city} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                color: "#2DBFFD",
                fontWeight: "600",
              },
              "& .MuiInputBase-input:focus": {
                backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label="State" variant="outlined" name="state" value={shipperDetails.state} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                color: "#2DBFFD",
                fontWeight: "600",
              },
              "& .MuiInputBase-input:focus": {
                backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label="Zip Code" variant="outlined" name="zip" value={shipperDetails.zip} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                color: "#2DBFFD",
                fontWeight: "600",
              },
              "& .MuiInputBase-input:focus": {
                backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label="Country" variant="outlined" name="country" value={shipperDetails.country} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                color: "#2DBFFD",
                fontWeight: "600",
              },
              "& .MuiInputBase-input:focus": {
                backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label="Phone" variant="outlined" name="phone" value={shipperDetails.phone} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                color: "#2DBFFD",
                fontWeight: "600",
              },
              "& .MuiInputBase-input:focus": {
                backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label="Email" variant="outlined" name="email" value={shipperDetails.email} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                color: "#2DBFFD",
                fontWeight: "600",
              },
              "& .MuiInputBase-input:focus": {
                backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label="Website" variant="outlined" name="website" value={shipperDetails.website} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                color: "#2DBFFD",
                fontWeight: "600",
              },
              "& .MuiInputBase-input:focus": {
                backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField label="Primary Contact Name" variant="outlined" name="primary_contact_name" value={shipperDetails.primary_contact_name} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                color: "#2DBFFD",
                fontWeight: "600",
              },
              "& .MuiInputBase-input:focus": {
                backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ mb: 5,
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2DBFFD',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2DBFFD',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
              borderColor: '#2DBFFD',
            },
            '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.main,
            },
            '& .MuiInputLabel-outlined.Mui-focused': {
              color: "#2DBFFD",
              fontWeight: "600",
            },
          }}>
          <InputLabel id="shipping-frequency-label">Shipping Frequency</InputLabel>
          <Select
            labelId="shipping-frequency-label"
            id="shipping-frequency"
            value={shipperDetails.shipping_frequency}
            onChange={handleChange}
            name="shipping_frequency"
            label="Shipping Frequency"
          >
            {shippingFrequencies.map((frequency) => (
              <MenuItem key={frequency} value={frequency}>
                {frequency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <TextField label="Common Routes (comma separated)" variant="outlined" name="common_routes" value={shipperDetails.common_routes} onChange={handleChange} 
            sx={{
              "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {  // Set the focused border style
                      borderColor: "#2DBFFD",
                  },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {  // Change label color when focused
                color: "#2DBFFD",
                fontWeight: "600",
              },
              "& .MuiInputBase-input:focus": {
                backgroundColor: 'white',
              },
              "& .MuiInputBase-input:-webkit-autofill": {
                  WebkitBoxShadow: '0 0 0 30px white inset',
              }
            }}
          />
        </FormControl>

        <FormControlLabel
          fullWidth sx={{ mb: 3 }}
          control={
            <Checkbox
                checked={shipperDetails.hazard_requirement}
                onChange={(e) => setShipperDetails(prevState => ({ ...prevState, hazard_requirement: e.target.checked }))}
                name="hazard_requirement"
                color="primary"
                icon={<CheckBoxOutlineBlankIcon fontSize="medium" style={{ color: "#000" }} />}  // set explicit color
                checkedIcon={<CheckBoxIcon fontSize="medium" style={{ color: "#000" }} />} // set explicit color
            />
          }
          label="Hazard Requirement"
        />


        {error && <Typography color="error" mb={3}>{error}</Typography>}
        
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
          <Button variant="contained" color="primary" fullWidth onClick={onSubmit}
            sx={{ backgroundColor: theme.palette.primary[100], color: "white", fontSize: "1rem", boxShadow: "none", width: "15rem" }}>
            Submit
          </Button>
        </Box>

        <Collapse in={openSuccessAlert}>
          <Alert 
              severity="success"
              sx={{fontSize: "16px", mt: 2}}  // Added a top margin for spacing
              action={
                  <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                          setOpenSuccessAlert(false);
                      }}
                  >
                      <CloseIcon fontSize="inherit" />
                  </IconButton>
              }
          >
              Shipper onboarded successfully!
          </Alert>
      </Collapse>

      {error ? <Typography color="error" mt={2}>{error}</Typography> : null}
      
      </Box>
    </Box>
  );
}

export default OnboardShipper;