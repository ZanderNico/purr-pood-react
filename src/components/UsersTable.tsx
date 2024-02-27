import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actions, deleteUser, getAllUsers } from '../slices/userSlice';
import { AppDispatch, RootState } from '../store/store';
import { GetUserData, UserId } from '../types/userTypes';

function UsersTable() {
    const dispatch: AppDispatch = useDispatch();
    const users: GetUserData[]  = useSelector((state: RootState) => state.user.data);
  
    useEffect(() => {
      dispatch(getAllUsers());
    }, [dispatch]);

    const handleDeleteUser = async (userId: any) => {
      try {
        await dispatch(deleteUser(userId));
        dispatch(actions.deleteUserFromState(userId));
      } catch (error) {
        // Handle error, log, or display a notification to the user
        console.error('Error deleting user:', error);
      }
    };
    
  return (
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>User Name</th>
            <th>User Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.email}</td>
              <td>{user.user_name}</td>
              <td>{user.user_role}</td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user.user_id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  {/* Heroicons delete icon */}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable

function deleteUserFromState(userId: any): any {
  throw new Error('Function not implemented.');
}
