import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import DBuzzLogo from '../components/common/DBuzzLogo';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(15),
    paddingBottom: theme.spacing(33),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },


  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },

  submit: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: '#fff',
    borderColor: '#e61c34',
    color: '#e31337',
    boxShadow: 'none',
    '&:hover': {
      color: '#e31337',
      backgroundColor: '#fff'
    }
  }
}));

const LoginPage = () => {
  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();

    alert('Submit!!!');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <DBuzzLogo />
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            size="small"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="postingkey"
            label="Posting Key"
            type="password"
            id="password"
            size="small"
          />
          <Button
            type="submit"
            fullWidth
            color="default"
            className={classes.submit}
          >Sign in</Button>
        </form>
      </div>
    </Container>
  )
}

export default LoginPage;
