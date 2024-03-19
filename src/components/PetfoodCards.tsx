import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getAllPetFood } from "../slices/petFoodSlice";

function PetfoodCards() {
  const dispatch: AppDispatch = useDispatch();
  const petfoods = useSelector((state: RootState) => state.petfood.dataById);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllPetFood());
    };
    fetchData();
  }, [dispatch]);

  const petfoodsByCategory: { [key: string]: any[] } = {};
  petfoods.forEach((petfood) => {
    if (!petfoodsByCategory[petfood.category]) {
      petfoodsByCategory[petfood.category] = [];
    }
    petfoodsByCategory[petfood.category].push(petfood);
  });

  return (
    <div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        PETFOODS
      </h2>

      {/* Render petfoods by category */}
      {Object.entries(petfoodsByCategory).map(([category, petfoods]) => (
        <div key={category}>
          <h2 className="text-lg font-bold mt-6">{category}</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {petfoods.map((petfood) => (
              <div className="group relative" key={petfood.food_id}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                  <img
                    src={`http://localhost:5000/petfood/get-image/${petfood.food_id}`}
                    alt={petfood.food_name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p className="font-bold">{petfood.food_name}</p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {petfood.food_description}
                    </p>
                  </div>
                  <div className="flex justify-end flex-col">
                    <p className="text-sm font-medium text-gray-900">
                      Price: {petfood.price}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      Stock: {petfood.stock_quantity}
                    </p>
                  </div>
                </div>
                <button className="w-full bg-gray-200 group-hover:bg-green-500 transition duration-300 ease-in-out">
                  add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default PetfoodCards;
