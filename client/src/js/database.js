import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB("jate", 1)
  const editorText = jateDb.transaction("jate", "readwrite")
  const save = editorText.objectStore("jate")
  const request = save.put({ content: content})
  const result = await request
  console.log("******* PUT DB ******", result)

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB("jate", 1)
  const textRetrive = jateDb.transaction("jate", "readonly")
  const save = textRetrive.objectStore("jate")
  const request = save.getAll();
  const result = await request;
  console.log(">>>>> GET DB <<<<<", result)
}

initdb();