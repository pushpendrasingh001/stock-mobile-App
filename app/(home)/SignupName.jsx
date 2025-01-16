import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { CheckBox } from "@rneui/themed";
import IconSVG from '../../assets/svg';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toggleSendNews, toggleShareData } from '../../features/additionalInformation/AddInfo';
import { setName } from '../../features/signup/signupSlice';
import axiosInstance from '../../services/api';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .trim(),
});

const CreateAccount = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { sendNews, shareData } = useSelector((state) => state.addInfo);
  const { email, mobile } = useSelector((state) => state.signup);

  const handleSubmit = async (values, { setSubmitting }) => {
    if (isLoading) return;
    setIsLoading(true);
    setSubmitting(true);

    try {
      // Validate required fields
      if (!email || !mobile) {
        Alert.alert('Error', 'Email and mobile number are required');
        return;
      }

      if (!values.name || values.name.trim().length < 3) {
        Alert.alert('Error', 'Please enter a valid name (minimum 3 characters)');
        return;
      }
  
      // Prepare submission data
      const submissionData = {
        name: values.name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        preferences: {
          sendNews,
          shareData,
        },
        deviceDetails: {
          deviceId: '12345ABCDE',
          platform: Platform.OS,
          version: Platform.Version,
        }
      };

      console.log('Submitting data:', submissionData);
  
      // Make API call
      const response = await axiosInstance.post('/auth/create-user', submissionData);
  
      if (response?.data?.success) {
        dispatch(setName(values.name.trim()));
        router.push('/(home)/ChooseArtist');
      } else {
        throw new Error(response?.data?.message || 'Failed to create user');
      }
  
    } catch (error) {
      console.error('Error creating user:', error);
      
      let errorMessage = 'Failed to create user. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
  
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // Rest of your component code remains the same until the button
  return (
    <View style={styles.parentContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(home)/SignupGender')}>
          <IconSVG name="backbutton" width={32} height={32} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.text}>Create Account</Text>
      </View>

      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <View>
            {/* Input Section */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>What's your name?</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Name for your Spotify profile"
                placeholderTextColor="#333"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                keyboardType="default"
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Divider */}
            <View style={styles.hr} />

            {/* Terms and Conditions */}
            <View style={styles.termContainer}>
              <Text style={styles.termText}>
                By tapping on "Create account", you agree to the Spotify Terms of Use.{"\n"}
                <TouchableOpacity>
                  <Text style={styles.highlightText}>Terms of Use</Text>
                </TouchableOpacity>
                {"\n"}To learn more about how Spotify collects, uses, shares, and protects your personal data, please see the Spotify Privacy Policy.{"\n"}
                <TouchableOpacity>
                  <Text style={styles.highlightText}>Privacy Policy</Text>
                </TouchableOpacity>
              </Text>
            </View>

            {/* Checkboxes */}
            <View style={styles.checkboxContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.checkboxText}>
                  Please send me news and offers from Stockinfo.
                </Text>
                <CheckBox
                  checked={sendNews}
                  onPress={() => dispatch(toggleSendNews())}
                  checkedIcon={<IconSVG name="checked" width={25} height={25} />}
                  uncheckedIcon={<IconSVG name="unchecked" width={25} height={25} />}
                  containerStyle={styles.checkboxContainerStyle}
                />
              </View>
            </View>

            <View style={styles.checkboxContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.checkboxText}>
                  Share my registration data with Stockinfo's content providers for marketing purposes.
                </Text>
                <CheckBox
                  checked={shareData}
                  onPress={() => dispatch(toggleShareData())}
                  checkedIcon={<IconSVG name="checked" width={25} height={25} />}
                  uncheckedIcon={<IconSVG name="unchecked" width={25} height={25} />}
                  containerStyle={styles.checkboxContainerStyle}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.nextButton,
                (isSubmitting || isLoading) && styles.disabledButton
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting || isLoading}
            >
              <Text style={[styles.buttonText, { color: '#000' }]}>
                {(isSubmitting || isLoading) ? 'Creating Account...' : 'Create an account'}
              </Text>
            </TouchableOpacity>

          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateAccount;

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

disabledButton: {
  opacity: 0.7,
},
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    marginVertical: verticalScale(30),
  },
  backButton: {
    marginLeft: moderateScale(17),
  },
  inputContainer: {
    marginTop: verticalScale(70),
    paddingHorizontal: moderateScale(16),
  },
  label: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: scale(16),
    marginBottom: verticalScale(8),
    marginLeft: verticalScale(2),
  },
  textInput: {
    height: verticalScale(48),
    backgroundColor: '#777777',
    borderRadius: scale(10),
    fontSize: scale(14),
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: moderateScale(12),
    color: "#fff",
  },
  errorText: {
    color: 'red',
    fontSize: scale(12),
    marginTop: verticalScale(5),
    marginLeft: verticalScale(8),
  },
  termContainer: {
    width: scale(320),
    height: verticalScale(150),
    marginLeft: moderateScale(16),
    marginBottom: verticalScale(30),
  },
  termText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: scale(12),
  },
  highlightText: {
    color: '#1ED760',
    marginBottom: verticalScale(15),
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    marginVertical: verticalScale(10),
  },
  checkboxContainerStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: moderateScale(22),
  },
  checkboxText: {
    fontFamily: 'Poppins-Regular',
    width: '85%',
    color: '#fff',
    fontSize: scale(12),
  },
  nextButton: {
    marginTop: verticalScale(40),
    backgroundColor: '#F5F5F5',
    borderRadius: scale(20),
    paddingVertical: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(179),
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: scale(12),
  },
  disabledButton: {
    opacity: 0.7,
    backgroundColor: '#888',
  },
});
