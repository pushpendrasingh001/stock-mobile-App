import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import IconSVG from '../../assets/svg';
import {router} from 'expo-router'

const HomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            Millions of Insight.{"\n"}Only on Stockinfo.
          </Text>
        </View>

        {/* Sign Up Button */}
        <View style={styles.signupContainer}>
          <TouchableOpacity style={styles.button}  onPress={()=>{
router.replace("/(home)/SignupMobile")
          }}>
            <Text style={styles.buttonTextsignup}>Sign up free</Text>
          </TouchableOpacity>
        </View>

        {/* Continue with Google */}
        <View style={styles.googleContainer}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.innerContainer}>
              <View style={styles.logo}>
            
       
      <IconSVG name="google" />

              </View>
              <View style={styles.textSpace}>
                <Text style={styles.buttonText}>Continue with Google</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        Continue with Facebook
        <View style={styles.facebookContainer}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.innerContainer}>
              <View style={styles.logo}>
                
         
              <IconSVG name="facebook"  />

              </View>
              <View style={styles.textSpace}>
                <Text style={styles.buttonText}>Continue with Facebook</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue with Apple */}
        <View style={styles.appleContainer}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.innerContainer}>
              <View style={styles.logo}>
               
              <IconSVG name="apple" />

              </View>
              <View style={styles.textSpace}>
                <Text style={styles.buttonText}>Continue with Apple</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Log in */}
        <View style={styles.loginContainer}>
          <TouchableOpacity style={styles.button}  onPress={()=>{
router.replace("/(home)/LoginEmail")
          }}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomePage; 

const styles = StyleSheet.create({
  parent: {
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(20),
    top: verticalScale(250),
  },
  headerContainer: {
    width: scale(277),
    marginBottom: moderateScale(20),
  },
  header: {

    color: "white",
    fontSize: scale(24),
    textAlign: "center",
    lineHeight: 42,
    fontFamily:'Poppins-Medium'
  },
  signupContainer: {
    width: scale(310),
    height: verticalScale(49),
    backgroundColor: "#1ed760",
    borderRadius: 45,
    justifyContent: "center",
    top: verticalScale(15),
  },
  googleContainer: {
    width: scale(310),
    height: verticalScale(49),
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    top: verticalScale(25),
  },
  facebookContainer: {
    width: scale(310),
    height: verticalScale(49),
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    top: verticalScale(35),
  },
  appleContainer: {
    width: scale(310),
    height: verticalScale(49),
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    top: verticalScale(45),
    
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    
  },
  innerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  textSpace: {
    marginLeft: moderateScale(40),
  },
  logo: {
    marginLeft: moderateScale(20),
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  buttonText: {
    color: "white",
    fontSize: scale(14),
    fontFamily:'Poppins-Medium',
    letterSpacing: 1.2,
  },
  loginContainer: {
    width: scale(310),
    height: verticalScale(49),
    justifyContent: "center",
    alignItems: "center",
    top: verticalScale(55),
  },
  buttonTextsignup: {
    color: "Black",
    fontSize: scale(14),
    fontFamily:'Poppins-Medium',
    letterSpacing: 1.2,
  },
});

