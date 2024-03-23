import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getUsersWithCartsAndPetFood } from "../../slices/cartsSlice";

function UserWIthCartsTable() {
  const dispatch: AppDispatch = useDispatch();
  const userWithCarts = useSelector(
    (state: RootState) => state.carts.usersWithCartsAndPetFood
  );

  useEffect(() => {
    dispatch(getUsersWithCartsAndPetFood());
  }, [dispatch]);
  return (
    <div className="overflow-x-auto">
      {userWithCarts.map((user) => (
        <div key={user.user_id}>
          {" "}
          {/* Moved the key attribute to the parent element */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  UserId
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carts
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr key={user.user_id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.user_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.user_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.user_role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cart Id
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Food Id
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Food Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cart.cart_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cart.food_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cart.food_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cart.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cart.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cart.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cart.stock_quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default UserWIthCartsTable;
