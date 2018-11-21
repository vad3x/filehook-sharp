import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

import { Request, Response, NextFunction, IRouterMatcher } from 'express';
import proccess, { Style } from './image-proccessor';

export interface Options {
    styles: { [key: string]: Style; };
    rootPath: string;
}

export function useFilehookStyles(options: Options) {
    return async function middleware(req: Request, res: Response, next: NextFunction) {
        // Extract the query-parameter
        const styleName = req.params.style;
        const fileName = req.params.filename;

        const style = options.styles[styleName];
        if (!style) {
            console.error(`Style: '${styleName}' is not declared`);

            res.sendStatus(404);
            return;
        }

        const filePath = path.join(options.rootPath, fileName);

        const existsAsync = promisify(fs.exists);

        if (!await existsAsync(filePath)) {
            console.error(`File: '${filePath}' is not found`);

            res.sendStatus(404);
            return;
        }

        // Get the resized image
        proccess(filePath, style).pipe(res);

        // Set the content-type of the response
        // res.type(`image/${style.format || 'jpg'}`);
    };
}