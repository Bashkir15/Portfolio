import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import sassdoc from 'sassdoc';
import babel from 'gulp-babel';
import notify from 'gulp-notify';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import concat from 'gulp-concat';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import uglifyJs from 'gulp-uglify';
import uglifyCss from 'gulp-uglifycss';
import browserify from 'browserify';
import babelify from 'babelify';


var config = {
	dev: {
		entry: './public/index.ejs',
		css: './public/static/stylesheets/css',
		mainCss: './public/static/stylesheets/css/main.css',
		mainSass: './public/static/stylesheets/sass/main.sass',
		sass: './public/static/stylesheets/sass/**/*.sass',
		js: './public/static/scripts/**/*.js',
		mainJs: './public/static/scripts/main.js',
		images: './public/static/images'
	},

	prod: {
		css: './dist/stylesheets',
		js: './dist/scripts',
		images: './dist/images'
	},

	autoprefixerOptions: {
		browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
	},

	sassOptions: {
		errLogToConsole: true,
		outputStyle: 'expanded'
	},

	sassdocOptions: {
		dest: './public/static/stylesheets/sassDocs'
	}
};

function notifyLiveReload (event) {
	var fileName = path.relative(__dirname, event.path);
	tiny.changed({
		body: {
			files: [fileName]
		}
	});
}

gulp.task('sass', () => {
	gulp.src(config.dev.mainSass)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass(config.sassOptions).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer(config.autoprefixerOptions))
		.pipe(sassdoc(config.sassdocOptions))
		.pipe(gulp.dest(config.dev.css))
		.pipe(notify('Sass compiled to CSS'))
	}
);

gulp.task('minifyCss', () => {
	gulp.src(config.dev.mainCss)
		.pipe(plumber())
		.pipe(uglifyCss())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest(config.prod.css))
		.pipe(notify('CSS uglified!'))
	}
);

gulp.task('minifyJs', () => {
	gulp.src(config.dev.js)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('main.js'))
		.pipe(uglifyJs())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.prod.js))
		.pipe(notify('JS transpiled, concated, and uglified!'))
	}
);

gulp.task('images', () => {
	gulp.src(config.dev.images)
		.pipe(plumber())
		.pipe(cache(imagemin({
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest(config.prod.images))
		.pipe(notify('Images Compressed!'))
	}
);


gulp.task('watch', () => {
	gulp.watch(config.dev.sass, ['sass']);
	}
);

gulp.task('default', ['sass', 'watch']);



