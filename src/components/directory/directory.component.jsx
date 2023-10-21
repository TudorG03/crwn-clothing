import "./directory.styles.scss";
import DirectoryItem from "../directory-item/directory-item.component";

const Directory = ({ directory }) => {
  return (
    <div className="directory-container">
      {directory.map((directoryItem) => (
        <DirectoryItem key={directoryItem.id} directoryItem={directoryItem} />
      ))}
    </div>
  );
};

export default Directory;
