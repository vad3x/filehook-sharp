import path from 'path';
import { Stream } from 'stream';
import fs, { createReadStream } from 'fs';
import { promisify } from 'util';

import { IStorage } from './storage';

export class LocalStorage implements IStorage {
  constructor(private readonly rootPath: string) {
  }

  exists(fileRelativePath: string): Promise<boolean> {
    const filePath = path.join(this.rootPath, fileRelativePath);

    return promisify(fs.exists)(filePath);
  }

  getStream(fileRelativePath: string): Stream {
    const filePath = path.join(this.rootPath, fileRelativePath);

    return createReadStream(filePath);
  }
}
