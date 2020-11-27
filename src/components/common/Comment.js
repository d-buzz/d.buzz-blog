import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import SaveIcon from '@material-ui/icons/Save';


import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({

  spacing: {
    marginTop: "25px",
  },

  header: {
    marginTop: "10px",
    fontWeight: 600
  },

  margin: {
    margin: theme.spacing(1),
  },

  commentBtn: {
    backgroundColor: theme.palette.primary.backgroundPrimary,
    borderColor: theme.palette.primary.main,
    boxShadow: 'none',
    color:  theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.textDefault,
      backgroundColor: theme.palette.primary.backgroundPrimary
    },
    margin: theme.spacing(1, 0, 3),
  },

  replyBtn: {
    backgroundColor: theme.palette.primary.backgroundPrimary,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    boxShadow: 'none',
    '&:hover': {
      color: theme.palette.primary.textDefault,
      backgroundColor: theme.palette.primary.backgroundPrimary
    },
  },

  userAvatar: {
    margin: theme.spacing(1, 0, 3),
  },

  votingBtnRoot: {
    marginTop: "7px"
  },

  voteBtn: {
    backgroundColor: theme.palette.primary.backgroundPrimary,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    boxShadow: 'none',
    '&:hover': {
      color: theme.palette.primary.textDefault,
      backgroundColor: theme.palette.primary.backgroundPrimary
    },
  },

  secondaryAction: {
    position: 'relative',
    margin: theme.spacing(0, 0, 0, 11),
    bottom: 0,
    marginTop: '20px'
  },

  commentsActions: {
    position: 'relative',
    margin: theme.spacing(0, 0, 0, 11),
    bottom: 0,
    marginTop: '20px'
  }


}));


const Comment = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline>
        <Container>

          <Grid container justify="space-between" className={classes.spacing}>
            <Grid item xs={12}>
              <Typography className={classes.header} variant="h4" gutterBottom>Comments Section</Typography>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item >
                    <AccountCircle className={classes.userAvatar} />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      id="input-with-icon-grid"
                      label="Write your comment here..."
                      style={{ margin: 8 }}
                      fullWidth
                      margin="normal"
                      multiline
                      rows="3"
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      size="medium"
                      className={classes.commentBtn}
                      startIcon={<SaveIcon />}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>

          {/** Comments */}
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <React.Fragment>
                    <Typography variant="body1">Mark Collins</Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="p"
                      variant="caption"
                      color="textSecondary"
                      align="justify"
                    >
                      {"I'll be in your neighborhood doing errands this…" + `Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    
                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.`}
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                      spacing={2}
                      className={classes.votingBtnRoot}
                    >
                      <Grid item>
                        <Badge
                          badgeContent={4}
                          color="default"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                        >
                          <ThumbUpIcon
                            className={classes.voteBtn}
                            fontSize="default"
                          />
                        </Badge>
                      </Grid>
                      <Grid item>
                        <Badge
                          badgeContent={4}
                          color="default"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                        >
                          <ThumbDownIcon
                            className={classes.voteBtn}
                            fontSize="default"
                          />
                        </Badge>
                      </Grid>
                      <Grid item>
                        <Button className={classes.replyBtn}>Reply</Button>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <React.Fragment>
                    <Typography variant="body1">Walter O'Brien</Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="p"
                      variant="caption"
                      color="textSecondary"
                      align="justify"
                    >
                      {"I'll be in your neighborhood doing errands this…" + `Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    
                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.`}
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                      spacing={2}
                      className={classes.votingBtnRoot}
                    >
                      <Grid item>
                        <Badge
                          badgeContent={4}
                          color="default"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                        >
                          <ThumbUpIcon
                            className={classes.voteBtn}
                            fontSize="default"
                          />
                        </Badge>
                      </Grid>
                      <Grid item>
                        <Badge
                          badgeContent={4}
                          color="default"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                        >
                          <ThumbDownIcon
                            className={classes.voteBtn}
                            fontSize="default"
                          />
                        </Badge>
                      </Grid>
                      <Grid item>
                        <Button className={classes.replyBtn}>Reply</Button>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Container>
      </CssBaseline>
    </React.Fragment>
  )
}

export default Comment;
