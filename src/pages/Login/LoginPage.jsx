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
import { POST_login } from '../../services/authServices';

//socket
import {connectSocket} from '../../socket/socket'

//hooks
import { handleCatchBlock } from '../../hooks/catchBlock';

//Redux
import { SET_USER, SET_TOKEN } from '../../store/actions'
import { useDispatch } from 'react-redux'

//utils
import { setLocalStorage } from '../../utils/localstorageFns'
import { TOKEN_NAME } from "../../config/constants";

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });


  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

  const closeSnackbar = () => setSnackbarState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      setSnackbarMessage("Please fill in all fields");
      setSnackbarSeverity("error");
      setSnackbarState(true);
      return;
    }
    post_Login()
  };

  const post_Login = async () => {

    try {
      setLoading(true)
      let res = await POST_login(formData);

      dispatch({ type: SET_USER, payload: res.user });
      dispatch({ type: SET_TOKEN, payload: res.token });
      setLocalStorage(TOKEN_NAME, res.token);
      setSnackbarMessage(res.message);
      setSnackbarSeverity('success');
      setSnackbarSeverity(true);
      setLoading(false);
      connectSocket()
      navigate('/chat');

    } catch (error) {
      handleCatchBlock(error, navigate,dispatch);
      setLoading(false)

    }

  }

  return (
    <>

      <Loader loading={loading} />
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
              Welcome Back
            </Typography>

            <Typography
              variant="subtitle1"
              align="center"
              gutterBottom
              color="text.secondary"
            >
              Please login to your account
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
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
                Login
              </Button>
            </form>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3, color: "text.secondary" }}
            >
              Not a user?{" "}
              <Link href="/register" underline="hover">
                Sign up here
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>

  );
};

export default LoginPage;
