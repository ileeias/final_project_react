import { useEffect, useState } from "react"
import { axiosInstance} from "../../services/axios"

export default function HomePage() {
  const [res, setRes] = useState("")
  useEffect(() => {
    async function test() {
      try {
        const response = await axiosInstance.get("/album");
        setRes(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    test();
  }, []);

  return <div>
    {res ? JSON.stringify(res) : (
      "Загрузка..."
    )}

    </div>
}
