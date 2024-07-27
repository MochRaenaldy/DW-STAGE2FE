import { Icon } from "@iconify/react/dist/iconify.js"
import { useNavigate } from "react-router-dom"

const Follows = () => {
  const navigate = useNavigate();

  return (
    <p style={{marginLeft: 10, cursor : "pointer"}} onClick={() =>{navigate("/")}}>
        <Icon icon = {"ep-back"} /> Follows</p>
  )
}

export default Follows