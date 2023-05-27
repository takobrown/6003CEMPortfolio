import * as db from '../helpers/database';

export const findByUsername = async (username: string) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  const user = await db.run_query(query, [username]);
  if (user.length) {
    return user[0];
  }
  return null;
};

export const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const users = await db.run_query(query, null);
  return users;
};

export const addUser = async (user: any) => {
  const keys = Object.keys(user);
  const values = Object.values(user);
  const columns = keys.join(',');
  const placeholders = values.map(() => '?').join(',');

  const query = `INSERT INTO users (${columns}) VALUES (${placeholders})`;
  try {
    await db.run_query(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
};

export const updateUser = async (username: string, user: any) => {
  const keys = Object.keys(user);
  const values = Object.values(user);
  const setStatement = keys.map((key) => `${key} = ?`).join(', ');

  const query = `UPDATE users SET ${setStatement} WHERE id = ?`;
  values.push(username);

  try {
    await db.run_query(query, values);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
};

export const deleteUser = async (username: string) => {
  const query = 'DELETE FROM users WHERE id = ?';
  try {
    await db.run_query(query, [username]);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
};
