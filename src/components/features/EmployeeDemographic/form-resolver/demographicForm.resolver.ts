import { emailRegex } from './../../../../utils/regex';
import * as yup from 'yup';

const addressValidation = (
  typeOfAddress: 'updateCurrentAddress' | 'updatePermanentAddress'
) =>
  yup.string().when(typeOfAddress, {
    is: (value: boolean) => value,
    then: yup.string().required('This field is required!'),
  });

export const InformationUpdateFormSchema = yup.object().shape({
  workEmail: yup
    .string()
    .required('This field is reqiured!')
    .matches(emailRegex, 'This email is invalid!'),
  mobileNumber: yup.string().required('This field is reqiured!'),
  updateCurrentAddress: yup.boolean(),
  updatePermanentAddress: yup.boolean(),

  cA_Line1: addressValidation('updateCurrentAddress'),
  cA_City: addressValidation('updateCurrentAddress'),
  cA_State: addressValidation('updateCurrentAddress'),
  cA_Country: addressValidation('updateCurrentAddress'),
  cA_ZipCode: addressValidation('updateCurrentAddress'),

  permanent_Line1: addressValidation('updatePermanentAddress'),
  permanent_City: addressValidation('updatePermanentAddress'),
  permanent_State: addressValidation('updatePermanentAddress'),
  permanent_Country: addressValidation('updatePermanentAddress'),
  permanent_ZipCode: addressValidation('updatePermanentAddress'),
});
