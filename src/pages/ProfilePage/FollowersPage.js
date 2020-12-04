import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import SaveIcon from '@material-ui/icons/Save';
import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

const FollowersPage = () => {

  const avatar = 'https://www.w3schools.com/howto/img_avatar.png';
  const avatar1 = 'https://www.w3schools.com/w3images/avatar4.png';
  const avatar2 = 'https://www.w3schools.com/w3images/avatar5.png';
  const avatar3 = 'https://www.w3schools.com/w3images/avatar2.png';

  return (
    <Fragment>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Profile 1" src={avatar3} />
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <Fragment>
                <Typography variant="overline">Frank Lou</Typography> -
                @frankenstate
              </Fragment>
            }

            secondary={
              <Fragment>
                <Typography
                  component="p"
                  variant="caption"
                  color="textSecondary"
                  align="justify"
                >
                  {"I'll be in your neighborhood doing errands this…" + `Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    
                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.`}
                </Typography>

              </Fragment>
            }
          >

          </ListItemText>
        </ListItem>
      </List>
    </Fragment>
  )
}

export default FollowersPage;
