import gulp from 'gulp'
import less from 'gulp-less'
import postcss from 'gulp-postcss'
import browserSync from 'browser-sync'

const bs = browserSync.create()

const handleStyle = () => {
  return gulp.src('src/style/style.less').pipe(less()).pipe(postcss()).pipe(gulp.dest('src/css')).pipe(bs.stream())
}

export const watch = () => {
  gulp.watch('src/style/**/*.less', handleStyle)
}

export const build = () => {
  return handleStyle()
}
