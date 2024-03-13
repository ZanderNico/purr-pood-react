import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useState } from "react";
import { GetPetFoodData } from "../types/petFoodTypes";
import { getAllPetFood, updatePetFood, uploadPetFoodImage } from "../slices/petFoodSlice";
import InputFields from "./inputs/InputFields";
import UploadPetFoodImage from "./inputs/UploadPetFoodImage";

interface UpdatePetFoodDialogProps {
  onClose: () => void;
  foodId: number | null;
}

const UpdatePetFoodDialog: React.FC<UpdatePetFoodDialogProps> = ({
  onClose,
  foodId,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<Partial<GetPetFoodData>>({}); // Adjust the type as needed
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (file: File) => {
    setImageFile(file);
  };

  const handleSubmit = async () => {
    try {
      if (foodId) {
        const hasUpdates = Object.keys(formData).length > 0 || imageFile !== null;
  
        if (!hasUpdates) {
          // No updates to perform
          onClose(); // Close the dialog
          return;
        }
  
        if (imageFile !== null) {
          await dispatch(uploadPetFoodImage({ file: imageFile!, foodId }));
        }
  
        // Filter out empty values from the form data
        const updatedData = Object.fromEntries(
          Object.entries(formData).filter(([_, value]) => value !== "")
        );
  
        // Dispatch the updatePetFood action if there are other fields to update
        if (Object.keys(updatedData).length > 0) {
          await dispatch(updatePetFood({ updatedData: updatedData, foodId }));
        }
    
        dispatch(getAllPetFood());
        setFormData({});
        setImageFile(null);
        onClose();
      } else {
        throw new Error("Food ID is missing");
      }
    } catch (error) {
      console.error("Failed to update pet food:", error);
      // Handle error if needed
    }
  };

  return (
    <div>
     <InputFields
        label="Food Name"
        value={formData.food_name || ""}
        onChange={(value) => handleInputChange("food_name", value)}
      />
      <InputFields
        label="Food Description"
        value={formData.food_description || ""}
        onChange={(value) => handleInputChange("food_description", value)}
      />
      <InputFields
        label="Category"
        value={formData.category || ""}
        onChange={(value) => handleInputChange("category", value)}
      />
      <InputFields
        label="Price"
        value={formData.price || 0}
        onChange={(value) => handleInputChange("price", value)}
        type="number"
      />
      <InputFields
        label="Stock Quantity"
        value={formData.stock_quantity || 0}
        onChange={(value) => handleInputChange("stock_quantity", value)}
        type="number"
      />
      <UploadPetFoodImage
        label="Food Image"
        onChange={handleImageChange}
      />
      <button onClick={handleSubmit}>Update Pet Food</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default UpdatePetFoodDialog;
