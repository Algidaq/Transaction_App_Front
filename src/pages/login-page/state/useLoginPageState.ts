import { useState } from 'react';
import { LoginPageState } from './LoginPageState';
import { StateEnum } from '../../../enums/StateEnum';
import * as Yup from 'yup';
import { required, invalid, getErrorMessage } from '../../../utils/utils';
import { IAuthService } from '../../../services/auth-service/AuthService';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useLoginPageState = ({ service }: { service: IAuthService }) => {
  const [state, setState] = useState(new LoginPageState(StateEnum.idel));
  const navigateTo = useNavigate();
  const initialValues: LoginPageForm = {
    phone: '',
    password: '',
  };
  async function login(
    values: LoginPageForm,
    helpers: FormikHelpers<LoginPageForm>
  ) {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      await service.login(values.phone, values.password);

      setState((state) => state.copyWith({ stateEnum: StateEnum.success }));

      window.location.href = '/customers';
    } catch (e) {
      console.log(e);
      setState((state) => state.copyWith({ stateEnum: StateEnum.error }));
      toast.error(getErrorMessage(e));
    }
  }
  return {
    state,
    initialValues,
    login,
  };
};

export interface LoginPageForm {
  phone: string;
  password: string;
}

export const loginFormValidatinSchema = Yup.object({
  phone: Yup.string()
    .required(required)
    .matches(/[0-9]/)
    .min(3, invalid)
    .max(56, invalid),
  password: Yup.string().required(required).min(3, invalid).max(56, invalid),
});
