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
  markdown: {
    src: 'src/page/**/*.md',
    dst: `${dirOut}/markdown/`,
  },
  pug: {
    src: ['src/page/**/*.pug', '!src/page/template/**/*.pug'],
    dst: `${dirDist}/`,
  },
  styleCommon: {
    src: 'src/style/common.css',
    dst: `${dirDist}/style/`,
    target: 'common.css',
  },
  styleIndex: {
    src: ['src/style/common.css', 'src/style/index.css'],
    dst: `${dirDist}/style/`,
    target: 'index.css',
  },
  scriptCommon: {
    src: 'src/script/common.js',
    dst: `${dirDist}/script/`,
    target: 'common.js',
  },
  scriptIndex: {
    src: ['src/script/common.js', 'src/script/index.js'],
    dst: `${dirDist}/script/`,
    target: 'index.js',
  },
};

function clean() {
  return del([dirOut]);
}

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

function styleCommon() {
  return gulp.src(path.styleCommon.src)
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.styleCommon.target))
    .pipe(gulpMinifyCSS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.styleCommon.dst))
    .pipe(gulpConnect.reload());
}

function styleIndex() {
  return gulp.src(path.styleIndex.src)
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.styleIndex.target))
    .pipe(gulpMinifyCSS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.styleIndex.dst))
    .pipe(gulpConnect.reload());
}

const style = gulp.parallel(styleCommon, styleIndex);

function scriptCommon() {
  return gulp.src(path.scriptCommon.src)
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.scriptCommon.target))
    .pipe(gulpMinifyJS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.scriptCommon.dst))
    .pipe(gulpConnect.reload());
}

function scriptIndex() {
  return gulp.src(path.scriptIndex.src)
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.scriptIndex.target))
    .pipe(gulpMinifyJS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.scriptIndex.dst))
    .pipe(gulpConnect.reload());
}

const script = gulp.parallel(scriptCommon, scriptIndex);

function server(done) {
  gulpConnect.server({
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
