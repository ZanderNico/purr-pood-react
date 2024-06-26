import { useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { updateUser } from "../../slices/userSlice";

//{ userId: any } need study bkit ayaw kapag UserId type
function UpdateUserForm({ userId }: { userId: any }) {
  const dispatch: AppDispatch = useDispatch();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateUsername = async () => {
    try {
      await dispatch(
        updateUser({
          userId,
          newData: { user_name: newUsername },
        })
      );
      // Optional: Add logic to handle success or show a message to the user
    } catch (error) {
      // Handle error
      console.error("Error updating username:", error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await dispatch(
        updateUser({
          userId,
          newData: { password: newPassword },
        })
      );
      // Optional: Add logic to handle success or show a message to the user
    } catch (error) {
      // Handle error
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Enter new name..."
        value={newUsername}
        onChange={(e: any) => setNewUsername(e.target.value)}
        className="block w-full sm:w-48 md:w-52 lg:w-56 xl:w-56 rounded-full border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
      />

      <button
        onClick={handleUpdateUsername}
        className="flex w-full justify-center rounded-full bg-yellow-400 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
      >
        Update Username
      </button>

      <br />

      <input
        type="password"
        placeholder="Enter new password..."
        value={newPassword}
        onChange={(e: any) => setNewPassword(e.target.value)}
        className="block w-full rounded-full border-0 py-1 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
      />
      <button
        onClick={handleUpdatePassword}
        className="flex w-full justify-center rounded-full bg-yellow-400 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
      >
        Update Password
      </button>
    </div>
  );
}

export default UpdateUserForm;
