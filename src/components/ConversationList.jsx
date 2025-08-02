
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Badge } from '@mui/material';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';



function ConversationList({

  userList = [],
  selectAUserForChat,
  selectedUser = null

}) {



  const handleSelect = (id) => {
    selectAUserForChat(id);
 
  };

  const selectedUserStyle = {
    border: '1px solid black'
  }

  return (
    <List className="chat-sidebar">
      {userList.map((conv) => (
        <ListItem

          key={conv._id}
          
          selected={selectedUser === conv._id} 
          onClick={() => handleSelect(conv._id)}
          sx={{
              cursor: 'pointer',
            ...(conv._id == selectedUser && selectedUserStyle),
            ...(conv.newMessage && {
              backgroundColor: '#f0f8ff',
              fontWeight: 'bold',
            }),
          }}
        >
          
          <ListItemAvatar >


            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              badgeContent={
                <MapsUgcIcon style={{ fontSize: 20, backgroundColor: 'black', color: 'white', borderRadius: '50%' }} />
              }
              invisible={!conv.newMessage} 
            >
              <Avatar>{conv.username[0]}</Avatar>
            </Badge>


          </ListItemAvatar>
          
          <ListItemText
            primary={conv.username}
            secondary={
              conv.newMessage ?
                <Typography variant="body2" color="textSecondary" noWrap>
                  new message
                </Typography> : null
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default ConversationList;