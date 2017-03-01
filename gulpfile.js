var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var crisper = require('gulp-crisper');
var polyclean = require('polyclean');
var removeHtmlComments = require('gulp-remove-html-comments');
var htmlmin = require('gulp-htmlmin');
var minifyInline = require('gulp-minify-inline');

gulp.task('copy', function() {
    return gulp.src([
        'app/index.html',
        'app/bower_components/webcomponentsjs/webcomponents-lite.js'
    ], {
        base: 'app'
    })
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
    return gulp.src('app/elements/elements.html')
        .pipe(vulcanize({
            stripComments: true,
            inlineScripts: true,
            inliceCss: true
        }))
        .pipe(removeHtmlComments())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(polyclean.leftAlignJs())
        .pipe(polyclean.uglifyJs())
        .pipe(crisper())
        .pipe(minifyInline())
        .pipe(gulp.dest('dist/elements'));
});

gulp.task('default', ['copy', 'build']);
