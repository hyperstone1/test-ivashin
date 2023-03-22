import { useContext } from 'react';
import { Context } from '../context/Context';

const TagsList = () => {
  const { tags, setSelectedTag } = useContext(Context);

  return (
    <div className="tags tags_container">
      <h4>Все теги</h4>
      <div className="tags_list">
        {tags &&
          tags.map((item, i) => (
            <div key={i} className="tag" onClick={() => setSelectedTag(item.note)}>
              {item.note}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TagsList;
