import React, { useState } from 'react';
import Calculator from './Calculator.js';
import { calculate } from '../../services/mortgage.js';
import  { strings } from '../../lang.js';
import InterestRateContainer from '../InterestRate/InterestRateContainer.js'

export default function CalculatorContainer() {
  const [propertyPrice, setPropertyPrice] = useState(400000);
  const [paymentSchedule, setPaymentSchedule] = useState('BIWKLY');
  const [downPayment, setDownPayment] = useState(5);
  const [interestRate, setInterestRate] = useState(2);
  const [amortizationPeriod, setAmortizationPeriod] = useState(5);
  const [province, setProvince] = useState('BC');
  const [mortgagePayment, setMortgagePayment] = useState('');
  const [mortgagePaymentResult, setMortgagePaymentResult] = useState('--');
  const [isLoading, setIsLoading] = useState(false);  
  const [modalVisible, setModalVisible] = useState(false);

  const dollarValue = (value) => {
    return `$${value}`;
  }

  const percentValue = (value) => {
      return `${value}%`;
  }

  const yearValue = (value) => {
      if (value > 1) {
          return `${value} years`;
      } else {
          return `${value} year`;
      }
  }

  const getScheduleLabel = (value) => {
    switch (value) {
      case 'BIWKLY':
        return strings.biweekly;
      case 'MTHLY':
        return strings.monthly;
      case 'ACC_BIWKLY':
        return strings.accBiweekly;
      default:
        return '';
    }
  }
  
  const generateMortgagePaymentResults = (value) => {
    if (value.length === 0) {
      return '';
    }

    let scheduleLabel = getScheduleLabel(paymentSchedule);
    let formattedString = strings.formatString(strings.mortgagePaymentResult, value, scheduleLabel);
    setMortgagePaymentResult(formattedString);
  }

  const generateMortgagePaymentError = (err) => {
    // TODO: localize and match by error code
    let errorMessage = 'Something went wrong';
    if (err.length > 0) {
      errorMessage = `${errorMessage}. Error: ${err}`
    }

    setMortgagePaymentResult(errorMessage);
  }

  const handlePaymentScheduleChange = (event) => {
    setPaymentSchedule(event.target.value);
  };

  const handlePropertyPriceChange = (event, newValue) => {
    setPropertyPrice(newValue);
  };

  const handleDownPaymentChange = (event, newValue) => {
    setDownPayment(newValue);
  };

  const handleInterestRateChange = (event, newValue) => {
    setInterestRate(newValue);
  };

  const handleAmortizationPeriodChange = (event, newValue) => {
    setAmortizationPeriod(newValue);
  };

  const handleSelectRate = (value) => {
    setInterestRate(value);
    handleCloseInterestRates();
  }

  const handleViewInterestRates = () => {
    setModalVisible(true);
  };

  const handleCloseInterestRates = () => {
    setModalVisible(false);
  };

  const handleReset = () => {
    setPropertyPrice(0);
    setDownPayment(5);
    setInterestRate(0);
    setAmortizationPeriod(5);
    setPaymentSchedule('');
    setMortgagePayment('');
    setMortgagePaymentResult('--');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    //TODO: react-redux
    try {
      let result = await calculate({propertyPrice, downPayment, interestRate, amortizationPeriod, paymentSchedule, province});
      let pps = result.paymentPerSchedule;
      setIsLoading(false);
      setMortgagePayment(pps);
      generateMortgagePaymentResults(pps);
    } catch (err) {
      setIsLoading(false);
      setMortgagePayment('--');
      generateMortgagePaymentError(err.error);
    }

  }

  const getBankRates = () => {
    // TODO: Find publicly accessible api to retrieve bank mortgage rates

    return {

    }
  }

  return <>
    <InterestRateContainer 
      handleCloseInterestRates={handleCloseInterestRates}
      handleSelectRate={handleSelectRate}
      modalVisible={modalVisible}
    />
    <Calculator 
        propertyPrice={propertyPrice} 
        downPayment={downPayment} 
        interestRate={interestRate} 
        amortizationPeriod={amortizationPeriod} 
        paymentSchedule={paymentSchedule}
        isLoading={isLoading}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        handleAmortizationPeriodChange={handleAmortizationPeriodChange}
        handleDownPaymentChange={handleDownPaymentChange}
        handlePropertyPriceChange={handlePropertyPriceChange}
        handleInterestRateChange={handleInterestRateChange}
        handlePaymentScheduleChange={handlePaymentScheduleChange}
        handleViewInterestRates={handleViewInterestRates}
        mortgagePayment={mortgagePayment}
        dollarValue={dollarValue}
        yearValue={yearValue}
        percentValue={percentValue}
        mortgagePaymentResult={mortgagePaymentResult}
    />
  </>;

}