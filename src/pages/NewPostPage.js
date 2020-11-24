import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Chip from '@material-ui/core/Chip';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  titleStyle: {
    margin: theme.spacing(1, 0)
  },

  container: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 0, 50)
  },

  postBtn: {
    backgroundColor: '#fff',
    borderColor: '#e61c34',
    color: '#e31337',
    boxShadow: 'none',
    '&:hover': {
      color: '#e31337',
      backgroundColor: '#fff'
    },
    margin: theme.spacing(1),
  },

  cancelBtn: {
    backgroundColor: '#fff',
    borderColor: '#e61c34',
    color: '#212529',
    boxShadow: 'none',
    '&:hover': {
      color: '#e31337',
      backgroundColor: '#fff'
    },
    margin: theme.spacing(1),
  },

  chipStyle: {
    margin: theme.spacing(0,0,0,1),
  }

}));


const NewPostPage = () => {

  const classes = useStyles();

  const [body, setBody] = React.useState('');

  const [hashtags, setHashtags] = React.useState([]);

  const [isView, setIsView] = React.useState(false);


  return (
    <Container>
      <Grid className={classes.container} container spacing={2}>
        <Grid item md={12} xs={12}>
          <FormControlLabel
            control={<Switch checked={isView} onChange={(e) => setIsView(e.target.checked)} name="Preview" />}
            label="Preview"
          />

          <Button
            color="primary"
            size="medium"
            className={classes.postBtn}
            startIcon={<SaveIcon />}
          >Post</Button>

          <Button
            color="primary"
            size="medium"
            className={classes.cancelBtn}
            startIcon={<SaveIcon />}
          >Cancel</Button>
        </Grid>

        {isView ? (
          <Grid item md={12} xs={12}>
            <div style={{ overflowX: 'scroll', marginBottom: '15px' }} dangerouslySetInnerHTML={{ __html: body }}></div>
            {hashtags.map(e => (
              <Chip key={e} className={classes.chipStyle} label={`#${e}`} color="default" />
            ))}
          </Grid>
        ) : (
            <React.Fragment>
              <Grid item md={12} xs={12}>
                <TextField
                  className={classes.titleStyle}
                  label="Post Title"
                  fullWidth
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <ReactQuill
                  modules={{
                    toolbar: {
                      container: [
                        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
                        [{ size: [] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'video'],
                        ['link', 'image', 'video'],
                        ['clean'],
                        ['code-block']
                      ]
                    }
                  }}
                  theme="snow"
                  value={body}
                  onChange={(v) => setBody(v)}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                 className={classes.titleStyle}
                 label="Hashtags (Separate with spaces)"
                 fullWidth
                 value={hashtags.join(" ")}
                 onChange={(ev) => setHashtags(ev.target.value.split(" "))}
                />
              </Grid>
            </React.Fragment>
          )}

      </Grid>
    </Container>
  )
}

export default NewPostPage;
