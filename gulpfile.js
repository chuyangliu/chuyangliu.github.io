const del = require('del');

const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpRename = require('gulp-rename');
const gulpMinifyCSS = require('gulp-clean-css');
const gulpMinifyJS = require('gulp-uglify-es').default;
const gulpMinifyHTML = require('gulp-htmlmin');
const gulpMarkdown = require('gulp-markdown');
const gulpPug = require('gulp-pug');
const gulpConnect = require('gulp-connect');

const dirOut = 'out';
const dirDist = `${dirOut}/dist`;

const path = {
  meta: {
    src: 'src/meta/**/*',
    dst: `${dirDist}/`,
  },
  media: {
    src: 'src/media/**/*',
    dst: `${dirDist}/media/`,
  },
  style: {
    src: 'src/style/**/*.css',
    dst: `${dirDist}/style/`,
  },
  script: {
    src: 'src/script/**/*.js',
    dst: `${dirDist}/script/`,
  },
  markdown: {
    src: 'src/page/**/*.md',
    dst: `${dirOut}/markdown/`,
  },
  pug: {
    srcToWatch: 'src/page/**/*.pug',
    src: ['src/page/**/*.pug', '!src/page/template/**/*.pug'],
    dst: `${dirDist}/`,
  },
};

function meta() {
  return gulp.src(path.meta.src)
    .pipe(gulp.dest(path.meta.dst))
    .pipe(gulpConnect.reload());
}

function media() {
  return gulp.src(path.media.src)
    .pipe(gulp.dest(path.media.dst))
    .pipe(gulpConnect.reload());
}

function style() {
  return gulp.src(path.style.src)
    .pipe(gulpConcat('default.css'))
    .pipe(gulpMinifyCSS({
      compatibility: 'ie8',
    }))
    .pipe(gulp.dest(path.style.dst))
    .pipe(gulpConnect.reload());
}

function script() {
  return gulp.src(path.script.src)
    .pipe(gulpConcat('default.js'))
    .pipe(gulpMinifyJS())
    .pipe(gulp.dest(path.script.dst))
    .pipe(gulpConnect.reload());
}

function markdown() {
  return gulp.src(path.markdown.src)
    .pipe(gulpMarkdown())
    .pipe(gulpRename((file) => {
      file.extname = '.html';
    }))
    .pipe(gulp.dest(path.markdown.dst));
}

function pug() {
  return gulp.src(path.pug.src)
    .pipe(gulpPug({
      basedir: dirOut,
    }))
    .pipe(gulpMinifyHTML({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest(path.pug.dst))
    .pipe(gulpConnect.reload());
}

const page = gulp.series(markdown, pug);

function clean() {
  return del([dirOut]);
}

function server(done) {
  gulpConnect.server({
    root: dirDist,
    port: 8000,
    livereload: true,
  });
  gulp.watch(path.meta.src, meta);
  gulp.watch(path.media.src, media);
  gulp.watch(path.style.src, style);
  gulp.watch(path.script.src, script);
  gulp.watch([path.markdown.src, path.pug.srcToWatch], page);
  done();
}

exports.clean = clean;
exports.build = gulp.series(clean, gulp.parallel(meta, media, style, script, page));
exports.server = gulp.series(exports.build, server);
