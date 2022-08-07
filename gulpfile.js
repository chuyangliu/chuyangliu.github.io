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
    srcWatch: 'src/page/**/*.pug',
  },
  styleBase: {
    src: 'src/style/base.css',
    dst: `${dirDist}/style/`,
    target: 'base.css',
  },
  styleIndex: {
    src: ['src/style/base.css', 'src/style/index.css'],
    dst: `${dirDist}/style/`,
    target: 'index.css',
  },
  stylePost: {
    src: ['src/style/base.css', 'src/style/post.css'],
    dst: `${dirDist}/style/`,
    target: 'post.css',
  },
  scriptBase: {
    src: 'src/script/base.js',
    dst: `${dirDist}/script/`,
    target: 'base.js',
  },
  scriptIndex: {
    src: ['src/script/base.js', 'src/script/index.js'],
    dst: `${dirDist}/script/`,
    target: 'index.js',
  },
  scriptPost: {
    src: ['src/script/base.js', 'src/script/post.js'],
    dst: `${dirDist}/script/`,
    target: 'post.js',
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

function styleBase() {
  return gulp.src(path.styleBase.src)
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.styleBase.target))
    .pipe(gulpMinifyCSS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.styleBase.dst))
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

function stylePost() {
  return gulp.src(path.stylePost.src)
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.stylePost.target))
    .pipe(gulpMinifyCSS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.stylePost.dst))
    .pipe(gulpConnect.reload());
}

const style = gulp.parallel(styleBase, styleIndex, stylePost);

function scriptBase() {
  return gulp.src(path.scriptBase.src)
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.scriptBase.target))
    .pipe(gulpMinifyJS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.scriptBase.dst))
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

function scriptPost() {
  return gulp.src(path.scriptPost.src)
    .pipe(gulpIf(cfg.dev, gulpSourceMap.init()))
    .pipe(gulpConcat(path.scriptPost.target))
    .pipe(gulpMinifyJS())
    .pipe(gulpIf(cfg.dev, gulpSourceMap.write()))
    .pipe(gulp.dest(path.scriptPost.dst))
    .pipe(gulpConnect.reload());
}

const script = gulp.parallel(scriptBase, scriptIndex, scriptPost);

function server(done) {
  gulpConnect.server({
    root: dirDist,
    port: 8000,
    livereload: true,
  });

  gulp.watch(path.meta.src, meta);
  gulp.watch(path.media.src, media);
  gulp.watch([path.markdown.src, path.pug.srcWatch], page);
  gulp.watch(path.styleBase.src, styleBase);
  gulp.watch(path.styleIndex.src, styleIndex);
  gulp.watch(path.stylePost.src, stylePost);
  gulp.watch(path.scriptBase.src, scriptBase);
  gulp.watch(path.scriptIndex.src, scriptIndex);
  gulp.watch(path.scriptPost.src, scriptPost);

  done();
}

exports.build = gulp.series(clean, gulp.parallel(meta, media, page, style, script));
exports.server = gulp.series(exports.build, server);
