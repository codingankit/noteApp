/* JavScript Document */

function validate({ noteTitle, note }) {
  noteTitle = noteTitle.trim();
  note = note.trim();
  if (noteTitle.length == 0 && note.length == 0)
    return { errCode: 1, target: 3 };
  if (noteTitle.length > 50 && note.length > 1000)
    return { errCode: 2, target: 3 };
  if (noteTitle.length > 50 && note.length == 0) return { errCode: 3 };
  if (noteTitle.length == 0 && note.length > 1000) return { errCode: 4 };
  if (noteTitle.length == 0) return { errCode: 1, target: 1 };
  if (note.length == 0) return { errCode: 1, target: 2 };
  if (noteTitle.length > 50) return {errCode: 2,
      target: 1,};
  if (note.length > 1000) return {errCode: 2,
      target: 2,};
  return { errCode: 0 };
}

export default validate;
