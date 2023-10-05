import React, { useState } from 'react';
import {
  TextField, FormControl, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, Button, Box, Typography, Collapse, useTheme, IconButton, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useAddLoadMutation } from 'state/api';
import { useSelector } from 'react-redux'; 

const initialState = {
  origin_address: "",
  origin_city: "",
  origin_state: "",
  origin_country: "",
  origin_zip_code: "",
  destination_address: "",
  destination_city: "",
  destination_state: "",
  destination_country: "",
  destination_zip_code: "",
  pick_up_date: null,
  pick_up_time: "",
  delivery_date: null,
  delivery_time: "",
  freight_type: "",
  freight_weight: "",
  dimension_length: "",
  dimension_width: "",
  dimension_height: "",
  freight_description: "",
  trailer_needed: "",
  special_equipment_description: "",
  rate: "",
  payment_term: "",
  check_in_instruction: "",
  reference_number: "",
  hazmat: false,
  shipperID: "",
};

const AddLoadTab = () => {
  const theme = useTheme();
  const shipperID = useSelector(state => state.global.shipperID); 
  
  const [loadDetails, setLoadDetails] = useState(initialState);
  const [error, setError] = useState(null);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [addLoad] = useAddLoadMutation();

  const handleChange = (e) => {
      setLoadDetails(prev => ({
          ...prev,
          [e.target.name]: e.target.value
      }));
  };

  const handleDateChange = (name, value) => {
      setLoadDetails(prev => ({
          ...prev,
          [name]: value
      }));
  };

    const handleSubmit = async () => {
      loadDetails.shipperID = shipperID;
      console.log("loadDetails", loadDetails);

      const requiredFields = [
          "shipperID", "origin_address", "origin_city", "origin_state", "origin_country",
          "origin_zip_code", "destination_address", "destination_city", "destination_state",
          "destination_country", "destination_zip_code", "pick_up_date", "pick_up_time",
          "delivery_date", "delivery_time", "freight_type", "freight_weight", "dimension_length",
          "dimension_width", "dimension_height", "freight_description", "trailer_needed",
          "special_equipment_description", "rate", "payment_term", "check_in_instruction",
          "reference_number"
      ];

      const missingFields = requiredFields.filter(field => !loadDetails[field]);
      if (missingFields.length > 0) {
          setError(`The following fields are required: ${missingFields.join(", ")}`);
          return;
      }

      try {
          const result = await addLoad(loadDetails);  
          if (result.data) {
              console.log("Successfully added the load!");
              setOpenSuccessAlert(true);  
              setError(''); 
          } else {
              setError("Failed to add the load.");
          }
      } catch (err) {
          setError(`An error occurred: ${err.message}`);
      }
    };

    return (
      <Box sx={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField fullWidth variant="outlined" label="Origin Address" name="origin_address" value={loadDetails.origin_address || ""} onChange={handleChange} 
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

          <TextField fullWidth variant="outlined" label="Origin City" name="origin_city" value={loadDetails.origin_city || ""} onChange={handleChange} 
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

          <TextField fullWidth variant="outlined" label="Origin State" name="origin_state" value={loadDetails.origin_state || ""} onChange={handleChange} 
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

          <TextField fullWidth variant="outlined" label="Origin Country" name="origin_country" value={loadDetails.origin_country || ""} onChange={handleChange} 
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

          <TextField fullWidth variant="outlined" label="Origin Zip Code" name="origin_zip_code" value={loadDetails.origin_zip_code || ""} onChange={handleChange} type="number" 
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

          <TextField fullWidth variant="outlined" label="Destination Address" name="destination_address" value={loadDetails.destination_address || ""} onChange={handleChange} 
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

          <TextField fullWidth variant="outlined" label="Destination City" name="destination_city" value={loadDetails.destination_city || ""} onChange={handleChange} 
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

          <TextField fullWidth variant="outlined" label="Destination State" name="destination_state" value={loadDetails.destination_state || ""} onChange={handleChange} 
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

          <TextField fullWidth variant="outlined" label="Destination Country" name="destination_country" value={loadDetails.destination_country || ""} onChange={handleChange} 
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

          <TextField fullWidth variant="outlined" label="Destination Zip Code" name="destination_zip_code" value={loadDetails.destination_zip_code || ""} onChange={handleChange} type="number" 
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <DatePicker
                    label="Pick Up Date"
                    value={loadDetails.pick_up_date}
                    onChange={(newValue) => handleDateChange('pick_up_date', newValue)}
                    sx= {{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused': {
                          '& .MuiInputLabel-outlined': {
                            color: '#2DBFFD',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2DBFFD',
                          },
                        },
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2DBFFD',
                          },
                        },
                      },
                    }}
                    renderInput={(params) => <TextField fullWidth variant="outlined" {...params} />}
                />

                <TextField fullWidth variant="outlined" label="Pick Up Time" name="pick_up_time" value={loadDetails.pick_up_time || ""} onChange={handleChange} type="time" InputLabelProps={{ shrink: true }} 
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

                <DatePicker
                    label="Delivery Date"
                    value={loadDetails.delivery_date}
                    onChange={(newValue) => handleDateChange('delivery_date', newValue)}
                    sx= {{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused': {
                          '& .MuiInputLabel-outlined': {
                            color: '#2DBFFD',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2DBFFD',
                          },
                        },
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2DBFFD',
                          },
                        },
                      },
                    }}
                    renderInput={(params) => <TextField fullWidth variant="outlined" {...params}/>}
                />

                <TextField fullWidth variant="outlined" label="Delivery Time" name="delivery_time" value={loadDetails.delivery_time || ""} onChange={handleChange} type="time" InputLabelProps={{ shrink: true }} 
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
            </Box>
          </LocalizationProvider>

          <FormControl fullWidth variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2DBFFD',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2DBFFD',
              }
            }}
          >
              <InputLabel 
                id="payment-term-label"
                sx={{
                  '&.Mui-focused': {
                    color: '#2DBFFD'
                  }
                }}
              >
                Payment Term
              </InputLabel>
              <Select
                  labelId="payment-term-label"
                  name="payment_term"
                  value={loadDetails.payment_term}
                  onChange={handleChange}
                  label="Payment Term"  // required for floating label
              >
                  <MenuItem value={"upon delivery"}>Upon Delivery</MenuItem>
                  <MenuItem value={"net-30 days"}>Net-30 Days</MenuItem>
              </Select>
          </FormControl>

          <FormControlLabel
            fullWidth
            control={
              <Checkbox
                  checked={loadDetails.hazmat}
                  onChange={(e) => setLoadDetails(prevState => ({ ...prevState, hazmat: e.target.checked }))}
                  name="hazard_requirement"
                  color="primary"
                  icon={<CheckBoxOutlineBlankIcon fontSize="medium" style={{ color: "#000" }} />}  // set explicit color
                  checkedIcon={<CheckBoxIcon fontSize="medium" style={{ color: "#000" }} />} // set explicit color
              />
            }
            label="Hazard Requirement"
          />

          <TextField
              fullWidth
              variant="outlined"
              label="Freight Type"
              value={loadDetails.freight_type}
              onChange={(e) => setLoadDetails(prev => ({ ...prev, freight_type: e.target.value }))}
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

          <TextField
              fullWidth
              variant="outlined"
              label="Freight Weight"
              value={loadDetails.freight_weight}
              onChange={(e) => setLoadDetails(prev => ({ ...prev, freight_weight: e.target.value }))}
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

          <TextField
              fullWidth
              variant="outlined"
              label="Dimension Length"
              value={loadDetails.dimension_length}
              onChange={(e) => setLoadDetails(prev => ({ ...prev, dimension_length: e.target.value }))}
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

          <TextField
              fullWidth
              variant="outlined"
              label="Dimension Width"
              value={loadDetails.dimension_width}
              onChange={(e) => setLoadDetails(prev => ({ ...prev, dimension_width: e.target.value }))}
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

          <TextField
              fullWidth
              variant="outlined"
              label="Dimension Height"
              value={loadDetails.dimension_height}
              onChange={(e) => setLoadDetails(prev => ({ ...prev, dimension_height: e.target.value }))}
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

          <TextField
              fullWidth
              variant="outlined"
              label="Freight Description"
              value={loadDetails.freight_description}
              onChange={(e) => setLoadDetails(prev => ({ ...prev, freight_description: e.target.value }))}
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

          <TextField
              fullWidth
              variant="outlined"
              label="Trailer Needed"
              value={loadDetails.trailer_needed}
              onChange={(e) => setLoadDetails(prev => ({ ...prev, trailer_needed: e.target.value }))}
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

          <TextField
              fullWidth
              variant="outlined"
              label="Special Equipment Description"
              value={loadDetails.special_equipment_description}
              onChange={(e) => setLoadDetails(prev => ({ ...prev, special_equipment_description: e.target.value }))}
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

          <TextField
              fullWidth
              variant="outlined"
              label="Rate"
              value={loadDetails.rate}
              onChange={(e) => setLoadDetails(prev => ({ ...prev, rate: e.target.value }))}
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

          <TextField
              fullWidth
              variant="outlined"
              label="Check-In Instruction"
              value={loadDetails.check_in_instruction}
              onChange={(e) => setLoadDetails(prev => ({ ...prev, check_in_instruction: e.target.value }))}
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

          <TextField
              fullWidth
              variant="outlined"
              label="Reference Number"
              value={loadDetails.reference_number}
              onChange={(e) => setLoadDetails(prev => ({ ...prev, reference_number: e.target.value }))}
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

          {/* Submit Button and Alert */}
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}
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
              Load submitted successfully!
          </Alert>
        </Collapse>

          {error && <Typography color="error">{error}</Typography>}
      </Box>
  );
}

export default AddLoadTab;

