import { emailRegex } from './../../../../utils/regex';
import * as yup from 'yup';
import { GenderEnum } from './demographicForm.types';

const currentAddressValidation = yup.string().when('updateCurrentAddress', {
  is: (value: boolean) => value,
  then: yup.string().required('This field is required!'),
});
const permanentAddressValidation = yup.string().when('updatePermanentAddress', {
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

  cA_Line1: currentAddressValidation,
  cA_City: currentAddressValidation,
  cA_State: currentAddressValidation,
  cA_Country: currentAddressValidation,
  cA_ZipCode: currentAddressValidation,

  permanent_Line1: permanentAddressValidation,
  permanent_City: permanentAddressValidation,
  permanent_State: permanentAddressValidation,
  permanent_Country: permanentAddressValidation,
  permanent_ZipCode: permanentAddressValidation,
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
