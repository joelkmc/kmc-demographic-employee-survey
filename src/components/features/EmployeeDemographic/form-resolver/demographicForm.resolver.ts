import { emailRegex } from './../../../../utils/regex';
import * as yup from 'yup';
import { GenderEnum } from './demographicForm.types';

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

export const DemographicFormSchema = yup.object().shape({
  yearsWithKMC: yup.string().nullable().required('Please select your answer!'),
  gender: yup.string().nullable().required('Please select your answer!'),
  sexualOrientation: yup
    .string()
    .nullable()
    .when('gender', {
      is: (value: GenderEnum) => value === GenderEnum.OTHERS,
      then: yup.string().nullable().required('Please select your answer!'),
    }),
  organizationalRole: yup
    .string()
    .nullable()
    .required('Please select your answer!'),
  highestDegreeEarned: yup
    .string()
    .nullable()
    .required('Please select your answer!'),
  addressCategory: yup
    .string()
    .nullable()
    .required('Please select your answer!'),
  salaryRange: yup.string().nullable().required('Please select your answer!'),
  nationality: yup.string().nullable().required('Please select your answer!'),
  ethnicity: yup.string().nullable().required('Please select your answer!'),
  ethnicGroup: yup.string().nullable().required('Please select your answer!'),
  partOfIndigenousTribes: yup
    .boolean()
    .nullable()
    .required('Please select your answer!'),
});

export const NBIFormSchema = yup.object().shape({
  isNbiAlreadySubmitted: yup
    .boolean()
    .nullable()
    .required('Please select your answer!'),
  nbiClearanceSubmissionDate: yup
    .date()
    .nullable()
    .when('isNbiAlreadySubmitted', {
      is: (value: boolean) => value,
      then: yup
        .date()
        .required('Enter a valid date!')
        .typeError('Enter a valid date!'),
    }),
});
