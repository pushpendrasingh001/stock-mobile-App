import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import IconSVG from "../../assets/svg"; // Adjust the path to your SVG
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { setPassword } from '../../features/signup/signupSlice';
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(/[!@#$%^&*]/, "Password must contain at least one special character"),
});

const CreateAccount = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const password = useSelector((state) => state.signup.password);

  return (
    <View style={styles.parentContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.push("/(home)/Signup_1");
          }}
        >
          <IconSVG name="backbutton" width={32} height={32} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.text}>Create Account</Text>
      </View>

      {/* Formik Form */}
      <Formik
        initialValues={{ password }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(setPassword(values.password)); 
          console.log(values);
          router.replace("/(home)/Signup_3");
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            {/* Input Section */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Create a password</Text>
              <TextInput
                 style={[
                  styles.textInput,
                  touched.password && errors.password ? styles.errorInput : null,
                ]}
                placeholder="Enter your password"
                placeholderTextColor="#333"
                secureTextEntry={true}
                onChangeText={(text) => {
                  handleChange("password")(text);
                  dispatch(setPassword(text)); // Update Redux on text change
                }}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleSubmit}
            >
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
    fontFamily:'Poppins-Medium',
      fontSize: scale(14),
    },
});
