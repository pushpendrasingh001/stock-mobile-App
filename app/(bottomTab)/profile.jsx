import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const Output = () => {
  // Access the state from the Redux store
  const { email, password, gender, name, sendNews, shareData } = useSelector(
    (state) => state.signup
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile Details</Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Name: </Text>
        {name}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Email: </Text>
        {email}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Password: </Text>
        {password}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Gender: </Text>
        {gender}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Share Data: </Text>
        {shareData ? "Yes" : "No"}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Receive Newsletters: </Text>
        {sendNews ? "Yes" : "No"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f4f9",
    borderRadius: 8,
    maxWidth: 600,
    marginTop: 20,
    marginHorizontal: 20,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Not supported in React Native, use `elevation` for Android
    elevation: 5, // Shadow for Android
    borderWidth: 1, // Border for iOS
    borderColor: "#ddd",
  },
  heading: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: "center",
    color: "#4382EC",
    fontWeight: "bold",
  },
  detail: {
    fontSize: 18,
    lineHeight: 24,
    color: "#000",
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#4382EC",
  },
});

export default Output;
