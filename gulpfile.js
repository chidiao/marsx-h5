import gulp from 'gulp'
import less from 'gulp-less'
import postcss from 'gulp-postcss'

const handleStyle = () => {
  return gulp.src('src/style/style.less').pipe(less()).pipe(postcss()).pipe(gulp.dest('src/css'))
}

export const watch = () => {
  gulp.watch('src/style/**/*.less', handleStyle)
}

export const build = () => {
  return handleStyle()
}
