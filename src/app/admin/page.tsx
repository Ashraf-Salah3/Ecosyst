"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const AdminPage = () => {
    const router = useRouter();
  
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.replace("/login");
      }
    }, [router]);
  return (
    <div className="relative ">
      <p className='absolute left-1/2 top-1/2 transform translate-[-50%] !text-white '>Wolcome To Admin Page</p>
    </div>
  )
}

export default AdminPage