import logo from "../../assets/images/LOGO.png";
import qrCodeImg from "../../assets/images/linktree_qr.jpg"
import './styles.css'
import { useNavigate } from 'react-router-dom';

interface IHeaderProps {
  startAnimationBack?: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminHeader(props: IHeaderProps) {
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    if (props.startAnimationBack) props.startAnimationBack(true);

    setTimeout(() => {
      navigate(route);
    }, 1000)
  };

  return (
    <div className='header-principal'>
      <div className="areaInteractive">
        <button className="back-button" onClick={() => handleClick('/menu')}>VOLTAR</button>
      </div>
      <img className="logo" src={logo}/>
      <div className="areaInteractive channels">
        
      </div>
    </div>
  )
}

export default AdminHeader;