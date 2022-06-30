import * as React from 'react';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import Input from './components/Input/Input';
import * as Yup from 'yup';
import Container from './components/Container/Container';
interface MyFormValues {
  fullName: string;
}
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const App: React.FC<{}> = () => {
  const initialValues: MyFormValues = { fullName: '' };
  return (
    <Container className="is-fullheight">
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <div className="column is-4 is-offset-3">
            <Form>
              <Input
                label="First Name"
                id="fullName"
                name="fullName"
                errors={props.errors}
                type="text"
              />
              <Input
                label="Phone Number"
                id="phone"
                name="phone"
                errors={props.errors}
                maxLength={56}
                type="password"
                className="my-4"
              />
            </Form>
          </div>
        )}
      </Formik>
    </Container>
  );
};

export default App;
