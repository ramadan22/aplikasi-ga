import { useState } from 'react';

const UseForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return {
    oldPassword,
    setOldPassword,
    showOldPassword,
    setShowOldPassword,
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
