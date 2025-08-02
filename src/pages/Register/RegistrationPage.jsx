import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useNavigate } from 'react-router-dom';

//ui-components
import Snackbar from '../../components/ui-components/Snackbar/Snackbar';
import Loader from '../../components/ui-components/loader/Loader';

//api-services
import { POST_register } from '../../services/authServices';

//hooks
import { handleCatchBlock } from '../../hooks/catchBlock';
import { useDispatch } from "react-redux";

const RegisterPage = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch()


  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

  const closeSnackbar = () => setSnackbarState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) tempErrors.username = "Username is required";
    if (!emailRegex.test(formData.email))
      tempErrors.email = "Please enter a valid email address";
    if (!formData.password) tempErrors.password = "Password is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      
      post_register();
    }
  };



   const post_register = async () => {
  
      try {
        setLoading(true)
        let res = await POST_register(formData);
        
        setSnackbarMessage(res.message);
        setSnackbarSeverity('success');
        setSnackbarState(true);
        setLoading(false)
  
      } catch (error) {
        handleCatchBlock(error, navigate, dispatch);
        setLoading(false)
  
      }
  
    }

  return (

    <>
      <Loader openState={loading} />
      <Snackbar message={snackbarMessage} openStatus={snackbarState} severity={snackbarSeverity} onCloseFunction={closeSnackbar} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh", backgroundColor: "#f0f2f5", px: 2 }}
      >
        <Grid item xs={12} sm={8} md={4}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Create an Account
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                required
                error={!!errors.username}
                helperText={errors.username}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
              >
                Register
              </Button>
            </form>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3, color: "text.secondary" }}
            >
              Already a user?{" "}
              <Link href="/login" underline="hover">
                Login here
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>

  );
};

export default RegisterPage;
