import SignupForm from "../components/forms/SignupForm"
import bg from "../assets/petFoodBackground.jpg"


function SignupPage() {
  
  return (
    <>
      <div
        className="min-h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col justify-center items-center gap-1">
          <h1 className="text-4xl sm:text-6xl xl:text-7xl text-yellow-400 font-bold">PURR POOD</h1>
          <p className="text-xl sm:text-2xl xl:text-3xl text-yellow-400 font-semibold italic m-1">
            "Pet food that works."
          </p>
        </div>
        <SignupForm/>
      </div>
    </>
  )
}

export default SignupPage