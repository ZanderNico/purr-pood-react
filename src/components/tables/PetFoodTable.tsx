import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  deletePetFood,
  getAllPetFood,
} from "../../slices/petFoodSlice";
import CreatePetFoodDialog from "../dialogs/CreatePetFoodDialog";
import UpdatePetFoodDialog from "../dialogs/UpdatePetFoodDialog";
import { FaTrash } from "react-icons/fa";

function PetFoodTable() {
  const dispatch: AppDispatch = useDispatch();
  const petfoods = useSelector((state: RootState) => state.petfood.dataById);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState<number | null>(null);

  const [foodImage, setFoodImage] = useState<string | null>(null);

  const handleUpdateDialog = (foodId: number) => {
    setUpdateDialogOpen(true);
    setSelectedFoodId(foodId);
  };
  const handleUpdateCloseDialog = () => {
    setUpdateDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllPetFood());
    };
    fetchData();
  }, [dispatch]);

  const handleDeletePetFood = async (foodId: any) => {
    await dispatch(deletePetFood(foodId));
    dispatch(getAllPetFood());
  };

  return (
    <div>
      <button
        onClick={handleOpenDialog}
        className="flex w-fit justify-center rounded-full bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 mx-4"
      >
        Create Pet Food
      </button>
      <table className="border-collapse border border-gray-200 m-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Food Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Food Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Food Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {petfoods.map((petfood) => (
            <tr key={petfood.food_id}>
              <td className="px-6 py-4 whitespace-nowrap border-r">
                <img
                  src={`http://localhost:5000/petfood/get-image/${petfood.food_id}`}
                  alt={petfood.food_name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-r">
                {petfood.food_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-r">
                {petfood.food_description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-r">
                {petfood.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-r">
                {petfood.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-r">
                {petfood.stock_quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-r">
                <div className="flex gap-1">
                  <button onClick={() => handleUpdateDialog(petfood.food_id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleDeletePetFood(petfood.food_id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDialogOpen && <CreatePetFoodDialog onClose={handleCloseDialog} />}
      {updateDialogOpen && (
        <UpdatePetFoodDialog
          onClose={handleUpdateCloseDialog}
          foodId={selectedFoodId}
        />
      )}
    </div>
  );
}

export default PetFoodTable;
