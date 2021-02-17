import React from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from 'yup';
import FlatButton from '../shared/button';

const reviewSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(5),
  rating: yup.string().required().test(
    'is num', 'must be a number 1 to 5', (val) => {
      return parseInt(val) < 6 && parseInt(val) > 0;
    }
  ),
})

export default function ReviewForm({ addReview }) {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ title: "", body: "", rating: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          addReview(values);
          actions.resetForm();
        }}
      >
        {(formikProps) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="review title"
              onChangeText={formikProps.handleChange("title")}
              value={formikProps.values.title}
              onBlur={formikProps.handleBlur('title')}
            />

            <Text style={globalStyles.errorText}>{formikProps.touched.title && formikProps.errors.title}</Text>

            <TextInput
              multiline
              minHeight={60}
              style={globalStyles.input}
              placeholder="review body"
              onChangeText={formikProps.handleChange("body")}
              value={formikProps.values.body}
              onBlur={formikProps.handleBlur('body')}
            />

            <Text style={globalStyles.errorText}>{formikProps.touched.body && formikProps.errors.body}</Text>

            <TextInput
              style={globalStyles.input}
              placeholder="Rating (1 - 5)"
              onChangeText={formikProps.handleChange("rating")}
              value={formikProps.values.rating}
              keyboardType="numeric"
              onBlur={formikProps.handleBlur('rating')}

            />
            <Text style={globalStyles.errorText}>{formikProps.touched.rating && formikProps.errors.rating}</Text>

            <FlatButton text='submit' onPress={formikProps.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
