import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { createPetFood, getAllPetFood } from '../slices/petFoodSlice';
import { PetFoodData } from '../types/petFoodTypes';

function PetFoodTable() {
  const dispatch: AppDispatch = useDispatch();
  const petfoods = useSelector((state: RootState) => state.petfood.data);

  const [newPetFoodData, setNewPetFoodData] = useState<PetFoodData>({
    food_id: 0,
    food_name: '',
    food_description: '',
    category: '',
    price: 0,
    stock_quantity: 0,
    food_image: '',
  });

  useEffect(() => {
    dispatch(getAllPetFood());
  }, [dispatch]);

    // Function to handle pet food creation
    const handleCreatePetFood = () => {
      dispatch(createPetFood(newPetFoodData));
      // Reset form after creating pet food
      setNewPetFoodData({
        food_id: 0,
        food_name: '',
        food_description: '',
        category: '',
        price: 0,
        stock_quantity: 0,
        food_image: '',
      });
    };
  
  return (
    <div>
      <button onClick={handleCreatePetFood}>Create Pet Food</button>
      <table>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Food Description</th>
            {/* Add other table header columns */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {petfoods.map((petfood) => (
            <tr key={petfood.food_id}>
              <td>{petfood.food_name}</td>
              <td>{petfood.food_description}</td>
              {/* Display other pet food data in table rows */}
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

{/* Form for creating new pet food */}
<div>
  <h2>Create New Pet Food</h2>
  <label>Food Name:</label>
  <input
    type="text"
    value={newPetFoodData.food_name}
    onChange={(e) =>
      setNewPetFoodData({ ...newPetFoodData, food_name: e.target.value })
    }
  />
  <label>Food Description:</label>
  <input
    type="text"
    value={newPetFoodData.food_description}
    onChange={(e) =>
      setNewPetFoodData({
        ...newPetFoodData,
        food_description: e.target.value,
      })
    }
  />
  <label>Category:</label>
  <input
    type="text"
    value={newPetFoodData.category}
    onChange={(e) =>
      setNewPetFoodData({ ...newPetFoodData, category: e.target.value })
    }
  />
  <label>Price:</label>
  <input
    type="number"
    value={newPetFoodData.price}
    onChange={(e) =>
      setNewPetFoodData({ ...newPetFoodData, price: Number(e.target.value) })
    }
  />
  <label>Stock Quantity:</label>
  <input
    type="number"
    value={newPetFoodData.stock_quantity}
    onChange={(e) =>
      setNewPetFoodData({
        ...newPetFoodData,
        stock_quantity: Number(e.target.value),
      })
    }
  />
  <button onClick={handleCreatePetFood}>Create</button>
</div>
    </div>
  );
}

export default PetFoodTable