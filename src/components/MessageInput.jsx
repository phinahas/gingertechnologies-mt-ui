

import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

function MessageInput({
  onSendBtnFn
}) {
  
  const [input, setInput] = useState('');


  const handleSend = () => {
    if (input.trim()) {
   
      onSendBtnFn(input)
      setInput(''); 
    }
  };

  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', display: 'flex', alignItems: 'center' }}>
     
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        variant="outlined"
      />
    
      <IconButton color="primary" onClick={handleSend} disabled={!input.trim()}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default MessageInput;