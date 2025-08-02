import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';

import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function MessageDisplayPage() {
    const navigate = useNavigate();
    const { message } = useParams();

    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ fontFamily: 'Poppins !important', }}>

      <Grid item xs={10} sm={10} md={6} lg={6} p={2} mt={{xs:'25%',sm:'25%',md:'15%',lg:'15%'}} 
      //sx={{ border: '1px solid grey',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '12px' }}
      >
          <Grid container >
            <Grid item  xs={12} sm={12} lg={12} display={'flex'} justifyContent={'center'} >
              <ErrorOutlineOutlinedIcon sx={{fontSize:'4em !important',color:'orange'}} />
            </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} m={0.5} display={'flex'} justifyContent={'center'} sx={{ fontSize: { xs: '1em', sm:'1em', md:'1em', lg: '1.2em' } }}  > 
                {message}
              </Grid>

          </Grid>
          <Grid container >
          <Grid item  xs={12} sm={12} lg={12} display={'flex'} justifyContent={'center'} >
          <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
            </Grid>
         
          </Grid>

        
      </Grid>

  </Grid>
    );
}

export default MessageDisplayPage;
