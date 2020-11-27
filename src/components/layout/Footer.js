import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
    color: theme.palette.primary.textDefault
  },
}));

const Copyright = () => {
  return (
    <Typography variant="body2"  align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://d.buzz">
        D.Buzz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = (props) => {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          {description}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default Footer;
