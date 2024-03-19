import { useState } from 'react'
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../slices/userSlice';

//{ userId: any } need study bkit ayaw kapag UserId type
function UpdateUserForm({userId} :{ userId: any } ) {
  const dispatch: AppDispatch = useDispatch();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateUsername = async () => {
    try {
      await dispatch(
        updateUser({
          userId,
          newData: { user_name: newUsername },
        })
      );
      // Optional: Add logic to handle success or show a message to the user
    } catch (error) {
      // Handle error
      console.error('Error updating username:', error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await dispatch(
        updateUser({
          userId,
          newData: { password: newPassword },
        })
      );
      // Optional: Add logic to handle success or show a message to the user
    } catch (error) {
      // Handle error
      console.error('Error updating password:', error);
    }
  };

  return (
    <div>
      <label>
        New Username:
        <input type="text" value={newUsername} onChange={(e: any) => setNewUsername(e.target.value)} />
      </label>
      <button onClick={handleUpdateUsername}>Update Username</button>

      <br />

      <label>
        New Password:
        <input type="password" value={newPassword} onChange={(e: any) => setNewPassword(e.target.value)} />
      </label>
      <button onClick={handleUpdatePassword}>Update Password</button>
    </div>
  );
}

export default UpdateUserForm;