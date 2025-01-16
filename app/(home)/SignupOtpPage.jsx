import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import OTPTextInput from 'react-native-otp-textinput';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import IconSVG from '../../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import { setOTP } from '../../features/login/LoginSlice';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Axios Instance
const api = axios.create({
  baseURL: 'https://94f3-122-176-44-176.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Validation Schema
const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, 'OTP must be 6 digits')
    .required('OTP is required'),
});

// API verify OTP function
const verifyOTP = async ({ email, otp }) => {
  console.log('Verifying OTP with:', { email, otp }); // Debugging payload
  const response = await api.post('/auth/verify-signup-otp', { email, otp });
  console.log('Verify Response:', response.data); // Debugging response
  return response.data;
};

// API resend OTP function
const resendOTP = async (email) => {
  console.log('Resending OTP to:', email); // Debugging payload
  const response = await api.post('/auth/verify-signup-otp', { email });
  console.log('Resend Response:', response.data); // Debugging response
  return response.data;
};

const OTPScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const otp = useSelector((state) => state.login.otp);
  const email = useSelector((state) => state.login.loginEmail);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Verify OTP mutation
  const verifyMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      console.log('OTP verified successfully:', data);
      router.replace('/(home)/SignupMobile');
    },
    onError: (error) => {
      if (error.response?.status === 500) {
        console.error('Server Error: There is an issue with the server. Please try again later.');
      } else if (error.response?.status === 400) {
        console.error('Invalid OTP:', error.response.data.message || 'The OTP you entered is invalid.');
      } else {
        console.error('Verification failed:', error.response?.data?.message || error.message);
      }
    },
  });

  // Resend OTP mutation
  const resendMutation = useMutation({
    mutationFn: () => resendOTP(email),
    onSuccess: () => {
      setTimeLeft(30);
      setIsResendDisabled(true);
    },
    onError: (error) => {
      if (error.response?.status === 500) {
        console.error('Server Error: Unable to resend OTP. Please try again later.');
      } else {
        console.error('Failed to resend OTP:', error.response?.data?.message || error.message);
      }
    },
  });

  // Timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Mask email function
  const maskEmail = (loginEmail) => {
    const [username, domain] = loginEmail.split('@');
    if (username.length <= 4) return loginEmail;
    const visibleUsername = `${username.slice(0, 2)}***${username.slice(-2)}`;
    return `${visibleUsername}@${domain}`;
  };

  return (
    <View style={styles.parentContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(home)/SignupEmail')}>
          <IconSVG name="backbutton" width={32} height={32} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.text}>OTP Verification</Text>
      </View>

      {/* Formik Form */}
      <Formik
        initialValues={{ otp }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(setOTP(values.otp));
          verifyMutation.mutate({ email, otp: values.otp });
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter your OTP</Text>
            <Text style={styles.subLabel}>
              Sent OTP on registered email: <Text style={styles.emailContent}>{maskEmail(email)}</Text>
            </Text>

            <TouchableOpacity onPress={() => router.push('/(home)/SignupEmail')}>
              <Text style={styles.changeEmail}>Change Email ?</Text>
            </TouchableOpacity>

            <OTPTextInput
              handleTextChange={handleChange('otp')}
              inputCount={6}
              containerStyle={styles.otpContainer}
              textInputStyle={[styles.otpInput, verifyMutation.isPending && styles.inputDisabled]}
              editable={!verifyMutation.isPending}
            />

            {touched.otp && errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}
            {verifyMutation.isError && (
              <Text style={styles.errorText}>
                {verifyMutation.error.response?.data?.message || verifyMutation.error.message}
              </Text>
            )}

            <View style={styles.timerRow}>
              <Text style={styles.timerText}>
                Waiting for OTP: <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
              </Text>
              <TouchableOpacity
                onPress={() => resendMutation.mutate()}
                disabled={isResendDisabled || resendMutation.isPending}
              >
                <Text
                  style={[
                    styles.resendOtp,
                    (isResendDisabled || resendMutation.isPending) && styles.resendDisabled,
                  ]}
                >
                  {resendMutation.isPending ? 'Sending...' : 'Resend OTP?'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.nextButton, verifyMutation.isPending && styles.buttonDisabled]}
              disabled={verifyMutation.isPending}
            >
              <Text style={[styles.buttonText, { color: '#fff' }]}>
                {verifyMutation.isPending ? 'Verifying...' : 'Verify'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};


export default OTPScreen;
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  text: {
    marginLeft: moderateScale(80),
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: scale(14),
  },
  header: {
    top: verticalScale(42),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: moderateScale(17),
  },
  inputContainer: {
    marginTop: verticalScale(70),
    paddingHorizontal: moderateScale(16),
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: scale(16),
    marginBottom: verticalScale(8),
    marginLeft: verticalScale(2),
  },
  subLabel: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  emailContent: {
    fontFamily: 'Poppins-Regular',
    color: 'skyblue',
  },
  changeEmail: {
    fontFamily: 'Poppins-Regular',
    color: 'skyblue',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  otpContainer: {
    marginBottom: verticalScale(20),
  },
  otpInput: {
    height: verticalScale(48),
    width: scale(40),
    backgroundColor: '#777777',
    borderRadius: scale(10),
    fontSize: scale(14),
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginHorizontal: moderateScale(4),
    borderBottomWidth: 0,
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'gray',
  },
  timer: {
    color: 'red',
  },
  resendOtp: {
    color: 'skyblue',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: scale(12),
    marginTop: verticalScale(4),
    marginLeft: verticalScale(8),
    fontFamily: 'Poppins-Regular',
  },
  nextButton: {
    marginTop: verticalScale(40),
    backgroundColor: '#535353',
    borderRadius: scale(25),
    paddingVertical: verticalScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(82),
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: scale(14),
  },
  inputDisabled: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.7,
    backgroundColor: '#404040',
  },
  resendDisabled: {
    opacity: 0.5,
    textDecorationLine: 'none',
  },
});



