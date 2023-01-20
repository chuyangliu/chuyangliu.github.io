const cfg = require('minimist')(process.argv.slice(2));
const del = require('del');
const connect = require('gulp-connect');

const gulp = require('gulp');
const gulpif = require('gulp-if');

const htmlmin = require('gulp-htmlmin');
const markdown = require('gulp-markdown');
const pug = require('gulp-pug');

const cssmin = require('gulp-clean-css');
const concat = require('gulp-concat');

const jsmin = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const vinylsource = require('vinyl-source-stream');
const vinylbuffer = require('vinyl-buffer');

const dirOut = './out';
const dirDist = `${dirOut}/dist`;

const path = {
  meta: {
    src: './src/meta/**/*',
    dst: `./${dirDist}/`,
  },
  media: {
    src: './src/media/**/*',
    dst: `./${dirDist}/media/`,
  },
  pageMarkdown: {
    src: './src/page/**/*.md',
    dst: `./${dirOut}/markdown/`,
  },
  pagePug: {
    src: ['./src/page/**/*.pug', '!./src/page/template/**/*.pug'],
    dst: `./${dirDist}/`,
  },
  styleDefault: {
    src: './src/style/default.css',
    dst: `./${dirDist}/style/`,
    target: './default.css',
  },
  styleIndex: {
    src: ['./src/style/default.css', './src/style/index.css'],
    dst: `./${dirDist}/style/`,
    target: './index.css',
  },
  scriptDefault: {
    src: './src/script/default.js',
    dst: `./${dirDist}/script/`,
    target: './default.js',
  },
  scriptIndex: {
    src: './src/script/index.js',
    dst: `./${dirDist}/script/`,
    target: './index.js',
  },
};

function clean() {
  return del([dirOut]);
}

function meta() {
  return gulp.src(path.meta.src)
    .pipe(gulp.dest(path.meta.dst))
    .pipe(connect.reload());
}

function media() {
  return gulp.src(path.media.src)
    .pipe(gulp.dest(path.media.dst))
    .pipe(connect.reload());
}

function pageMarkdown() {
  return gulp.src(path.pageMarkdown.src)
    .pipe(markdown())
    .pipe(gulp.dest(path.pageMarkdown.dst));
}

function pagePug() {
  return gulp.src(path.pagePug.src)
    .pipe(pug({
      basedir: dirOut,
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest(path.pagePug.dst))
    .pipe(connect.reload());
}

const page = gulp.series(pageMarkdown, pagePug);

function styleDefault() {
  return gulp.src(path.styleDefault.src)
    .pipe(concat(path.styleDefault.target))
    .pipe(cssmin())
    .pipe(gulp.dest(path.styleDefault.dst))
    .pipe(connect.reload());
}

function styleIndex() {
  return gulp.src(path.styleIndex.src)
    .pipe(concat(path.styleIndex.target))
    .pipe(cssmin())
    .pipe(gulp.dest(path.styleIndex.dst))
    .pipe(connect.reload());
}

const style = gulp.parallel(styleDefault, styleIndex);

function scriptDefault() {
  return browserify({
    entries: path.scriptDefault.src,
    debug: true,
  }).bundle()
    .pipe(vinylsource(path.scriptDefault.target))
    .pipe(vinylbuffer())
    .pipe(gulpif(cfg.dev, sourcemaps.init({ loadMaps: true })))
    .pipe(jsmin({
      compress: {
        drop_console: !cfg.dev,
      },
    }))
    .pipe(gulpif(cfg.dev, sourcemaps.write()))
    .pipe(gulp.dest(path.scriptDefault.dst))
    .pipe(connect.reload());
}

function scriptIndex() {
  return browserify({
    entries: path.scriptIndex.src,
    debug: true,
  }).bundle()
    .pipe(vinylsource(path.scriptIndex.target))
    .pipe(vinylbuffer())
    .pipe(gulpif(cfg.dev, sourcemaps.init({ loadMaps: true })))
    .pipe(jsmin({
      compress: {
        drop_console: !cfg.dev,
      },
    }))
    .pipe(gulpif(cfg.dev, sourcemaps.write()))
    .pipe(gulp.dest(path.scriptIndex.dst))
    .pipe(connect.reload());
}

const script = gulp.parallel(scriptDefault, scriptIndex);

function server(done) {
  connect.server({
    root: dirDist,
    port: 8000,
    livereload: true,
  });

  gulp.watch('./src/meta/**/*', meta);
  gulp.watch('./src/media/**/*', media);
  gulp.watch('./src/page/**/*', page);
  gulp.watch('./src/style/**/*', style);
  gulp.watch('./src/script/**/*', script);

  done();
}

exports.build = gulp.series(clean, gulp.parallel(meta, media, page, style, script));
exports.server = gulp.series(exports.build, server);
