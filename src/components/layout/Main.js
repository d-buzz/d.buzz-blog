import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';



const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

const Main = (props) => {
  const classes = useStyles();
  const { posts, title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider style={{marginBottom:'10px'}} />
      {/*** POST 1 */}
      <Typography
        gutterBottom={true}
        variant="h5"
      >Sample blog post</Typography>
      <Typography
        gutterBottom={true}
        variant="subtitle1"
      >April 1, 2020 by <Link>Olivier</Link></Typography>
      <Typography
        paragraph={true}
        style={{textAlign:'justify'}}
      >
      This blog post shows a few different types of content that are supported and styled with
Material styles. Basic typography, images, and code are all supported.
You can extend these by modifying `Markdown.js`. <br/><br/>

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. <br/><br/>

Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo.
Nullam id dolor id nibh ultricies vehicula ut id elit.

Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
Aenean lacinia bibendum nulla sed consectetur.
      </Typography>

      <Typography
        gutterBottom={true}
        variant="h5"
      >Heading</Typography>

      <Typography
        paragraph={true}
        style={{textAlign:'justify'}}
      >Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </Typography>

      <Typography
        gutterBottom={true}
        variant="h6"
      >Sub-heading</Typography>
      <Typography
        paragraph={true}
        style={{textAlign:'justify'}}
      >Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </Typography>
      
      <Typography
        gutterBottom={true}
        variant="h6"
      >Sub-heading</Typography>
      <Typography
        paragraph={true}
        style={{textAlign:'justify'}}
      >Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
      </Typography>

      <ul>
        <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
        <li>Donec id elit non mi porta gravida at eget metus.</li>
        <li>Nulla vitae elit libero, a pharetra augue.</li>
      </ul>

      <Typography
        paragraph={true}
        style={{textAlign:'justify'}}
      >
      Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.
      </Typography>

      <ol>
        <li>Vestibulum id ligula porta felis euismod semper.</li>
        <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
        <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>
      </ol>
    </Grid>
  )
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};

export default Main;
