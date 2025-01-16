import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useMutation } from "@tanstack/react-query";
import IconSVG from "../../assets/svg";
import { useDispatch } from "react-redux";
import { setLoginEmail } from "../../features/login/LoginSlice";
import { setEmail } from "../../features/signup/signupSlice";
import api from "../../services/api"; // Import Axios instance

// Validation Schema
const validationSchema = Yup.object().shape({
  loginEmail: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

// API login function 
const loginUser = async (email) => {
  const response = await api.post('/auth/send-signup-otp', { email });
  return response.data; // Axios automatically throws an error for non-2xx responses
};

const CreateAccount = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // React Query mutation
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      router.replace("/(home)/SignupOtpPage");
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });

  return (
    <View style={styles.parentContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(home)/HomePage")}>
          <IconSVG name="backbutton" width={32} height={32} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.text}>Create Account</Text>
      </View>

      {/* Formik Form */}
      <Formik
        initialValues={{ loginEmail: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(setLoginEmail(values.loginEmail));
          dispatch(setEmail(values.loginEmail)); // Save email to signup slice
          mutation.mutate(values.loginEmail);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.inputContainer}>
            {/* Input Section */}
            <Text style={styles.label}>What's your email?</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor="#333"
              keyboardType="email-address"
              onChangeText={handleChange("loginEmail")}
              onBlur={handleBlur("loginEmail")}
              value={values.loginEmail}
              editable={!mutation.isPending}
            />
            {touched.loginEmail && errors.loginEmail && (
              <Text style={styles.errorText}>{errors.loginEmail}</Text>
            )}

            {/* Error message from API */}
            {mutation.isError && (
              <Text style={styles.errorText}>
                {mutation.error?.message || 'An error occurred during login'}
              </Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity 
              onPress={handleSubmit} 
              style={[
                styles.nextButton,
                mutation.isPending && styles.buttonDisabled
              ]}
              disabled={mutation.isPending}
            >
              <Text style={styles.buttonText}>
                {mutation.isPending ? 'Sending...' : 'Send OTP'}
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
    backgroundColor: "#121212",
  },
  text: {
    marginLeft: moderateScale(80),
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
    fontSize: scale(14),
  },
  header: {
    top: verticalScale(42),
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginLeft: moderateScale(17),
  },
  inputContainer: {
    marginTop: verticalScale(70),
    paddingHorizontal: moderateScale(16),
  },
  label: {
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
    fontSize: scale(16),
    marginBottom: verticalScale(8),
    marginLeft: verticalScale(2),
  },
  textInput: {
    height: verticalScale(48),
    backgroundColor: "#777777",
    borderRadius: scale(10),
    fontSize: scale(14),
    fontFamily: "Poppins-Regular",
    paddingHorizontal: moderateScale(12),
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: scale(12),
    marginTop: verticalScale(4),
    marginLeft: verticalScale(8),
    fontFamily: "Poppins-Regular",
  },
  nextButton: {
    marginTop: verticalScale(40),
    backgroundColor: "#535353",
    borderRadius: scale(25),
    paddingVertical: verticalScale(8),
    justifyContent: "center",
    alignItems: "center",
    width: moderateScale(82),
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    fontSize: scale(14),
    color: "#fff",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
