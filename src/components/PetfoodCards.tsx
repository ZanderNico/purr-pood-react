import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getAllPetFood } from "../slices/petFoodSlice";
import getTokenAuth from "../utils/getTokenAuth";
import { decodeJwtToken } from "../utils/decodeJwtToken";
import { addCart, getCartWithUserById } from "../slices/cartsSlice";
import Hero from "./hero/Hero";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

function PetfoodCards() {
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const petfoods = useSelector((state: RootState) => state.petfood.dataById);

  const toggleExpansion = (foodId: number) => {
    if (selectedFood === foodId && expanded) {
      // If the same food item is clicked again, close the expanded view
      setExpanded(false);
      setSelectedFood(0);
    } else {
      // If a different food item is clicked, toggle expansion and update the selected food
      setExpanded(true);
      setSelectedFood(foodId);
    }
  };
  const token = getTokenAuth();
  const userData = decodeJwtToken(token);
  //user_id ang laman
  const userId = userData?.user?.user_id;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllPetFood());
    };
    fetchData();
  }, [dispatch]);

  const handleAddToCart = async (petFoodId: number) => {
    await dispatch(
      addCart({ customer_id: userId, food_id: petFoodId, quantity: 1 })
    );
    dispatch(getAllPetFood());
    dispatch(getCartWithUserById(userId));
  };

  const petfoodsByCategory: { [key: string]: any[] } = {};
  petfoods.forEach((petfood) => {
    if (!petfoodsByCategory[petfood.category]) {
      petfoodsByCategory[petfood.category] = [];
    }
    petfoodsByCategory[petfood.category].push(petfood);
  });

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <h1 className="font-bold text-yellow-500 text-2xl sm:text-3xl md:text-3xl xl:text-4xl text-center my-5">
            <span className=" text-slate-500">BEST</span> SELLERS!
          </h1>
          <div>
            <Hero />
          </div>
          <h2 className="text-2xl font-bold text-yellow-500 sm:text-3xl md:text-3xl xl:text-4xl text-center my-10">
            <span className=" text-slate-500">PET</span> FOODS!
          </h2>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="relative flex-1">
              <input
                value={search}
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 rounded-full"
                placeholder="Search for pet food..."
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-slate-500" />
              </div>
            </div>
            <div className="flex-3 relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 rounded-full text-yellow-500 font-semibold"
              >
                <option value="" className="text-yellow-500 font-semibold">
                  Choose a Category
                </option>
                {Object.keys(petfoodsByCategory).map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="text-yellow-500 font-semibold"
                  >
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaFilter className="text-slate-500" />
              </div>
            </div>
          </div>

          {Object.entries(petfoodsByCategory).map(
            ([category, petfoods]) =>
              (!selectedCategory || selectedCategory === category) && (
                <div key={category}>
                  {(selectedCategory === category) ? (
                    <h2 className="text-xl font-bold my-6 text-yellow-500 uppercase">
                      {category}
                    </h2>
                  ): (

                    <h2 className="text-xl font-bold my-6 text-yellow-500 uppercase">
                    {category}
                  </h2>
                  )}
                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {petfoods
                      .filter((petfood) =>
                        petfood.food_name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      )
                      .filter((petfood) =>
                        selectedCategory
                          ? petfood.category === selectedCategory
                          : true
                      )
                      .map((petfood) => (
                        <div
                          className="bg-white border rounded-md h-fit transform transition-transform hover:scale-105"
                          key={petfood.food_id}
                        >
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                            <img
                              src={`http://localhost:5000/petfood/get-image/${petfood.food_id}`}
                              alt={petfood.food_name}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                          </div>
                          <div className="mt-4 flex flex-col gap-1 ml-1">
                            <h3 className="text-sm text-gray-700">
                              <p className="font-bold">{petfood.food_name}</p>
                            </h3>
                            {selectedFood === petfood.food_id ? (
                              <>
                                <p className="mt-1 mr-1 text-sm text-gray-500">
                                  {petfood.food_description}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  Price: {petfood.price}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  Stock: {petfood.stock_quantity}
                                </p>
                              </>
                            ) : (
                              <p className="mt-1 mr-1 text-sm text-gray-500 overflow-hidden w-50 whitespace-nowrap overflow-ellipsis">
                                {petfood.food_description}
                              </p>
                            )}
                          </div>
                          <div>
                            <button
                              className="w-full italic"
                              onClick={() => toggleExpansion(petfood.food_id)}
                            >
                              {selectedFood === petfood.food_id && expanded
                                ? "Show less"
                                : "Read more"}
                            </button>
                          </div>
                          <div>
                            <button
                              className="w-full bg-yellow-400 hover:bg-yellow-500 transition duration-300 ease-in-out rounded-t-none rounded-md"
                              onClick={() => {
                                handleAddToCart(petfood.food_id);
                              }}
                            >
                              add to cart
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default PetfoodCards;
