import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate_DB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate_table')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate_table', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  const jateDB = await openDB('jate_DB',1)
  const putTx = jateDB.transaction('jate_table','readwrite')
  const jate_table = putTx.objectStore('jate_table')

  const table_update = jate_table.put({id:1, content})
  const result = await table_update
  console.log('Content updated in db: ', result)
};


export const getDb = async () => {
  const jateDB = await openDB('jate_DB',1)
  const getTx = jateDB.transaction('jate_table','readwrite')
  const jate_table = getTx.objectStore('jate_table')
  const request = jate_table.getAll()
  const result = await request
  console.log('Got table content: ', result)
  return result
};

initdb();