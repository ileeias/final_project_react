import { useEffect, useState } from "react"
import { axiosInstance } from "../../services/axios"
import styles from './HomePage.module.css'

export default function HomePage() {
  const [res, setRes] = useState([])
  useEffect(() => {
    async function test() {
      try {
        const response = await axiosInstance.get("/album");
        setRes(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    test();
  }, []);

  return (
    <div className={styles.home_container}>
      <h1 className={styles.home_header}>Post Collection</h1>
      <div className={styles.home_cards}>
        {res.length > 0 ? (
          res.map((item) => (
            <div key={item.id} className={styles.home_card}>
              <h1 className={styles.home_title}>{item.title}</h1>
              <p className={styles.home_year}>{item.year}</p>
            </div>
          ))
        ) : (
          'Загрузка...'
        )}
      </div>
    </div>
  )
}
