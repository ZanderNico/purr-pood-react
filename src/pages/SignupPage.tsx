import SignupForm from "../components/forms/SignupForm"
import bg from "../assets/petFoodBackground.jpg"
import logo from "../assets/good-pet-food.svg"

function SignupPage() {
  
  return (
    <>
      <div
        className="min-h-screen flex flex-col justify-center items-center"
      >
        <img
          src={bg}
          alt="background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-45 z-10"></div>
        <div className="flex flex-col justify-center items-center gap-1 relative z-20 rounded-md  px-14 pt-4 bg-white">
        <img className="max-h-16 max-w-16 mt-2" src={logo} alt="Logo" />
          <h1 className="text-3xl  text-yellow-400 font-bold p-2">
            <span className=" text-slate-500">PURR</span> POOD
          </h1>
          <p className="text-2sm text-yellow-400 font-semibold italic m-1">
            "Pet food that works."
          </p>
          <SignupForm/>
        </div>
      </div>
    </>
  )
}

export default SignupPage