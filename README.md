# Filehook Sharp
A Node.js express middleware for filehook library.

## Installation

```sh
npm install filehook-sharp --save
```

## Usage

```javascript
import { useFilehookStyles, Options } from './filehook-sharp';

...

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
    rootPath: '../../blobs'
};

...

const server = express();
server.get('/filehook/:style/:filename', useFilehookStyles(options));

```