import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { BrowserRouter as Router, Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import PostsPage from './PostsPage';
import RepliesPage from './RepliesPage';
import FollowersPage from './FollowersPage';
import FollowingPage from './FollowingPage';
import SettingsPage from './SettingsPage';

const useStyles = makeStyles(theme => ({

  profileCard: {
    backgroundColor: theme.palette.primary.backgroundPrimary
  },

  coverPhoto: {
    height: 0,
    paddingTop: '32.25%'
  },

  avatar: {
    marginTop: -70,
    marginLeft: theme.spacing(3),
    width: theme.spacing(16),
    height: theme.spacing(16),
  },

  optionBtnsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  }

}));

const ReputationBadge = withStyles(theme => ({
  badge: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '0 8px'
  }
}))(Badge);

const ProfilePage = () => {
  const classes = useStyles();

  const image = 'https://source.unsplash.com/random';
  const avatar = 'https://www.w3schools.com/howto/img_avatar.png';

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.profileCard}>
            <CardMedia
              className={classes.coverPhoto}
              image={image}
              title="Cover photo"
            />
            <Avatar src={avatar} className={classes.avatar} />
            <CardContent>
              <ReputationBadge badgeContent={4} color="default">
                <Typography style={{ margin: 0 }} variant="h5">
                  Walter O Brien
                </Typography>
              </ReputationBadge>
              <Typography variant="body2" gutterBottom>
                @walterobrien
              </Typography>
              <Typography variant="body1">
                Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
              </Typography>
              <p><strong>0</strong> Following  <strong>1</strong>  Follower</p>

              <div className={classes.optionBtnsContainer}>
                <ButtonGroup variant="text" color="primary" aria-label="contained primary button group">
                  <Button
                    component={Link}
                    to="/profile/posts"
                  >Posts</Button>
                  <Button
                    component={Link}
                    to="/profile/replies"
                  >Replies</Button>
                  <Button
                    component={Link}
                    to="/profile/followers"
                  >Followers</Button>
                  <Button
                    component={Link}
                    to="/profile/following"
                  >Following</Button>
                  <Button
                    component={Link}
                    to="/profile/settings"
                  >Settings</Button>
                </ButtonGroup>
              </div>

                  <Route path="/profile/posts" component={PostsPage} />
                  <Route path="/profile/replies" component={RepliesPage} />
                  <Route path="/profile/followers" component={FollowersPage} />
                  <Route path="/profile/following" component={FollowingPage} />
                  <Route path="/profile/settings" component={SettingsPage} />

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ProfilePage;
