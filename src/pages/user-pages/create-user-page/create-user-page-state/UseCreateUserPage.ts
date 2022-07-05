import React, { useEffect, useState } from 'react';
import { IUserRoleService } from '../../../../services/user-role-service/UserRoleService';
import { StateEnum } from '../../../../enums/StateEnum';
import { CreateUserPageState } from './CreateUserPageState';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../../utils/utils';
import { CreateUserPageForm } from './CreateUserPageForm';
import { FormikHelpers, FormikProps } from 'formik';
import { Role } from '../../../role-pages/create-role-page/UserRoleForm';
import { IUserService } from '../../../../services/user-service/UserService';
import { IPostUser } from '../../../../services/user-service/model/User';
import { useNavigate } from 'react-router-dom';

export const useCreateUserPageState = ({
  roleService,
  userService,
}: {
  roleService: IUserRoleService;
  userService: IUserService;
}) => {
  const initialValues: CreateUserPageForm = {
    fullName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: undefined,
  };
  const [state, setState] = useState<CreateUserPageState>(
    new CreateUserPageState(StateEnum.idel, StateEnum.idel)
  );
  const navigateTo = useNavigate();

  useEffect(() => {
    async function getRoles() {
      await loadUserRoles();
    }
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserRoles = async () => {
    try {
      setState((state) => state.copyWith({ stateEnum: StateEnum.busy }));
      const roles = await roleService.getAllRoles();
      const selectedRole = roles.length > 0 ? roles[0] : undefined;
      setState((state) =>
        state.copyWith({
          stateEnum: roles.length > 0 ? StateEnum.success : StateEnum.empty,
          roles: roles,
          selectedRole: selectedRole,
        })
      );
    } catch (e: any) {
      toast.error(getErrorMessage(e));
      setState((state) =>
        state.copyWith({ stateEnum: StateEnum.error, error: e })
      );
      console.error(e);
    }
  };
  const handleFormSubmit = async (
    values: CreateUserPageForm,
    helpers: FormikHelpers<CreateUserPageForm>
  ) => {
    try {
      setState((state) => state.copyWith({ formState: StateEnum.busy }));

      const postUser: IPostUser = {
        fullName: values.fullName,
        password: values.password,
        phone: values.phone,
        role: values.role!.toJson(),
      };
      const user = await userService.addNewUser(postUser);
      helpers.resetForm();
      toast.success(`تم إضافة المستخدم ${user.name} بنجاح`);
      setTimeout(
        () =>
          setState((state) => state.copyWith({ formState: StateEnum.success })),
        2000
      );
    } catch (e) {
      toast.error(getErrorMessage(e));
      setState((state) => state.copyWith({ formState: StateEnum.error }));
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleOnRoleChange = (
    formik: FormikProps<CreateUserPageForm>,
    id?: string
  ) => {
    const selectedRoleId = Number.parseInt(id ?? '-1');
    const role = state.roles.find((role) => role.id === selectedRoleId);
    if (!role) return;
    formik.setFieldValue('role', role);
    setState((state) => state.copyWith({ selectedRole: role }));
  };
  const handleNavigationAddUserRoles = () => {
    navigateTo('/users/roles/add');
  };
  return {
    state,
    initialValues,
    handleFormSubmit,
    handleOnRoleChange,
    loadUserRoles,
    handleNavigationAddUserRoles,
  };
};
