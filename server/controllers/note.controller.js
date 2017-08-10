import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';

export function getSomething(req, res) {
  return res.status(200).end();
}

export function addNote(req, res) {
	console.log("addNote");
  if (!req.body.task) {
    res.status(403).end();
  }
console.log("note.controler");
  const newNote = new Note(req.body);

  newNote.id = uuid.v4();
  console.log("newNote: ");
  console.log(newNote);

  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({id: req.params.laneId})
      .then(lane => {
        lane.notes.push(saved);
        return lane.save()
      })
      .then(() => {
        res.json(saved);
      });
  });
}
