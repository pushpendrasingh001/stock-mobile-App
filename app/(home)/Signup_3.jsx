import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { setGender } from '../../features/signup/signupSlice';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import IconSVG from '../../assets/svg'; // Adjust the path to your SVG
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  gender: Yup.string().required('Gender is required').notOneOf([''], 'Please select a gender'),
});

const CreateAccount = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const gender = useSelector((state) => state.signup.gender);

  return (
    <View style={styles.parentContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.push('/(home)/Signup_2');
          }}>
          <IconSVG name="backbutton" width={32} height={32} style={styles.button} />
        </TouchableOpacity>
        <Text style={styles.text}>Create Account</Text>
      </View>

      {/* Form Section */}
      <Formik
        initialValues={{ gender }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(setGender(values.gender)); // Update Redux state
          console.log(values); // Debug
          router.push('/(home)/Signup_4'); // Navigate to the next page
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>What's your gender</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={values.gender}
                onValueChange={(value) => {
                  handleChange('gender')(value);
                  dispatch(setGender(value)); // Update Redux on selection
                }}
                onBlur={handleBlur('gender')}
                style={styles.picker}
                dropdownIconColor="#000">
                <Picker.Item label="Select gender" value="" color="#888" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
            {touched.gender && errors.gender && (
              <Text style={styles.errorText}>{errors.gender}</Text>
            )}

            {/* Next Button */}
            <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Next</Text>
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
  button: {
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
  pickerContainer: {
    height: verticalScale(48),
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    backgroundColor: '#777777',
    
  },
  picker: {
    color: '#000',

  },
  errorText: {
    color: 'red',
    fontSize: scale(12),
    marginTop: verticalScale(8),
    marginLeft: verticalScale(8),
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
    fontFamily:'Poppins-Medium',
      fontSize: scale(14),
    },
});
