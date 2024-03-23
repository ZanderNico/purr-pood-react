import React from 'react'
import UsersTable from '../components/tables/UsersTable'
import PetFoodTable from '../components/tables/PetFoodTable'
import Navbar from '../components/Navbar'
import UserWIthCartsTable from '../components/tables/UserWIthCartsTable'

function AdminPage() {
  return (
    <>
    <Navbar showCartButton={false}/>
    <UsersTable />
    <PetFoodTable/>
    <UserWIthCartsTable/>
    </>
  )
}

export default AdminPage