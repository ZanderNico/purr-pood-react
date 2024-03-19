import { useEffect } from 'react'
import UpdateUserForm from '../components/forms/UpdateUserForm'
import { decodeJwtToken } from '../utils/decodeJwtToken';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getUserById } from '../slices/userSlice';

import PetfoodCards from '../components/PetfoodCards';

function HomePage() {
  const dispatch: AppDispatch = useDispatch()
  const userByIdData = useSelector((state: RootState) => state.user.dataById);
  const token = localStorage.getItem("token");

  if (token === null) {
    return null;
  }
    const userData = decodeJwtToken(token);
    useEffect(() => {
      // Dispatch the getUserById thunk
      dispatch(getUserById(userData.user.user_id));
    }, [dispatch, userData.user.user_id]);

    console.log("HOMEEEIE", userByIdData[0]?.user_id);
    const userId = userByIdData[0]?.user_id; // Optional chaining to handle undefined value

    if (!userId) {
      // Handle the case where userByIdData is undefined or empty
      return null;
    }
  return (
    <>
    <div>HomePage</div>
    <UpdateUserForm userId={userId} />
    <PetfoodCards/>
    </>
  )
}

export default HomePage