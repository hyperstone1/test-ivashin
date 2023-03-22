import { useState, useEffect, useContext, useRef } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteForever, MdDone } from 'react-icons/md';
import { Context } from '../context/Context';
import { Form } from 'react-bootstrap';

interface Item {
  item: {
    id: number;
    note: string;
  };
  deleteNote: (id: number) => Promise<void>;
  putNote: (id: number, title: string) => void;
}

const Note = ({ item, deleteNote, putNote }: Item) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(item.note);
  const [noteWithTag, setNoteWithTag] = useState<string[] | null>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState('');
  const [res, setRes] = useState<string[]>([]);
  const { notes } = useContext(Context);

  const handleDeleteNote = async () => {
    deleteNote(item.id);
  };

  useEffect(() => {
    setNoteWithTag(item.note.match(/(#[A-Za-z0-9]+)/g));
    setRes(item.note.split(/(#[A-Za-z0-9]+)/g));
  }, [item, notes]);

  useEffect(() => {
    setNote(res.filter((obj) => !obj.match(/(#[A-Za-z0-9]+)/g)).join(''));
  }, [note, res, noteWithTag]);

  const changeNotes = () => {
    if (ref.current) {
      ref.current.focus();
      setEditMode(!editMode);
    }
  };

  const saveChanges = (id: number) => {
    setEditMode(false);
    putNote(id, title);
  };

  const handleOnChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  return (
    <div className={editMode ? 'note note_edit' : 'note'}>
      <div
        className={editMode ? 'edit-mode container_note' : 'container_note'}
        style={{ position: 'relative' }}
        ref={ref}
      >
        <div data-value={editMode ? title : note} className={editMode ? 'edit_mode note' : 'note'}>
          {editMode ? (
            <Form.Control
              className="control"
              onChange={(e) => handleOnChange(item.id, e as React.ChangeEvent<HTMLInputElement>)}
              type="text"
              value={title}
              autoComplete="off"
            />
          ) : (
            note
          )}
        </div>

        {noteWithTag ? (
          <div className="tags tags_note">
            {res &&
              res.map((item, id) =>
                noteWithTag.includes(item) ? (
                  <span key={id} className={'tag_note'}>
                    {item}
                  </span>
                ) : null,
              )}
          </div>
        ) : null}
      </div>
      <div className={editMode ? 'edit-buttons buttons' : 'buttons'}>
        <MdDone
          className={editMode ? 'visible' : 'invisible'}
          onClick={() => saveChanges(item.id)}
        />
        <BiEditAlt onClick={() => changeNotes()} className="edit" />
        <MdDeleteForever onClick={handleDeleteNote} className="delete" />
      </div>
    </div>
  );
};

export default Note;
