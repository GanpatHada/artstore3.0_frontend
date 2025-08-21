import { RiFileList3Line } from 'react-icons/ri';
import './EmptyList.css'
const EmptyList = () => {
  return (
    <div className="empty-list">
      <div>
        <RiFileList3Line />
      </div>
      <div>
        There are no items in this List. <br />
        Add items you want to shop for.
      </div>
    </div>
  );
};

export default EmptyList
