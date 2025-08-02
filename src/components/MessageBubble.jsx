import {convertUTCToLocalWithLuxon} from '../utils/utils'




import { Box, Typography, Paper } from '@mui/material';
import { useMemo } from 'react';

function MessageBubble({ message, loggedInUser }) {
  
 
  const isSent = useMemo(() => message.sender === loggedInUser, [loggedInUser]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isSent ? 'flex-end' : 'flex-start', 
        mb: 1, 
      }}
    >
      <Paper
        elevation={1}
        sx={{
          maxWidth: '60%',
          p: 1.5, 
          bgcolor: isSent ? 'primary.light' : 'grey.200', 
          borderRadius: isSent ? '16px 16px 0 16px' : '16px 16px 16px 0', 
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
        <Typography variant="caption" color="textSecondary">
          {convertUTCToLocalWithLuxon(message.createdAt)  }
        </Typography>
      </Paper>
    </Box>
  );
}

export default MessageBubble;