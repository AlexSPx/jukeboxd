import { useStore } from "@nanostores/preact"
import { user } from "../../SpotifyApi/store"

export default function UserHeader() {
  const suser = useStore(user);
  console.log(suser);
  
  return (
      <img src={suser?.images[0].url} alt={suser?.displayName} className="object-cover w-12 h-12 mx-4 rounded-full"/>
  )
}