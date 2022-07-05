import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Customer } from '../../../../services/customer-service/model/Customer';
import * as Yup from 'yup';
import { required, invalid } from '../../../../utils/utils';
export class EditCustomerPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly formState: StateEnum,
    public readonly customer?: Customer,
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    formState,
    customer,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    formState?: StateEnum;
    customer?: Customer;
    error?: Object | undefined;
  }): EditCustomerPageState {
    return new EditCustomerPageState(
      stateEnum ?? this.stateEnum,
      formState ?? this.formState,
      customer ?? this.customer,
      error ?? this.error
    );
  }
}

export interface EditCustomerForm {
  fullName: string;
  phone: string;
}

export const customerEditSchema = Yup.object({
  fullName: Yup.string().required(required).min(3, invalid).max(56, invalid),
  phone: Yup.string()
    .required(required)
    .min(10, invalid)
    .matches(/[0-9]/, invalid),
});
