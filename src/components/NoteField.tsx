import { useEffect, useContext } from 'react';
import Note from './Note';
import axios from 'axios';
import { Context } from '../context/Context';

const NoteField = () => {
  const { note, notes, setNotes, selectedTag } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('https://62fd27316e617f88dea5d017.mockapi.io/notes');
      setNotes(data);
    };
    fetchData();
  }, [note, setNotes]);

  const deleteNote = async (id: number) => {
    await axios.delete(`https://62fd27316e617f88dea5d017.mockapi.io/notes/${id}`);
    setNotes(notes.filter((item) => item.id !== id));
  };

  const putNote = async (id: number, title: string) => {
    await axios.put(`https://62fd27316e617f88dea5d017.mockapi.io/notes/${id}`, {
      note: title,
    });
    setNotes(notes.map((obj) => (obj.id === id ? { ...obj, note: title } : obj)));
    console.log(notes);
  };

  const filteredNotes = notes.filter((item) => {
    return item.note.toLowerCase().includes(selectedTag);
  });

  return (
    <>
      {selectedTag ? <h3>Фильтр по тегу: {selectedTag}</h3> : null}
      <div className="container-notes">
        {notes &&
          filteredNotes.map((item, i) => (
            <Note key={item.id} putNote={putNote} deleteNote={deleteNote} item={item} />
          ))}
      </div>
    </>
  );
};

export default NoteField;
