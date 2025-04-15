import { useEffect, useState } from "react"
import { axiosInstance } from "../../services/axios"
import styles from './HomePage.module.css'
import Photo from '../../components/Photo'

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
    <div className={styles.home_container}>
      <h1 className={styles.home_header}>Welcome to our web project!</h1>
      <h2 className={styles.home_header}>Register to see more interesting things!</h2>
      <div className={styles.home_cards}>
        {res.length > 0 ? (
          res.map((item) => (
            <Photo key={item.id} id={item.id} url={item.url} title={item.title}/>
          ))
        ) : (
          'Загрузка...'
        )}
      </div>
    </div>
  )
}
