import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import theme from "./theme";
import "./assets/styles.css";
import AppRoutes from "./AppRoutes";

// Redux actions
import { SET_TOKEN, SET_USER } from "./store/actions";

// Services
import { GET_user } from "./services/authServices";

//ui-components
import Loader from './components/ui-components/loader/Loader';

//socket
import { connectSocket } from './socket/socket'
import { TOKEN_NAME } from "./config/constants";

function App() {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true)



  useEffect(() => {

    setLoading(true)
    const storedToken = localStorage.getItem(TOKEN_NAME);
    if (!storedToken) {
      setLoading(false)
      return
    }

    get_User();
  }, []);

  const get_User = async () => {
    try {
      const response = await GET_user();
      if (response?.user) {
        dispatch({
          type: SET_USER,
          payload: response.user,
        });
        const storedToken = localStorage.getItem(TOKEN_NAME);
        dispatch({
          type: SET_TOKEN,
          payload: JSON.parse(storedToken)
        })
        connectSocket()
        setLoading(false)

      } else {
        setLoading(false)


      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false)


    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? <><Loader openState={loading} /></> : <AppRoutes />}
    </ThemeProvider>
  );
}

export default App;
