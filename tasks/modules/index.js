import gulp from 'gulp';
import { processStyles } from './styles';

const stylesTask = gulp.task('styles');
gulp.task('styles', processStyles);

