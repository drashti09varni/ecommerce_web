import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OtpForm = ({nextStep}) => {
  const storedEmail = localStorage.getItem('email') || '';
  const [isVerifyInProgress, setVerifyInProgress] = useState(false);
  const [isVerifyButtonVisible, setVerifyButtonVisible] = useState(true);
  const [isOtpVerified, setOtpVerified] = useState(false); 
  const [isResendInProgress, setResendInProgress] = useState(false);
  const [isResendButtonVisible, setResendButtonVisible] = useState(false);

  const [isVerifyLoading, setVerifyLoading] = useState(false);

  // const firstThreeCharacters = storedEmail.slice(0, 3);
  // const lastSixCharacters = storedEmail.slice(-6);
  // const middleAsterisks = storedEmail.length - 9;
  // const maskedMiddle = '*'.repeat(middleAsterisks);

  // const maskedEmail = `${firstThreeCharacters}${maskedMiddle}${lastSixCharacters}`;

  const [timeLeft, setTimeLeft] = useState(60);
  const [otpValue, setOtpValue] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        setVerifyButtonVisible(false);
        setResendButtonVisible(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = async () => {
    try {
      setVerifyInProgress(true);
      setVerifyLoading(true); 
      const response = await fetch('http://localhost:4800/api/v1/verifyotpdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: storedEmail,
          otp: otpValue,
        }),
      });

      if (response.ok) {
        setTimeLeft(60);
        setVerifyButtonVisible(true);
        toast.success(<b>OTP verification successful</b>);
        setOtpVerified(true);
        setResendButtonVisible(false);
        nextStep();
      } else {
        const errorResponse = await response.json();
        console.error('Error verifying OTP:', response.statusText);

        if (errorResponse.error === 'OTP has expired') {
          toast.error(<b>OTP has expired. Please request a new one.</b>);
        } else if (errorResponse.error === 'Invalid OTP') {
          toast.error(<b>Invalid OTP. Please enter a valid OTP.</b>);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setVerifyInProgress(false); 
      setVerifyLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendInProgress(true); // Set the resend in progress

      const response = await fetch('http://localhost:4800/api/v1/resendotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: storedEmail,
        }),
      });

      if (response.ok) {
        setTimeLeft(60);
        setVerifyButtonVisible(true);
        toast.success(<b>OTP resent successfully</b>);
        setOtpVerified(false);
        setResendButtonVisible(false);
      } else {
        console.error('Error resending OTP:', response.statusText);
        const errorResponse = await response.json();

        if (errorResponse.error === 'User not found') {
          toast.error(<b>User not found. Please try again.</b>);
        } else if (errorResponse.error === 'OTP has expired') {
          toast.error(<b>OTP has expired. Please request a new one.</b>);
          setVerifyButtonVisible(false); // Hide verify button
        } else {
          toast.error(<b>Error resending OTP. Please try again.</b>);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setResendInProgress(false); // Reset the resend in progress
    }
  };

  return (
    <div className=''>
      <section className="container-fluid bg-body-tertiary d-block">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4" style={{ minWidth: '500px' }}>
            <div className="card bg-white mb-5 mt-5 border" style={{ boxShadow: '0 12px 15px rgba(0, 0, 0, 0.02)' }}>
              <div className="card-body p-5 text-center">
                <h4>Enter Your Otp</h4>
                {/* <p>Your code was sent to you via email: {maskedEmail}</p> */}

                <div className="otp-field mb-4">
                  <input
                    type="number"
                    className='w-100'
                    style={{ backgroundColor: "whitesmoke" }}
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value)}
                  />
                </div>
                <p className="timer text-success fw-bold mb-3 fs-6">Time Left: <b>{timeLeft}</b>s</p>

                {isVerifyButtonVisible ? (
                   <button
                   onClick={handleVerify}
                   className={`btn btn-secondary mb-3 px-4 ${isVerifyInProgress ? 'disabled' : ''}`}
                   disabled={isVerifyInProgress || isOtpVerified}
                 >
                    {isVerifyLoading ? 'Loading...' : 'Verify'}
                 </button>
                ) : (
                  isResendButtonVisible && (
                    <button
                      onClick={handleResendOTP}
                      className={`btn btn-secondary mb-3 px-4 ${isResendInProgress ? 'disabled' : ''}`}
                      disabled={isResendInProgress}
                    >
                  {isVerifyLoading ? 'Loading...' : 'Resend Otp'}
                    </button>
                  )
                )}

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OtpForm;
