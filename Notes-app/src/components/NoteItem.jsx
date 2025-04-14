import React from 'react';

const NoteItem = ({ note, onDelete }) => {
  return (
    <li className="flex justify-between items-center bg-gray-50 rounded-xl p-3 mb-2 border">
      <span>{note}</span>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 font-bold"
      >
        Delete
      </button>
    </li>
  );
};

export default NoteItem;
