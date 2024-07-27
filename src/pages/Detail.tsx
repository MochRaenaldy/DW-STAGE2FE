import { useNavigate, useParams,  } from "react-router-dom";
import { Icon } from "@iconify/react";

const Detail = () => {
  const navigate = useNavigate();

  const dummy= [
    {
      id :1,
    user :{
      username :"Indah Prakarya"
    },
    content : "kalian pernah ga sih main instagram tapi ga bisa dibuka",
    text : "123",
    icon : "ep-back"
    },
    {
      id :2,
      user :{
        username :"aji"
      },
      content : "kalian pernah ga dapet tim megang saber roam tapi mainnya jago",
      
    },
    {
      id :3,
      user :{
        username :"kaja"
      },
      content : "masih coba coba"
    },
  ]
  
    console.log(Detail)
    const params = useParams()
    console.log(params)
  
    return (
    <div> 
      <p style={{marginLeft: 10, cursor : "pointer"}} onClick={() =>{navigate("/")}}>
        <Icon icon = {"ep-back"} /> Detail</p>
       
       {dummy.map((post) => (
        <div style={{ borderBottom:"1px solid gray"}}>
        <div key={post.id} style={{marginLeft : 30}} > 
          <h3>{post.user.username}</h3>
          <p>{post.content}</p>
          <p >{post.text} </p>
          
          </div>
          </div>
      ))}

    </div>
  )
};

export default Detail