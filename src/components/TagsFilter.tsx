import { useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { Tags } from '../context/Context';

const TagsFilter = () => {
  const { notes, selectedTag, setSelectedTag, tags, setTags } = useContext(Context);
  const tagsInNotes: Tags[] = [];

  useEffect(() => {
    // eslint-disable-next-line
    notes.map((item) => {
      if (item.note.match(/(#[A-Za-zА-ЯЁа-яё0-9]+)/g)) {
        const noteWords = item.note.split(/(#[A-Za-zА-ЯЁа-яё0-9]+)/g);
        noteWords.map((obj, idx) =>
          obj.match(/(#[A-Za-zА-ЯЁа-яё0-9]+)/g) ? tagsInNotes.push({ id: idx, note: obj }) : null,
        );
      }
    });
    setTags(tagsInNotes);
    // eslint-disable-next-line
  }, [notes]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Фильтр по тегу
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {tags &&
            tags.map((item, i) => (
              <Dropdown.Item
                key={i}
                style={{ color: 'red' }}
                onClick={() => setSelectedTag(item.note)}
              >
                {item.note}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      {selectedTag ? (
        <Button
          style={{ width: '150px', height: ' 60%' }}
          variant="danger"
          onClick={() => setSelectedTag('')}
        >
          Убрать фильтр
        </Button>
      ) : null}
    </div>
  );
};

export default TagsFilter;
