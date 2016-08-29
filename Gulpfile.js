var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var mincss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

const config = {
	dev: {
		mainSass: './public/static/stylesheets/sass/main.sass',
		sass: './public/static/stylesheets/sass/**/*.sass',
		sass2: './public/static/stylesheets/sass/**/**/*.sass'
	},

	prod: {
		css: './dist'
	}
};

gulp.task('sass', function() {
	gulp.src(config.dev.mainSass)
	.pipe(plumber())
	.pipe(sass({styles: 'expanded'}))
	.pipe(mincss())
	.pipe(rename(function (path) {
		path.extname = '.min.css'
	}))
	.pipe(gulp.dest(config.prod.css))
});

gulp.task('watch', function() {
	gulp.watch([config.dev.mainSass, config.dev.sass, config.dev.sass2], ['sass']);
});

