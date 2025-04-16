import '../../styles/pages/notfound.scss'
import { Link } from 'react-router-dom';
export default function NotFound() {

  return (
    <div className="wrapper">
      <div className="nf-container">
        <h2 className="nf-title">
          Ничего на найдено. Перейдите на <Link to="/">главную</Link>{" "}
        </h2>
        <img src="https://img.freepik.com/premium-vector/website-construction-illustration_86047-169.jpg?w=826" alt="Not Found" className="nf-img" />
      </div>
    </div>
  );
}