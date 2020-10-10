const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gulpConcat = require('gulp-concat');
const gulpRename = require('gulp-rename');
const gulpSourceMap = require('gulp-sourcemaps');
const gulpMinifyCSS = require('gulp-clean-css');
const gulpMinifyJS = require('gulp-terser');
const gulpMinifyHTML = require('gulp-htmlmin');
const gulpMarkdown = require('gulp-markdown');
const gulpPug = require('gulp-pug');
const gulpConnect = require('gulp-connect');

const del = require('del');
const cfg = require('minimist')(process.argv.slice(2));

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
  styleDefault: {
    src: 'src/style/default/**/*.css',
    dst: `${dirDist}/style/`,
    target: 'default.css',
  },
  scriptDefault: {
    src: 'src/script/default/**/*.js',
    dst: `${dirDist}/script/`,
    target: 'default.js',
  },
  markdown: {
    src: 'src/page/**/*.md',
    dst: `${dirOut}/markdown/`,
  },
  pug: {
    src: ['src/page/**/*.pug', '!src/page/template/**/*.pug'],
    dst: `${dirDist}/`,
    srcWatch: 'src/page/**/*.pug',
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

function styleDefault() {
  return gulp.src(path.styleDefault.src)
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.styleDefault.target))
    .pipe(gulpMinifyCSS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.styleDefault.dst))
    .pipe(gulpConnect.reload());
}

const style = styleDefault;

function scriptDefault() {
  return gulp.src(path.scriptDefault.src)
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.scriptDefault.target))
    .pipe(gulpMinifyJS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.scriptDefault.dst))
    .pipe(gulpConnect.reload());
}

const script = scriptDefault;

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
  gulp.watch(path.styleDefault.src, styleDefault);
  gulp.watch(path.scriptDefault.src, scriptDefault);
  gulp.watch([path.markdown.src, path.pug.srcWatch], page);

  done();
}

exports.build = gulp.series(clean, gulp.parallel(meta, media, style, script, page));
exports.server = gulp.series(exports.build, server);
