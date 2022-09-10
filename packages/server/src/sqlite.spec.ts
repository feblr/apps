jest.mock('sqlite3', () => {
  return {
    Database: () => {},
  };
});

jest.mock('sqlite', () => {
  return {
    open: () => {},
  };
});

import { Test, TestingModule } from '@nestjs/testing';
import * as sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';
import { SQLITE_PROVIDER, Sqlite } from './sqlite';

describe('Sqlite', () => {
  let provider;
  beforeEach(async () => {
    // @ts-ignore
    sqlite.open = jest.fn((params) => {
      return params;
    });
    // @ts-ignore
    sqlite3.Database = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [SQLITE_PROVIDER],
    }).compile();

    provider = module.get<Sqlite>(SQLITE_PROVIDER.provide);
  });

  it('should be defined', () => {
    expect(sqlite.open).toBeCalledWith({
      filename: './feblr.db',
      driver: sqlite3.Database,
    });
    expect(provider).toBeDefined();
  });
});
