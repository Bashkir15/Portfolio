export const config = {
    dev: {
        images: './public/static/images/*',
        sass: './public/static/sass/main.sass',
        sassModules: './public/static/sass/**/*.sass',
    },

    prod: {
        images: './dist/images',
        styles: './dist/styles',
    },

    browsers: [
        'last 2 version',
        'safari 5',
        'ie 9',
        'opera 12.1',
        'ios 6',
        'android 4',
    ],
};
