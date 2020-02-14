import path from 'path';

import { Request, Response, NextFunction } from 'express';
import proccess, { Style } from './image-proccessor';
import { IStorage } from './storage';

export interface Options {
  styles: { [key: string]: Style; };
  storage: IStorage;
}

export function useFilehookStyles(options: Options) {
  return async function middleware(req: Request, res: Response, next: NextFunction) {
    // Extract the query-parameter
    const styleName = req.params.style;
    const blobKey = <string>req.params.blobKey;

    const style = options.styles[styleName];
    if (!style) {
      console.error(`Style: '${styleName}' is not declared`);

      res.sendStatus(404);
      return;
    }

    const relativePath = path.join(blobKey.substring(0, 2), blobKey.substring(2, 4), blobKey);

    if (!await options.storage.exists(relativePath)) {
      console.error(`File: '${relativePath}' is not found`);

      res.sendStatus(404);
      return;
    }

    const stream = await options.storage.getStream(relativePath);

    // Get the resized image
    proccess(stream, style).pipe(res);
  };
}
