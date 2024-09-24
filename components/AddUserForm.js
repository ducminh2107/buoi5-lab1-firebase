import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

// Định nghĩa quy tắc xác thực
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Tên không được chứa ký tự đặc biệt và số")
    .required("Tên không được để trống"),
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@(gmail\.com|.+\.edu\.vn)$/,
      "Email phải là định dạng gmail.com hoặc .edu.vn"
    )
    .required("Email không được để trống"),
  age: Yup.number()
    .required("Tuổi không để trống")
    .positive("Tuổi phải là số dương")
    .integer("Tuổi phải là số nguyên"),
});

const AddUserForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: "", email: "", age: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Tên"
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            style={styles.input}
          />
          {touched.name && errors.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}

          <TextInput
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            style={styles.input}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <TextInput
            placeholder="Tuổi"
            value={values.age}
            onChangeText={handleChange("age")}
            onBlur={handleBlur("age")}
            keyboardType="numeric"
            style={styles.input}
          />
          {touched.age && errors.age && (
            <Text style={styles.errorText}>{errors.age}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Thêm</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "green",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default AddUserForm;
