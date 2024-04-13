import React, { useState } from 'react'
import UsersTable from '../components/tables/UsersTable'
import PetFoodTable from '../components/tables/PetFoodTable'
import Navbar from '../components/Navbar'
import UserWIthCartsTable from '../components/tables/UserWIthCartsTable'

function AdminPage() {
  const [showUserTable, setShowUserTable] = useState(true);

  const toggleTable = () => {
    setShowUserTable((prevState: any) => !prevState);
  };

  return (
<>
  <Navbar showCartButton={false} />
  <div className="flex flex-col items-center my-4"> 
    <div className="flex justify-center">
      <button
        className="px-4 py-2 mr-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
        onClick={toggleTable}
      >
        {showUserTable ? 'Hide User Table' : 'Show User Table'}
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
        onClick={toggleTable}
      >
        {showUserTable ? 'Show Pet Food Table' : 'Hide Pet Food Table'}
      </button>
    </div>
    <div className="flex justify-center">
      {showUserTable ? <UserWIthCartsTable /> : <PetFoodTable />}
    </div>
  </div>
</>
  )
}

export default AdminPage