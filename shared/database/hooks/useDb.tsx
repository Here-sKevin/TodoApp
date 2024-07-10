/* eslint-disable prettier/prettier */
import {
  open,
  IOS_LIBRARY_PATH,
  ANDROID_DATABASE_PATH,
} from '@op-engineering/op-sqlite';
import { drizzle } from 'drizzle-orm/op-sqlite';

import { useMigrations } from 'drizzle-orm/op-sqlite/migrator';

import { Platform } from 'react-native';
import migrations from '../migration/migrations';
import { ENCRYPTION_KEY } from '../../constants/encryptions';
//import { todos } from '../schema';

const getDatabaseConnection = () => {
  try {
    const opsqlite = open({
      name: 'ap-db',
      location:
        Platform.OS === 'ios' ? IOS_LIBRARY_PATH : ANDROID_DATABASE_PATH,
      encryptionKey: ENCRYPTION_KEY,
    });
    return opsqlite;
  } catch (error) {
    throw new Error('Cannot open BD');
  }
};

export const db = drizzle(getDatabaseConnection());

/*const resetDatabase = async () => {
  await db.delete(todos);

  console.log('✅ Database clean');
};*/

export const useDb = () => {
  //resetDatabase()
  return useMigrations(db, migrations);
};
