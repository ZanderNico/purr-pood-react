import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createPetFood,
  getAllPetFood,
  uploadPetFoodImage,
} from "../../slices/petFoodSlice";
import { AppDispatch } from "../../store/store";
import UploadPetFoodImage from "../inputs/UploadPetFoodImage";
import InputFields from "../inputs/InputFields";

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

  const handleImageChange = (file: File) => {
    setImageFile(file);
  };

  return (
    <div>
      <h2>Create New Pet Food</h2>
      <InputFields
        label="Food Name"
        value={newPetFoodData.food_name}
        onChange={(value) => setNewPetFoodData({ ...newPetFoodData, food_name: value })}
      />
      <InputFields
        label="Food Description"
        value={newPetFoodData.food_description}
        onChange={(value) => setNewPetFoodData({ ...newPetFoodData, food_description: value })}
      />
      <InputFields
        label="Category"
        value={newPetFoodData.category}
        onChange={(value) => setNewPetFoodData({ ...newPetFoodData, category: value })}
      />
      <InputFields
        label="Price"
        value={newPetFoodData.price}
        onChange={(value) => setNewPetFoodData({ ...newPetFoodData, price: parseFloat(value) || 0 })}
        type="number"
      />
      <InputFields
        label="Stock Quantity"
        value={newPetFoodData.stock_quantity}
        onChange={(value) => setNewPetFoodData({ ...newPetFoodData, stock_quantity: parseInt(value) || 0 })}
        type="number"
      />
      <UploadPetFoodImage
        label="Food Image"
        onChange={handleImageChange}
      />
      <button onClick={handleCreatePetFood}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default CreatePetFoodDialog;
