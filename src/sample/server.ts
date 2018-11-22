import express from 'express';
import { middleware as cache } from 'apicache';

import { useFilehookStyles, Options, LocalStorage, HttpStorage } from '../index';

import { Sharp } from 'sharp';

const server = express();

const options: Options = {
    styles: {
        xsmall: {
            width: 300
        },

        small: {
            width: 768
        },

        medium: {
            width: 1024,
            height: 768
        },

        'medium-blurred': {
            width: 1024,
            transform: (transformer: Sharp) => { return transformer.blur(10); }
        },
    },

    // storage: new HttpStorage('https://pp.userapi.com')
    storage: new LocalStorage('../filehook/sample/Filehook.Samples.AspNetCoreMvc/wwwroot/public/storage')
};

server.get('/filehook/:style/:blobKey', cache('1 hour'), useFilehookStyles(options));

server.listen(process.env.NODE_ENV, () => {
    console.log(`Filehook proccessor started on port: '${process.env.NODE_ENV}'`);
});