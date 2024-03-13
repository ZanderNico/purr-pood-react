import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { createPetFood, deletePetFood, getAllPetFood, getFoodImageById } from "../slices/petFoodSlice";
import CreatePetFoodDialog from "./CreatePetFoodDialog";
import UpdatePetFoodDialog from "./UpdatePetFoodDialog";

function PetFoodTable() {
  const dispatch: AppDispatch = useDispatch();
  const petfoods = useSelector((state: RootState) => state.petfood.dataById);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState<number | null>(null);

  const [foodImage, setFoodImage] = useState<string | null>(null);

  const handleUpdateDialog = (foodId: number) => {
    setUpdateDialogOpen(true)
    setSelectedFoodId(foodId);
  }
  const handleUpdateCloseDialog = () => {
    setUpdateDialogOpen(false)
  }

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

  const handleDeletePetFood = async (foodId : any) => {
    await dispatch(deletePetFood(foodId))
    dispatch(getAllPetFood());
  }


  return (
    <div>
      <button onClick={handleOpenDialog}>Create Pet Food</button>
      <table>
        <thead>
          <tr>
            <th>Food Image</th>
            <th>Food Name</th>
            <th>Food Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {petfoods.map((petfood) => (
            <tr key={petfood.food_id}>
              <td>
                <img
                  src={`http://localhost:5000/petfood/get-image/${petfood.food_id}`}
                  alt={petfood.food_name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>{petfood.food_name}</td>
              <td>{petfood.food_description}</td>
              <td>{petfood.category}</td>
              <td>{petfood.price}</td>
              <td>{petfood.stock_quantity}</td>
              <td>
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
      {isDialogOpen && <CreatePetFoodDialog onClose={handleCloseDialog} />}
      {updateDialogOpen && <UpdatePetFoodDialog onClose={handleUpdateCloseDialog} foodId={selectedFoodId}/>}
    </div>
  );
}

export default PetFoodTable;
