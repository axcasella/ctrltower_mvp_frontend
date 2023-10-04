import React, { useState } from 'react';
import {
  Box, FormControl, InputLabel, Input, Alert, Collapse, IconButton, useTheme, Select, MenuItem, Typography, ListItemText, Button, TextField, Checkbox, FormControlLabel
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useOnboardCarrierMutation } from 'state/api';

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

const equipmentTypes = [
  "Unknown",
  "Van",
  "Refrigerated",
  "Container",
  "Flat bed",
  "Power only",
  "Deck",
  "Tautliner",
  "Tanker",
  "Conestoga",
  "Megatrailer",
  "Roadtrain",
  "Jumbo",
  "Tilt",
  "Box"
];

const OnboardCarrier = () => {
  const theme = useTheme();

  const initialState = {
    name: "",
    description: "",
    freight_types: [],
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    primary_contact_name: "",
    equipment_types: [],
    support_hazard: false,
    insurance_on_file: "",
    fleet_size: "",
    driver_count: "",
    usdot: "",
    mc_number: "",
    preferred_routes: [],
  };

  const [carrierDetails, setCarrierDetails] = useState(initialState);
  const [onboardCarrier] = useOnboardCarrierMutation(); // Assuming you have this mutation defined
  const [error, setError] = useState('');
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarrierDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFreightTypeChange = (event) => {
    setCarrierDetails(prevState => ({
      ...prevState,
      freight_types: event.target.value
    }));
  };

  const handleEquipmentTypeChange = (event) => {
    setCarrierDetails(prevState => ({
      ...prevState,
      equipment_types: event.target.value
    }));
  };

  const onSubmit = async () => {
    console.log(carrierDetails);

    const requiredFields = ["name", "description", "freight_types", "address", "city", "state", "zip", "country", "phone", "email", "primary_contact_name", "support_hazard", "insurance_on_file", "fleet_size", "driver_count", "usdot", "mc_number"];

    const missingFields = requiredFields.filter(field => !carrierDetails[field] || (Array.isArray(carrierDetails[field]) && carrierDetails[field].length === 0));
    if (missingFields.length > 0) {
        setError(`The following fields are required: ${missingFields.join(", ")}`);
        return;
    }

    try {
        const result = await onboardCarrier(carrierDetails);
        if (result.data) {
            console.log("Successfully onboarded carrier!");
            setOpenSuccessAlert(true);  // Show the success alert
            setError(''); // Reset any errors if present
        } else {
            setError("Failed to onboard the carrier.");
        }
    } catch (err) {
        setError(`An error occurred: ${err.message}`);
    }
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
          New Carrier Onboarding
        </Typography>
    
        {/* Carrier Name */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="Carrier Name" 
            variant="outlined" 
            name="name" 
            value={carrierDetails.name} 
            onChange={handleChange}
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
    
        {/* Description */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="Description" 
            variant="outlined" 
            name="description" 
            value={carrierDetails.description} 
            onChange={handleChange}
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
    
        {/* Freight Types */}
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
            shrink={carrierDetails.freight_types.length > 0}
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
            value={carrierDetails.freight_types}
            onChange={handleFreightTypeChange}
            renderValue={(selected) => selected.join(', ')}
            label="Freight Types"
          >
            {freightOptions.map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox 
                  checked={carrierDetails.freight_types.includes(type)} 
                  style={{color: '#2DBFFD'}}
                />
                <ListItemText primary={type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    
        {/* Address */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="Address" 
            variant="outlined" 
            name="address" 
            value={carrierDetails.address} 
            onChange={handleChange}
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
    
        {/* City */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="City" 
            variant="outlined" 
            name="city" 
            value={carrierDetails.city} 
            onChange={handleChange}
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
    
        {/* State */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="State" 
            variant="outlined" 
            name="state" 
            value={carrierDetails.state} 
            onChange={handleChange}
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
    
        {/* ZIP */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="ZIP Code" 
            variant="outlined" 
            name="zip" 
            value={carrierDetails.zip} 
            onChange={handleChange}
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
    
        {/* Country */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="Country" 
            variant="outlined" 
            name="country" 
            value={carrierDetails.country} 
            onChange={handleChange}
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
    
        {/* Phone */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="Phone" 
            variant="outlined" 
            name="phone" 
            value={carrierDetails.phone} 
            onChange={handleChange}
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
    
        {/* Email */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="Email" 
            variant="outlined" 
            name="email" 
            value={carrierDetails.email} 
            onChange={handleChange}
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
    
        {/* Website */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="Website" 
            variant="outlined" 
            name="website" 
            value={carrierDetails.website} 
            onChange={handleChange}
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
    
        {/* Primary Contact Name */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="Primary Contact Name" 
            variant="outlined" 
            name="primary_contact_name" 
            value={carrierDetails.primary_contact_name} 
            onChange={handleChange}
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
    
        {/* Equipment Types */}
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
            id="equipment-types-label"
            htmlFor="equipment-types" 
            shrink={carrierDetails.equipment_types.length > 0}
            sx={{
              '&.Mui-focused': {
                color: '#2DBFFD'
              }
            }}
          >
            Equipment Types
          </InputLabel>
          <Select
            labelId="equipment-types-label"
            id="equipment-types"
            multiple
            value={carrierDetails.equipment_types}
            onChange={handleEquipmentTypeChange} 
            renderValue={(selected) => selected.join(', ')}
            label="Equipment Types"
          >
            {equipmentTypes.map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox 
                  checked={carrierDetails.equipment_types.includes(type)} 
                  style={{color: '#2DBFFD'}}
                />
                <ListItemText primary={type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    
        {/* Support Hazard */}
        <FormControlLabel
          fullWidth sx={{ mb: 3 }}
          control={
            <Checkbox
                checked={carrierDetails.support_hazard}
                onChange={(e) => setCarrierDetails(prevState => ({ ...prevState, support_hazard: e.target.checked }))}
                name="support_hazard"
                color="primary"
                icon={<CheckBoxOutlineBlankIcon fontSize="medium" style={{ color: "#000" }} />} 
                checkedIcon={<CheckBoxIcon fontSize="medium" style={{ color: "#000" }} />} 
            />
          }
          label="Support Hazard"
        />
    
        {/* Insurance on File */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="Insurance on File" 
            variant="outlined" 
            name="insurance_on_file" 
            value={carrierDetails.insurance_on_file} 
            onChange={handleChange}
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
    
        {/* Fleet Size */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="Fleet Size" 
            variant="outlined" 
            name="fleet_size" 
            value={carrierDetails.fleet_size} 
            onChange={handleChange}
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
    
        {/* Driver Count */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="Driver Count" 
            variant="outlined" 
            name="driver_count" 
            value={carrierDetails.driver_count} 
            onChange={handleChange}
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
    
        {/* USDOT */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="USDOT" 
            variant="outlined" 
            name="usdot" 
            value={carrierDetails.usdot} 
            onChange={handleChange}
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
    
        {/* MC Number */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="MC Number" 
            variant="outlined" 
            name="mc_number" 
            value={carrierDetails.mc_number} 
            onChange={handleChange}
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
    
        {/* Preferred Routes */}
        <FormControl fullWidth sx={{ mb: 5 }}>
          <TextField 
            label="Preferred Routes (comma separated)" 
            variant="outlined" 
            name="preferred_routes" 
            value={carrierDetails.preferred_routes} 
            onChange={handleChange}
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
    
        {/* Submit Button and Alert */}
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
              Carrier onboarded successfully!
          </Alert>
        </Collapse>
    
        {error ? <Typography color="error" mt={2}>{error}</Typography> : null}
      
      </Box>
    </Box>
  );
}

export default OnboardCarrier;
