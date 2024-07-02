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

const getDatabaseConnection = () => {
  try {
    const opsqlite = open({
      name: 'home-inventory',
      location:
        Platform.OS === 'ios' ? IOS_LIBRARY_PATH : ANDROID_DATABASE_PATH,
      encryptionKey: ENCRYPTION_KEY,
    });
    return opsqlite;
  } catch (error) {
    console.log('error', error);
    throw new Error('Cannot open BD');
  }
};

export const db = drizzle(getDatabaseConnection());

/*const resetDatabase = async () => {
  await db.delete(receipts);
  await db.delete(lowStockAlerts);
  await db.delete(shoppingListItems);
  await db.delete(shoppingLists);
  await db.delete(inventoryItems);
  await db.delete(users);

  console.log('✅ Database clean');
};*/

export const useDb = () => {
  // resetDatabase()
  return useMigrations(db, migrations);
};
