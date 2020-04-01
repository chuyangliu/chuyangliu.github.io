const cfg = require('minimist')(process.argv.slice(2));
const del = require('del');
const connect = require('gulp-connect');

const gulp = require('gulp');
const gulpif = require('gulp-if');

const htmlmin = require('gulp-htmlmin');
const markdown = require('gulp-markdown');
const pug = require('gulp-pug');

const cssmin = require('gulp-clean-css');
const cssimport = require('gulp-cssimport');

const jsmin = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const vinylsource = require('vinyl-source-stream');
const vinylbuffer = require('vinyl-buffer');

const dirOut = 'out';
const dirDist = `${dirOut}/dist`;

const paths = {
  meta: {
    src: 'src/meta/**/*',
    dst: `${dirDist}/`,
  },
  media: {
    src: 'src/media/**/*',
    dst: `${dirDist}/media/`,
  },
  page: {
    markdown: {
      src: 'src/page/**/*.md',
      dst: `${dirOut}/markdown/`,
    },
    pug: {
      src: ['src/page/**/*.pug', '!src/page/template/**/*.pug'],
      dst: `${dirDist}/`,
    },
  },
  style: {
    default: {
      src: 'src/style/default.css',
      dst: `${dirDist}/style/`,
    },
    index: {
      src: 'src/style/index.css',
      dst: `${dirDist}/style/`,
    },
  },
  script: {
    default: {
      src: 'src/script/default.js',
      dst: `${dirDist}/script/`,
      target: 'default.js',
    },
    index: {
      src: 'src/script/index.js',
      dst: `${dirDist}/script/`,
      target: 'index.js',
    },
  },
};

function clean() {
  return del([dirOut]);
}

function meta() {
  return gulp.src(paths.meta.src)
    .pipe(gulp.dest(paths.meta.dst))
    .pipe(connect.reload());
}

function media() {
  return gulp.src(paths.media.src)
    .pipe(gulp.dest(paths.media.dst))
    .pipe(connect.reload());
}

function pageMarkdown() {
  return gulp.src(paths.page.markdown.src)
    .pipe(markdown())
    .pipe(gulp.dest(paths.page.markdown.dst));
}

function pagePug() {
  return gulp.src(paths.page.pug.src)
    .pipe(pug({
      basedir: dirOut,
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest(paths.page.pug.dst))
    .pipe(connect.reload());
}

const page = gulp.series(pageMarkdown, pagePug);

function styleStream(path) {
  return gulp.src(path.src)
    .pipe(cssimport())
    .pipe(cssmin())
    .pipe(gulp.dest(path.dst))
    .pipe(connect.reload());
}

function styleDefault() {
  return styleStream(paths.style.default);
}

function styleIndex() {
  return styleStream(paths.style.index);
}

const style = gulp.parallel(styleDefault, styleIndex);

function scriptStream(path) {
  return browserify({
    entries: path.src,
    debug: true,
  }).bundle()
    .pipe(vinylsource(path.target))
    .pipe(vinylbuffer())
    .pipe(gulpif(cfg.dev, sourcemaps.init({ loadMaps: true })))
    .pipe(jsmin({
      compress: {
        drop_console: !cfg.dev,
      },
    }))
    .pipe(gulpif(cfg.dev, sourcemaps.write()))
    .pipe(gulp.dest(path.dst))
    .pipe(connect.reload());
}

function scriptDefault() {
  return scriptStream(paths.script.default);
}

function scriptIndex() {
  return scriptStream(paths.script.index);
}

const script = gulp.parallel(scriptDefault, scriptIndex);

function server(done) {
  connect.server({
    root: dirDist,
    port: 8000,
    livereload: true,
  });

  gulp.watch('src/meta/**/*', meta);
  gulp.watch('src/media/**/*', media);
  gulp.watch('src/page/**/*', page);
  gulp.watch('src/style/**/*', style);
  gulp.watch('src/script/**/*', script);

  done();
}

exports.build = gulp.series(clean, gulp.parallel(meta, media, page, style, script));
exports.server = gulp.series(exports.build, server);
