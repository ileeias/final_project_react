import { useEffect, useState } from "react"
import { axiosInstance } from "../../services/axios"
import Photo from '../../components/Photo'
import '../../styles/pages/homepage.scss'

export default function HomePage() {
  const [res, setRes] = useState([])
  useEffect(() => {
    async function publicPhoto() {
      try {
        const response = await axiosInstance.get("/photo/public");
        setRes(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    publicPhoto();
  }, []);

  return (
    <div className="home_container">
      <h1 className="home_header">Welcome to our web project!</h1>
      <h1 className="home_header">Register to see more interesting things!</h1>
      <div className="home_cards">
        {res.length > 0 ? (
          res.map((item) => (
            <Photo key={item._id} id={item._id} url={item.url} title={item.title} />
          ))
        ) : (
          'Загрузка...'
        )}
      </div>
    </div>
  )
}
