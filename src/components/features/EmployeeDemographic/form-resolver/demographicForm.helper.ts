import { IOption } from '../../../shared/Select';
import {
  AddressCategoryEnum,
  EthnicGroupEnum,
  GenderEnum,
  HighestDegreeEnum,
  NationalityEnum,
  OrganizationRoleEnum,
  RacialEthnicityEnum,
  SalaryRangeEnum,
  SexualOrientationEnum,
  YrsWithKmcEnum,
} from './demographicForm.types';

export const yrsWithKmcOptions = (): IOption[] => {
  const array: IOption[] = [];

  Object.values(YrsWithKmcEnum).forEach((yrsOption) => {
    array.push({
      name: yrsOption,
      value: yrsOption,
    });
  });

  return array;
};

export const genderOptions = (): IOption[] => {
  const array: IOption[] = [];

  Object.values(GenderEnum).forEach((gender) => {
    array.push({
      name: gender,
      value: gender,
    });
  });

  return array;
};

export const sexualOrientationOptions = (): IOption[] => {
  const array: IOption[] = [];

  Object.values(SexualOrientationEnum).forEach((sxualOreintation) => {
    array.push({
      name: sxualOreintation,
      value: sxualOreintation,
    });
  });

  return array;
};

export const orgRoleOptions = (): IOption[] => {
  const array: IOption[] = [];

  Object.values(OrganizationRoleEnum).forEach((role) => {
    array.push({
      name: role,
      value: role,
    });
  });

  return array;
};

export const highestDegreeOptions = (): IOption[] => {
  const array: IOption[] = [];

  Object.values(HighestDegreeEnum).forEach((degree) => {
    array.push({
      name: degree,
      value: degree,
    });
  });

  return array;
};

export const addressCategoryOptions = (): IOption[] => {
  const array: IOption[] = [];

  Object.values(AddressCategoryEnum).forEach((category) => {
    array.push({
      name: category,
      value: category,
    });
  });

  return array;
};

export const salaryRangeOptions = (): IOption[] => {
  const array: IOption[] = [];

  Object.values(SalaryRangeEnum).forEach((range) => {
    array.push({
      name: range,
      value: range,
    });
  });

  return array;
};

export const nationalityOptions = (): IOption[] => {
  const array: IOption[] = [];

  Object.values(NationalityEnum).forEach((nationality) => {
    array.push({
      name: nationality,
      value: nationality,
    });
  });

  return array;
};

export const racialEthnicGroupOptions = (): IOption[] => {
  const array: IOption[] = [];

  Object.values(RacialEthnicityEnum).forEach((racialEthnic) => {
    array.push({
      name: racialEthnic,
      value: racialEthnic,
    });
  });

  return array;
};

export const ethnicOptions = (): IOption[] => {
  const array: IOption[] = [];

  Object.values(EthnicGroupEnum).forEach((ethnic) => {
    array.push({
      name: ethnic,
      value: ethnic,
    });
  });

  return array;
};
