import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import  { strings } from '../../lang.js';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function Calculator(props) {
    const classes = useStyles();
    return <Container component="main" maxWidth="sm">
    <div className={classes.paper}>
    <Typography component="h1" variant="h5">
        {strings.mortgageCalculator}
    </Typography>
    {props.isLoading && <CircularProgress />}
    <Typography component="h2" variant="h5" data-testid="mortgage-payment">
        {props.mortgagePaymentResult}
    </Typography>
    <form className={classes.form} noValidate onSubmit={props.handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Typography id="property-price" gutterBottom>
                {strings.propertyPrice}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Slider
                    value={props.propertyPrice}
                    onChange={props.handlePropertyPriceChange}
                    getAriaValueText={props.dollarValue}
                    aria-labelledby="property-price"
                    step={1000}
                    min={400000}
                    max={2000000}
                    data-testid="property-price-input"
                />
            </Grid>
            <Grid item xs={6} sm={2}>
                <Typography id="property-price-value" gutterBottom>
                    ${props.propertyPrice}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography id="down-payment" gutterBottom>
                    {strings.downPayment}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Slider
                    value={props.downPayment}
                    onChange={props.handleDownPaymentChange}
                    getAriaValueText={props.percentValue}
                    aria-labelledby="down-payment"
                    step={1}
                    min={5}
                    max={100}
                    valueLabelDisplay="auto"
                    data-testid="down-payment-input"
                />
            </Grid>
            <Grid item xs={6} sm={2}>
                <Typography id="down-payment-value" gutterBottom>
                    {props.downPayment}%
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography id="interest-rate" gutterBottom>
                    {strings.interestRate}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Slider
                    value={props.interestRate}
                    onChange={props.handleInterestRateChange}
                    getAriaValueText={props.percentValue}
                    aria-labelledby="interest-rate"
                    step={0.01}
                    min={0}
                    max={10}
                    valueLabelDisplay="auto"
                    data-testid="interest-rate-input"
                />
                
            </Grid>
            <Grid item xs={6} sm={2}>
                <Typography id="interest-rate-value" gutterBottom>
                    {props.interestRate}%
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    data-testid="select-rates-btn"
                    onClick={props.handleViewInterestRates}
                >
                    {strings.getRate}
                </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography id="amortization-period" gutterBottom>
                    {strings.amortizationPeriod}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Slider
                    value={props.amortizationPeriod}
                    onChange={props.handleAmortizationPeriodChange}
                    getAriaValueText={props.yearValue}
                    aria-labelledby="amortization-period"
                    step={5}
                    min={5}
                    max={30}
                    valueLabelDisplay="auto"
                    data-testid="amortization-period-input"
                />
            </Grid>
            <Grid item xs={6} sm={2}>
                <Typography id="amortization-period-value" gutterBottom>
                    {props.amortizationPeriod} {strings.years}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography id="payment-schedule" gutterBottom>
                    {strings.paymentSchedule}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="payment-schedule" name="payment-schedule" value={props.paymentSchedule} onChange={props.handlePaymentScheduleChange}>
                        <FormControlLabel value="BIWKLY" control={<Radio />} label={strings.biweekly} />
                        <FormControlLabel value="ACC_BIWKLY" control={<Radio />} label={strings.accBiweekly} />
                        <FormControlLabel value="MTHLY" control={<Radio />} label={strings.monthly} />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            data-testid="calculate-btn"
        >
            {strings.calculate}
        </Button>
        <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={props.handleReset}
            data-testid="reset-btn"
        >
            {strings.reset}
        </Button>
        <Grid container justify="flex-end">
        <Grid item>

        </Grid>
        </Grid>
    </form>
    </div>
</Container>
};
