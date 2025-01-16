import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setName, setMobileNumber } from '../features/signup/signupSlice';
import { api } from '../services/api';
import { useMutation } from '@tanstack/react-query';

export const useSignup = () => {
  const dispatch = useDispatch();
  const signupState = useSelector((state) => state.signup);

  // Create mutation using React Query
  const { mutate: submitSignup, isLoading, error, isError } = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/auth/create-user', userData);
      return response.data;
    },
    onError: (error) => {
      console.error('Signup error:', error.response?.data || error.message);
      return error.response?.data?.message || 'An error occurred during signup';
    }
  });

  const handleEmailChange = (email) => {
    dispatch(setEmail(email));
  };

  const handleNameChange = (name) => {
    dispatch(setName(name));
  };

  const handleMobileNumberChange = (number) => {
    dispatch(setMobileNumber(number));
  };

  const handleSubmit = async () => {
    submitSignup({
      email: signupState.email,
      name: signupState.name,
      mobileNumber: signupState.mobileNumber,
    });
  };

  const resetForm = () => {
    dispatch(setEmail(''));
    dispatch(setName(''));
    dispatch(setMobileNumber(''));
  };

  return {
    // State
    email: signupState.email,
    name: signupState.name,
    mobileNumber: signupState.mobileNumber,
    loading: isLoading,
    error: isError ? error : null,

    // Handlers
    handleEmailChange,
    handleNameChange,
    handleMobileNumberChange,
    handleSubmit,
    resetForm,
  };
};