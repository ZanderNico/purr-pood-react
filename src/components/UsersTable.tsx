import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../reducers/userSlice';
import { AppDispatch, RootState } from '../store/store';
import { GetUserData } from '../types/userTypes';

function UsersTable() {
    const dispatch: AppDispatch = useDispatch();
    const users: GetUserData[]  = useSelector((state: RootState) => state.user.data);
  
    useEffect(() => {
      dispatch(getAllUsers());
    }, [dispatch]);
    
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable