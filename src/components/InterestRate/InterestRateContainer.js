import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import  { strings } from '../../lang.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
}));

export default function InterestRateContainer(props) {
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
        <h2>{strings.mortgageRateTitle}</h2>
        <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
                <Typography gutterBottom>
                    ScotiaBank 1.94%
                </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.handleSelectRate(1.94)}
                >
                    {strings.select}
                </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Typography gutterBottom>
                    CIBC 1.88%
                </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.handleSelectRate(1.88)}
                >
                    {strings.select}
                </Button>
            </Grid>
        </Grid>
    </div>
  );

  return (
      <Modal
        open={props.modalVisible}
        onClose={props.handleCloseInterestRates}
        aria-labelledby="interest-rates-modal-title"
        aria-describedby="interest-rates-modal-description"
      >
        {body}
      </Modal>

  );
}