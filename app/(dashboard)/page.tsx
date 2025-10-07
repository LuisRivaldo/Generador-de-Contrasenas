import React from 'react'
import FormCreatePassword from './_components/form_create_password'
import PasswordLists from './_components/password_lists'

const DashboardPage = () => {
  return (
    <div className='container mx-auto px-4'>
      <FormCreatePassword />
      <PasswordLists />
    </div>
  )
}

export default DashboardPage
