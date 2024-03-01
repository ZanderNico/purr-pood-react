import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createPetFood,
  getAllPetFood,
  uploadPetFoodImage,
} from "../slices/petFoodSlice";
import { AppDispatch } from "../store/store";

interface CreatePetFoodDialogProps {
  onClose: () => void;
}

const CreatePetFoodDialog: React.FC<CreatePetFoodDialogProps> = ({
  onClose,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [newPetFoodData, setNewPetFoodData] = useState({
    food_name: "",
    food_description: "",
    category: "",
    price: 0,
    stock_quantity: 0,
    food_image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);


  const handleCreatePetFood = async () => {

  // Dispatch createPetFood and wait for it to complete
  const petfoodAction = await dispatch(createPetFood(newPetFoodData));

  // Access the food_id from the resolved value
  const updatedFoodId = petfoodAction.payload



    // Call uploadPetFoodImage with the correct foodId
    const uploadResponse = await dispatch(
      uploadPetFoodImage({
        file: imageFile!,
        foodId: updatedFoodId
      })
    );

    dispatch(getAllPetFood());
  
    console.log("Upload response:", uploadResponse);


    // Reset form after creating pet food
    setNewPetFoodData({
      food_name: "",
      food_description: "",
      category: "",
      price: 0,
      stock_quantity: 0,
      food_image: "",
    });
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        setImageFile(selectedFile);
    }
  };

  return (
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
          setNewPetFoodData({
            ...newPetFoodData,
            price: Number(e.target.value),
          })
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
      <label>Food Image:</label>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleCreatePetFood}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default CreatePetFoodDialog;
