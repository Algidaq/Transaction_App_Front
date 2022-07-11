import { Form, Formik } from 'formik';
import { useContext } from 'react';
import Button from '../../components/Button/Button';
import Gap from '../../components/Gap/Gap';
import Input from '../../components/Input/Input';
import { AuthServiceContext } from '../../services/auth-service/AuthServiceContext';
import { useLoginPageState } from './state/useLoginPageState';
interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  const service = useContext(AuthServiceContext)!;
  const viewmodel = useLoginPageState({ service });
  return (
    <div
      className="flex-center columns is-fullheight"
      style={{ overflow: 'hidden' }}
    >
      <div
        className="column is-three-fifths"
        style={{
          maxHeight: 400,
          maxWidth: 400,
          background: 'white',
          offset: 6,
          borderRadius: 16,
          margin: '0 32px',
          overflow: 'hidden',
          padding: '16px 16px',
        }}
      >
        <Formik
          initialValues={viewmodel.initialValues}
          onSubmit={viewmodel.login}
        >
          {(formik) => (
            <Form>
              <Input
                id="phone"
                name="phone"
                errors={formik.errors}
                label="رقم الهاتف"
                type="text"
                inputMode="numeric"
              />
              <Gap vertical={16} />
              <Input
                id="password"
                name="password"
                errors={formik.errors}
                label="كلمة السر"
                type="password"
              />
              <Gap vertical={32} />
              <Button
                text="تسجيل الدخول"
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                state={viewmodel.state.stateEnum}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
