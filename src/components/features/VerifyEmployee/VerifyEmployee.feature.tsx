import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
// import { useRouter } from 'react-location';
import { useEmployeeStore } from '../../../store/Employee.store';
import {
  ValidateEmployeeFormSchema,
  ValidateEmployeeFormTypes,
} from './form-resolver/VerifyEmployee';
import { Form } from '../../shared/Form';
import Select, { IOption } from '../../shared/Select';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import { useVerifyEmployee } from '../../../services/verify_employee/auth.hooks';
import { useNavigate } from 'react-location';

const VerifyEmployeeFeature: React.FC = () => {
  const [isNewHire, setIsNewHire] = useState(false);
  const [validate, setValidate] = useState({
    idNumber: '',
    email: '',
  });

  const navigate = useNavigate();

  // const router = useRouter();

  const [setEmployee] = useEmployeeStore((state) => [state.setEmployee]);

  const useFormReturn = useForm<ValidateEmployeeFormTypes>({
    resolver: yupResolver(ValidateEmployeeFormSchema),
    mode: 'onChange',
  });

  const { setError } = useFormReturn;

  const { isLoading } = useVerifyEmployee(validate.idNumber, validate.email, {
    enabled: !!validate.email && !!validate.idNumber,
    onSuccess: (e) => {
      setEmployee({
        ...e,
        emailUsedByUser:
          validate.email === e?.personalEmail ? e?.personalEmail : e?.workEmail,
      });
      navigate({ to: `/employee-information/${e?.id}` });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (e: any) => {
      if (e.status === 404) {
        setError('email', {
          message: 'Email and Employee ID did not match our records.',
        });
        setError('idNumber', {
          message: 'Email and Employee ID did not match our records.',
        });
      }
    },
  });

  const onSubmit = (e: ValidateEmployeeFormTypes) => {
    setValidate(() => ({
      email: e.email,
      idNumber: isNewHire ? `${e.idNumber}` : `${e.employeeType}${e.idNumber}`,
    }));
  };

  const handleChange = (e: IOption) => {
    e.value === 'TEMPID-' ? setIsNewHire(true) : setIsNewHire(false);
  };

  return (
    <div>
      <div className='mb-5'>
        <p className='text-xl font-bold'>Verify Employee ID</p>
        <p className='text-gray-600 text-sm'>
          Enter your employee details to proceed to next steps
        </p>
      </div>
      <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
        <div className='flex flex-wrap'>
          <Select
            onOptionChange={handleChange}
            label='Employee Type'
            name='employeeType'
            options={[
              { value: null, name: 'Select Employee Type' },
              { value: '', name: 'KMCS Internal' },
              { value: 'C', name: 'KMCC Internal' },
              { value: 'ID', name: 'Client Distributed Team' },
            ]}
            className='mb-4 w-full md:w-1/2 px-1'
          />

          <Input
            label='Employee ID (Numeric value only)'
            name='idNumber'
            placeholder='Enter Employee ID'
            className='mb-4 w-full md:w-1/2 px-1'
            type='number'
          />
        </div>

        <Input
          label='Email Address (Work or Personal Email)'
          name='email'
          placeholder='Enter Employee Email Address'
          className='px-1'
        />

        <div className='mt-4 flex justify-end '>
          <Button type='submit' isLoading={isLoading}>
            Verify
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default VerifyEmployeeFeature;
