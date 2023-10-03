import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from 'state/api';
import { Box, FormControl, InputLabel, Input, useTheme, Typography, Button } from "@mui/material";
import { useSignIn } from 'react-auth-kit';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const login = useSignIn();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [loginUser] = useLoginUserMutation();

  const onSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Both email and password are required.');
      return;
    }

    try {
      const result = await loginUser({ email, password });
      if (result.data.token) {
        console.log("result.data.user", result.data.user);
        login({
          token: result.data.token,
          expiresIn: 3600 * 24 * 1000, 
          tokenType: "Bearer",
          authState: {user: result.data.user}
        });
        navigate('/dashboard');
      } else {
        console.log("result.error", result);
        setError('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
    }
  }

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
        }}
      >
        <Typography variant="h4" mb={4} sx={{color: "#2DBFFD"}}>
          Login
        </Typography>

        <FormControl fullWidth sx={{mb: 5}}>
          <InputLabel sx={{fontSize: "18px"}}>Email</InputLabel>
          <Input id="email" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}
            sx={{
              "&:before": { // This is the default underline
                borderBottom: "1px solid black"
              },
              "&:hover:not(.Mui-disabled):before": { // This is the hover state
                borderBottom: "1px solid black"
              },
              "&:after": { // This is the underline for the focused state
                borderBottom: "1px solid black"
              }
            }}
          ></Input>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel sx={{fontSize: "18px"}}>Password</InputLabel>
          <Input id="password" type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}
            sx={{
              "&:before": { // This is the default underline
                borderBottom: "1px solid black"
              },
              "&:hover:not(.Mui-disabled):before": { // This is the hover state
                borderBottom: "1px solid black"
              },
              "&:after": { // This is the underline for the focused state
                borderBottom: "1px solid black"
              }
            }}
          />
        </FormControl>

        {error ? <Typography color="error">{error}</Typography> : null}

        <Box mt={3}>
          <Button variant="contained" color="primary" fullWidth onClick={onSubmit}
            sx={{backgroundColor: theme.palette.primary[100], color: "white", fontSize: "1rem", boxShadow: "none"}}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
