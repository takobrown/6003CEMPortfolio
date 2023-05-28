import * as db from '../helpers/database';

export const getById = async (id: any) => {
  const query = 'SELECT * FROM cats WHERE ID = ?';
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

export const getAll = async () => {
  const query = 'SELECT * FROM cats';
  const data = await db.run_query(query, null);
  return data;
}

export const add = async (cats: any) => {
  const keys = Object.keys(cats);
  const values = Object.values(cats);
  const key = keys.join(',');
  let param = '';
  for (let i = 0; i < values.length; i++) {
    param += '? , ';
  }
  param = param.slice(0, -2);
  const query = `INSERT INTO cats (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}


export const update = async (id: any, cats: any) => {
  const keys = Object.keys(cats);
  const values = Object.values(cats);
  let setStatement = '';
  for (let i = 0; i < keys.length; i++) {
    setStatement += `${keys[i]} = ?, `;
  }
  setStatement = setStatement.slice(0, -2); // remove the last comma and space
  const query = `UPDATE cats SET ${setStatement} WHERE id = ?`;
  values.push(id); 
  try {
    await db.run_update(query, values);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
}

export const deleteCats = async (id: any) => {
  const query = `DELETE FROM cats WHERE id = ?`;
  try {
    await db.run_delete(query, [id]);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
}