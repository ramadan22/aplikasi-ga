import { useState } from 'react';

const UseForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return {
    newPassword,
    setNewPassword,
    showNewPassword,
    setShowNewPassword,
    confirmPassword,
    setConfirmPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
};

export default UseForm;
