import * as sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { isDebug } from './config';

if (isDebug) {
  sqlite3.verbose();
}

export type Sqlite = Database<sqlite3.Database, sqlite3.Statement>;

export const SQLITE_PROVIDER = {
  provide: 'SQLITE_PROVIDER',
  useFactory: async () => {
    const db = await open({
      filename: './feblr.db',
      driver: sqlite3.Database,
    });
    return db;
  },
};
