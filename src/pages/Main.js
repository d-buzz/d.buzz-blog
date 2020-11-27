import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PostPage from './PostPage';
import NewPostPage from './NewPostPage';
import LoginPage from './LoginPage';


const useStyles = makeStyles((theme) => ({
  pageStyle: {
    backgroundColor: theme.palette.primary.backgroundPrimary,
  },
  root: {
    backgroundColor: theme.palette.primary.backgroundPrimary
  }
}));

const sections = [
  { title: 'Posts', url: '#' },
  { title: 'Proposals', url: '#' },
  { title: 'Witnesses', url: '#' },
  { title: 'Our dApps', url: '#' },
];

const Main = () => {
  const classes = useStyles();


  return (
    <div className={classes.root} >
      <Router>
        <CssBaseline />
        <Container className={classes.pageStyle} maxWidth="lg">
          <Header title="D.App Post" sections={sections} />
          <Switch>
            <Route path="/post" component={PostPage} />
            <Route path="/new-post" component={NewPostPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Container>
        <Footer title="D.Buzz" description="The long post view for D.Buzz platform!" />
      </Router>
    </div>
  );
}

export default Main;
