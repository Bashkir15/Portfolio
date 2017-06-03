import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import csswring from 'csswring';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import cssmin from 'gulp-cssmin';
import purify from 'gulp-purifycss'
import mqpcaker from 'css-mqpacker';
import { config } from '../config';
import handleErrors from '../utils/handleErrors';

export function processStyles(done) {
    return gulp.src(config.dev.sass)
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compact',
            precision: 10,
        }))
        .pipe(purify(['./public/**/*.ejs', './public/**/*.js']))
       // .pipe(autoprefixer({
        //    browsers: config.browsers,
        //}))
       // .pipe(mqpcaker())
      //  .pipe(csswring({
        //    preserveHacks: true,
         //   removeAllComments: true,
        //}))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.prod.styles))
        done();
}
