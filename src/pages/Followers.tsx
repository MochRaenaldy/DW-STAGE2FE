import React, { useEffect, useState } from 'react'
import useStore from '../stores/hooks'
import { IFollowers } from '../types/follow'
import { Box, Typography } from '@mui/material'
import { api } from '../libs/api'

const Followers = () => {
  // const {user} = useStore()
  // const [users, setUsers] = useState<IFollowers[]>([])>

  // const userList = async () => {
  //   const res = await api.get(`/users/followers/${user.id}`)
  //   setUsers(res.data)
  // }
  // useEffect(() => {
  //   userList()
  // }, [])
  
    return (
      <div>
        followers
      </div>
    // <Box sx={{backgroundColor: "#262636", padding:2, boxSizing: "border-box", borderRadius: "5px", display: "flex", flexDirection: "column", gap: "15px"}}>
    //   {users.map((user, index) => {
    //     const img = `{baseUrl.baseUrlImg}${user.profile_pic}`
    //     return (
    //       <Box key={index} sx={{display: "flex", alignItems: "center",  justifyContent: "space-between"}}>
    //         <Box sx={{display: "flex", alignItems: "center",  gap: "10px"}}>
    //           <img src={img} alt="" style={{width:"3rem", height: "3rm", borderRadius: "45px", objectFit: "cover"}}/>
    //           <Box sx={{display: "flex", flexDirection: "column", px:2}}>
    //             <Typography sx={{color: "white"}} >{user.followers.username}</Typography>
    //             <Typography sx={{color: "white"}} >{user.followers.fullName}</Typography>
    //           </Box>
    //         </Box>
    //       </Box>
    //     )
    //   }

    //   )}
      
    // </Box>
  )
}

export default Followers