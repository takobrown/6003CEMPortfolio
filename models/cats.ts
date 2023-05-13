import * as db from '../helpers/database';

export const getById = async (id: any) => {
  let query = 'SELECT * FROM cats WHERE ID = ?';
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
}

export const getAll = async() => {
  let query = 'SELECT * FROM cats';
  let data = await db.run_query(query, null);
  return data;
}

export const add = async(cats: any) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  let key = keys.join(',');
  let param = '';
  for (let i: number = 0; i < values.length; i++) {
    
  }
}
