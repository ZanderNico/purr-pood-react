import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getUsersWithCartsAndPetFood } from "../../slices/cartsSlice";
import { deleteUser } from "../../slices/userSlice";
import { FaTrash } from 'react-icons/fa';

function UserWIthCartsTable() {
  const dispatch: AppDispatch = useDispatch();
  const userWithCarts = useSelector(
    (state: RootState) => state.carts.usersWithCartsAndPetFood
  );

  const [openCartUserId, setOpenCartUserId] = useState<number | null>(null)

  const toggleCartVisibility = (userId: number) => {
    setOpenCartUserId(openCartUserId === userId ? null : userId);
  };

  useEffect(() => {
    dispatch(getUsersWithCartsAndPetFood());
  }, [dispatch]);

  const handleDeleteUser = async (userId: any) => {
    try {
      await dispatch(deleteUser(userId));
      dispatch(getUsersWithCartsAndPetFood());
    } catch (error) {
      // Handle error, log, or display a notification to the user
      console.error('Error deleting user:', error);
    }
  };
  return (
<div>
  <div>
    <table className="border-collapse border border-gray-200 m-4">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
            UserId
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
            Role
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
            Carts
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Delete
          </th>
        </tr>
      </thead>
      {userWithCarts.map((user) => (
        <tbody className="bg-white divide-y divide-gray-200">
          <tr key={user.user_id}>
            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{user.user_id}</td>
            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{user.user_name}</td>
            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{user.user_role}</td>
            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
            <button
                onClick={() => user.user_id !== undefined && toggleCartVisibility(user.user_id)}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                {openCartUserId === user.user_id ? 'Hide Carts' : 'Show Carts'}
              </button>
              {openCartUserId === user.user_id && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                      Cart Id
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                      Food Id
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                      Food Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {user.carts?.map((cart) => (
                    <tr key={cart.cart_id}>
                      <td className="px-6 py-4 whitespace-nowrap border-r">{cart.cart_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-r">{cart.food_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-r">{cart.food_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-r">{cart.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-r">{cart.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-r">{cart.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{cart.stock_quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
            </td>
            <td className="px-8 py-4 whitespace-nowrap border border-gray-200">
              <button
                onClick={() => handleDeleteUser(user.user_id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                  <FaTrash size={20} />
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  </div>
</div>
  );
}

export default UserWIthCartsTable;
