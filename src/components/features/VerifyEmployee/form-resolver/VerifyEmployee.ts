import * as yup from 'yup';
import { emailRegex } from '../../../../utils/regex';

export type ValidateEmployeeFormTypes = {
  idNumber: string;
  email: string;
  employeeType: string;
};

export const ValidateEmployeeFormSchema = yup.object().shape({
  idNumber: yup
    .string()
    .typeError('Enter a valid ID Number')
    .required('ID number required!'),
  employeeType: yup.string().typeError('Employee Type required!').default(null),
  email: yup
    .string()
    .matches(emailRegex, { message: 'Invalid email!' })
    .required('Email is required!'),
});
