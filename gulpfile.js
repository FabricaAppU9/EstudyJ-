var gulp = require('gulp')
	,sass = require('gulp-sass')
	,watch = require('gulp-watch')
	,clean = require('gulp-clean')
	,browserSync = require('browser-sync').create();

// task para o sass
gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

// task para watch
gulp.task('watch', function(){
	gulp.watch('./sass/**/*.scss', ['sass']);
});

// task default gulp
gulp.task('default', ['watch', 'sass', 'copy']);

// Tarefa para copiar Gulp
gulp.task('copy', ['clean', 'sass', 'server'], function(){
    gulp.src('source/**/*')
    .pipe(gulp.dest('deploy'));
});

//
gulp.task('clean', function(){
	return gulp.src('dist')
	.pipe(clean());
});

//
gulp.task('server', function(){
	browserSync.init({
		server: {
			baseDir: ''
		}
	});

	return gulp.watch('source/**/*').on('change', browserSync.reload);

});



