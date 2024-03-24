import { useEffect } from "react";
import getTokenAuth from "../../utils/getTokenAuth";
import { decodeJwtToken } from "../../utils/decodeJwtToken";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCartWithUserById, updateCartsQuantity } from "../../slices/cartsSlice";
import { getAllPetFood } from "../../slices/petFoodSlice";

function CartMenu() {
  const dispatch: AppDispatch = useDispatch();
  const userWithCarts = useSelector(
    (state: RootState) => state.carts.usersWithCartsAndPetFoodById
  );
  const token = getTokenAuth();
  const userData = decodeJwtToken(token);
  //user_id ang laman
  const userId = userData?.user?.user_id;

  console.log("SA CARTMENU", userWithCarts);

  useEffect(() => {
    dispatch(getCartWithUserById(userId));
  }, [dispatch, userId]);

  const handleIncreQuantity = async (quantity: number, cartId: number) => {
    await dispatch(updateCartsQuantity({cartsQuantity: quantity, cart_id: cartId}))
    dispatch(getCartWithUserById(userId));
    dispatch(getAllPetFood());
  }

  const handleDecreQuantity = async (quantity: number, cartId: number) => {
    await dispatch(updateCartsQuantity({cartsQuantity: quantity, cart_id: cartId}))
    dispatch(getCartWithUserById(userId));
    dispatch(getAllPetFood());
  }

  const handleDeleteCart = async (cartId: number) => {
    await dispatch(deleteCart(cartId))
    dispatch(getCartWithUserById(userId));
    dispatch(getAllPetFood());
  }

  return (
    <div className="absolute top-16 right-0 left-0 sm:right-1 md:right-4 md:left-auto bg-gray-400 p-4 z-10">
      <div className="bg-white rounded-lg shadow-lg p-3 w-full overflow-auto">
      {userWithCarts.carts?.map((cart) => (
            <div
              className="flex items-center justify-between py-3"
              key={cart.cart_id}
            >
              <div className="flex items-center gap-2">
                <img
                  className="w-16 h-16 rounded-full"
                  src={`http://localhost:5000/petfood/get-image/${cart.food_id}`}
                  alt="sample"
                />
                <div className="inline-block overflow-auto max-w-[100px] mx-2">
                  <h2 className="font-semibold">{cart.food_name}</h2>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 ">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 py-1 rounded"
                onClick={()=>{handleDecreQuantity(cart.quantity - 1 , cart.cart_id)}}>
                  -
                </button>
                <span>{cart.quantity}</span>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 py-1 rounded"
                onClick={() => {handleIncreQuantity(cart.quantity + 1 ,cart.cart_id)}}>
                  +
                </button>
                <div className="flex gap-1">
                  <span>₱ </span>
                  <span>
                    {parseFloat(cart.price) * cart.quantity}
                  </span>
                </div>
                <div>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded"
                  onClick={() => {handleDeleteCart(cart.cart_id)}}>
                    X
                  </button>
                </div>
              </div>
            </div>
        ))} 
      </div>
    </div>
  );
}

export default CartMenu;
