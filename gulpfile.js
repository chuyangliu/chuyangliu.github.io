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
  font: {
    src: 'src/font/**/*',
    dst: `${dirDist}/font/`,
  },

  styleDefault: {
    name: 'default.css',
    base: 'src/style/default',
    src: 'src/style/default/**/*.css',
    dst: `${dirDist}/style/`,
  },
  styleSnakeFight: {
    name: 'snakefight.css',
    base: 'src/style/snakefight',
    src: 'src/style/snakefight/**/*.css',
    dst: `${dirDist}/style/`,
  },

  scriptDefault: {
    name: "default.js",
    base: 'src/script/default',
    src: 'src/script/default/**/*.js',
    dst: `${dirDist}/script/`,
  },
  scriptSnakeFight: {
    name: "snakefight.js",
    base: 'src/script/snakefight',
    src: 'src/script/snakefight/**/*.js',
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

function font() {
  return gulp.src(path.font.src)
    .pipe(gulp.dest(path.font.dst))
    .pipe(gulpConnect.reload());
}

function styleDefault() {
  return gulp.src(path.styleDefault.src, {
      base: path.styleDefault.base,
    })
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.styleDefault.name))
    .pipe(gulpMinifyCSS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.styleDefault.dst))
    .pipe(gulpConnect.reload());
}

function styleSnakeFight() {
  return gulp.src(path.styleSnakeFight.src, {
      base: path.styleSnakeFight.base,
    })
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.styleSnakeFight.name))
    .pipe(gulpMinifyCSS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.styleSnakeFight.dst))
    .pipe(gulpConnect.reload());
}

const style = gulp.parallel(styleDefault, styleSnakeFight);

function scriptDefault() {
  return gulp.src(path.scriptDefault.src, {
      base: path.scriptDefault.name,
    })
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.scriptDefault.name))
    .pipe(gulpMinifyJS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.scriptDefault.dst))
    .pipe(gulpConnect.reload());
}

function scriptSnakeFight() {
  return gulp.src(path.scriptSnakeFight.src, {
      base: path.scriptSnakeFight.name,
    })
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.scriptSnakeFight.name))
    .pipe(gulpMinifyJS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.scriptSnakeFight.dst))
    .pipe(gulpConnect.reload());
}

const script = gulp.parallel(scriptDefault, scriptSnakeFight);

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
  gulp.watch(path.font.src, font);

  gulp.watch(path.styleDefault.src, styleDefault);
  gulp.watch(path.styleSnakeFight.src, styleSnakeFight);

  gulp.watch(path.scriptDefault.src, scriptDefault);
  gulp.watch(path.scriptSnakeFight.src, scriptSnakeFight);

  gulp.watch([path.markdown.src, path.pug.srcToWatch], page);

  done();
}

exports.build = gulp.series(clean, gulp.parallel(meta, media, font, style, script, page));
exports.server = gulp.series(exports.build, server);
