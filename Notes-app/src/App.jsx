import React, { useState, useEffect } from 'react';
import NoteItem from './components/NoteItem';

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');

  const addNote = () => {
    if (input.trim()) {
      const newNotes = [...notes, input];
      setNotes(newNotes);
      setInput('');
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 Notes App</h1>
        <div className="flex space-x-2 mb-4">
          <input
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a note..."
          />
          <button
            onClick={addNote}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul>
          {notes.map((note, index) => (
            <NoteItem key={index} note={note} onDelete={() => deleteNote(index)} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
