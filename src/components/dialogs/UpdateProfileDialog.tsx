import React from "react";
import UpdateUserForm from "../forms/UpdateUserForm";
import getTokenAuth from "../../utils/getTokenAuth";
import { decodeJwtToken } from "../../utils/decodeJwtToken";

function UpdateProfileDialog({ handleDialogClose }: any) {
  const token = getTokenAuth();
  const userData = decodeJwtToken(token);
  //user_id ang laman
  const userId = userData?.user?.user_id;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 gap-1">
      <div className="bg-white p-4 rounded flex flex-col gap-2 justify-center items-center">
        <h1 className="font-bold">Update Your Profile</h1>
        <UpdateUserForm userId={userId} />
        <button
          onClick={handleDialogClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded-full w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default UpdateProfileDialog;
