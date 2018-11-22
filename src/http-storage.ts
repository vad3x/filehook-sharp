import url from 'url';
import { Stream } from 'stream';
import { get } from 'request';

import { IStorage } from './storage';

export class HttpStorage implements IStorage {
    constructor(private readonly rootUrl: string) {
    }

    exists(fileRelativePath: string): Promise<boolean> {
        const filePath = url.resolve(this.rootUrl, fileRelativePath);

        return new Promise((resolve, reject) => {
            get(filePath)
                .on('response', (response) => {
                    if (response.statusCode == 200) {
                        return resolve(true);
                    }

                    return resolve(false);
                })
                .on('error', (err) => {
                    console.log(err);

                    return reject();
                });
        });
    }

    getStream(fileRelativePath: string): Stream {
        const filePath = url.resolve(this.rootUrl, fileRelativePath);

        return get(filePath)
            .on('response', (response) => {
                if (response.statusCode == 404) {
                    return;
                }
            })
            .on('error', (err) => {
                console.log(err);
            });
    }
}