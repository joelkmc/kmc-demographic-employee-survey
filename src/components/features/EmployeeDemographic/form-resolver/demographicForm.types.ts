export enum YrsWithKmcEnum {
  LESS_1_YR = 'Less than one year',
  MORE_1_YR_LESS_2_YRS = 'One year to less than two years',
  MORE_2_YR_LESS_5_YRS = 'Two years to less than five years',
  MORE_5_YR_LESS_10_YRS = 'Five years to less than ten years',
  MORE_10_YRS = 'Ten years or more',
}

export enum SexualOrientationEnum {
  LESBIAN = 'Lesbian',
  GAY = 'Gay',
  BISEXUAL = 'Bisexual',
  TRANSGENDER = 'Transgender',
  TRANSEXUAL = 'Transexual',
  QUEER = 'Queer',
  QUESTIONING = 'Questioning',
  INTERSEX = 'Intersex',
  ASEXUAL = 'Asexual',
  PANSEXUAL = 'Pansexual',
  NON_BINARY = 'Non-Binary',
}

export enum OrganizationRoleEnum {
  MANAGER = 'Manager/supervisor higher than first level(including senior management positions)',
  FIRST_LEVEL_SUPERVISOR = 'First-level supervisor',
  NOT_MANAGER_NOT_SUPERVISOR = 'Not a manager or supervisor',
}

export enum HighestDegreeEnum {
  HIGHSCHOOL = 'High School or Elementary Diploma',
  BACHELORS = "Bachelor's Degree",
  MASTERS = "Master's Degree",
  DOCTORATE = 'Doctorate',
}

export enum AddressCategoryEnum {
  OWNED = 'Owned or being bought by you(or someone in the household)',
  RENTED = 'Rented for money',
  OCCUPIED = 'Occupied withoud payment of money or rent',
}

export enum SalaryRangeEnum {
  SR_12000_15999 = '₱12,000 througn ₱15,999',
  SR_16000_24999 = '₱16,000 througn ₱24,999',
  SR_25000_34999 = '₱25,000 througn ₱34,999',
  SR_35000_49999 = '₱35,000 througn ₱49,999',
  SR_50000_74999 = '₱50,000 througn ₱74,999',
  SR_75000_99999 = '₱75,000 througn ₱99,999',
  SR_100000_GREATER = '₱100,000 and greater',
}

export enum NationalityEnum {
  FILIPINO = 'Filipino',
  FOREIGN = 'Foreign',
}

export enum RacalEthnicityEnum {
  AMERICAN = 'American',
  AFRICAN_AMERICAN = 'African American',
  HISPANIC = 'Hispanic',
  ASIAN = 'Asian',
  CAUCASIAN = 'Caucasian',
}

export enum EthnicGroup {
  TAGALOG = 'Tagalog',
  VISAYAN = 'Visayan (Cebuano, Waray, Hiligaynon / Ilongo, Karay-a, Aklanon, Masbatenyo, Romblomanon)',
  ILOCANO = 'Ilocano',
  BIKOL = 'Bikol',
  KAPAMPANGAN = 'Kapampangan',
  PANGASINAN = 'Pangasinan',
  ZAMBOANGUENO = 'Zamboangueño',
}

export enum IndegenousTribeEnum {
  IGOROT = 'Igorot Tribes from the Northern Philippines',
  LUMAD = 'Lumad Tribes from the Southern Philippines',
  BADJOA = 'Badjaos',
  ATI_TUMANDOK = 'Ati and Tumandok',
  PALAWAN_TRIBES = 'Palawan Tribes',
  MANGYAN = 'Mangyan',
  AETAS_NEGRITOS = 'Aetas or Negritos',
  OTHERS = 'Others',
}

export enum Pulse2022Enum {
  READY_TO_OVER = 'Ready for 2021 to be over',
  FEELING_GREAT_BONUS = 'Ready for 2021 to be over',
  FEELING_GREAT_WORRIED = 'Ready for 2021 to be over',
  GREAT_YEAR = 'Ready for 2021 to be over',
  START_JOB_NEW_COMPANY = 'Ready for 2021 to be over',
  CANT_WAIT_BACK_TO_OFFICE = 'Ready for 2021 to be over',
  DREADING_BACK_TO_OFFICE = 'Ready for 2021 to be over',
  WORRIED_OMICRON = 'Ready for 2021 to be over',
}

export type InformationUpdateFormType = {
  workEmail: string;
  updatePermanentAddress: boolean;
  updateCurrentAddress: boolean;
  mobileNumber: string;

  cA_Line1: string;
  cA_City: string;
  cA_State: string;
  cA_Country: string;
  cA_ZipCode: string;

  permanent_Line1: string;
  permanent_City: string;
  permanent_State: string;
  permanent_Country: string;
  permanent_ZipCode: string;
};

export type DemographicFormType = {
  // 2nd Part
  // nbiClearanceSubmissionDate: string; // required if nbi clearance already submitted
  // nbiClearanceFilePath: string; // required if nbi clearance not yet submitted
  // // 3rd Part
  // yearsWithKMC: string;
  // sexualOrientation: string;
  // organizationalRole: string;
  // highestDegreeEarned: string;
  // addressCategory: string;
  // salaryRange: string;
  // nationality: string;
  // ethnicity: string;
  // ethnicGroup: string;
  // partOfIndigenousTribes: boolean;
  // indigenousTribe: string; // required if partOfIndigenousTribes === true
  // pulseFor2022: string; // concat all answers with semicolon
};
