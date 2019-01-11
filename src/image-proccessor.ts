import { Stream } from 'stream';

import sharp, { Sharp, FitEnum, OutputOptions, JpegOptions, PngOptions, WebpOptions, TiffOptions } from 'sharp';

export interface Style {
    width?: number;
    height?: number;
    fit?: keyof FitEnum;
    format?: string;
    transform?: (transformer: Sharp, width: number, height: number, format?: string) => Sharp;
    formatOptions?: OutputOptions | JpegOptions | PngOptions | WebpOptions | TiffOptions;
}

export default function proccess(readStream: Stream, style: Style) {
    let sharpTransformer = sharp();

    if (style.width || style.height) {
        sharpTransformer = sharpTransformer.resize(undefined, undefined, {
            width: style.width,
            height: style.height,
            fit: 'outside'
        });
    }

    if (style.format) {
        sharpTransformer = sharpTransformer.toFormat(style.format, style.formatOptions);
    }

    if (style.transform) {
        style.transform(sharpTransformer, style.width, style.height, style.format);
    }

    return readStream.pipe(sharpTransformer);
}