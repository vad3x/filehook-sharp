import { Stream } from 'stream';

export interface IStorage {
  exists(fileRelativePath: string): Promise<boolean>;
  getStream(fileRelativePath: string): Stream;
}
