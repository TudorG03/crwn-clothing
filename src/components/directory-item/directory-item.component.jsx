import './directory-items.styles.scss';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ directoryItem }) => {
    const { imageUrl, title } = directoryItem;
    const navigate = useNavigate();

    const handleDirectoryItemClick = () => {
      navigate(`/shop/${title.toLowerCase()}`);
    }

    return (
        <div className="directory-item-container">
            <div className="background-image" style={{
              backgroundImage: `url(${imageUrl})`
            }}/>
            <div className="directory-item-body" onClick={handleDirectoryItemClick}>
              <h2>{title}</h2>
              <p>Shop now</p>
            </div>
          </div>
    );
};

export default DirectoryItem;