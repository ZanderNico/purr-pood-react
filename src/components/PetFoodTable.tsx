import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { createPetFood, getAllPetFood } from '../slices/petFoodSlice';
import CreatePetFoodDialog from './CreatePetFoodDialog';

function PetFoodTable() {
  const dispatch: AppDispatch = useDispatch();
  const petfoods = useSelector((state: RootState) => state.petfood.dataById);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
          </tr>
        </thead>
        <tbody>
          {petfoods.map((petfood) => (
            <tr key={petfood.food_id}>
               <td>
                {/* Display the image using an img tag */}
                <img src={`http://localhost:5000/petfood/get-image/${petfood.food_id}`} alt={petfood.food_name} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{petfood.food_name}</td>
              <td>{petfood.food_description}</td>
              <td>{petfood.category}</td>
              <td>{petfood.price}</td>
              <td>{petfood.stock_quantity}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDialogOpen && (
        <CreatePetFoodDialog onClose={handleCloseDialog} />
      )}
    </div>
  );
}

export default PetFoodTable