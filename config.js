// General
export const generalPath = {
  source: './src',
  bundle: './dist',
};

// Paths
export const paths = {
  pug: {
    input: generalPath.source + '/*.pug',
    output: generalPath.bundle + '/',
    watch: generalPath.source + '/**/*.pug',
  },
  js: {
    input: generalPath.source + '/assets/js/index.js',
    output: generalPath.bundle + '/assets/js/',
    name: { basename: 'bundle', extname: '.min.js' },
    watch: generalPath.source + '/**/*.js',
  },
  css: {
    input: generalPath.source + '/assets/css/index.scss',
    output: generalPath.bundle + '/assets/css/',
    name: { basename: 'bundle', extname: '.min.css' },
    watch: generalPath.source + '/**/*.scss',
  },
  font: {
    input: generalPath.source + '/assets/font/*.ttf',
    output: generalPath.bundle + '/assets/font/',
    watch: generalPath.source + '/assets/font/*.ttf',
  },
  img: {
    input: generalPath.source + '/assets/img/**/*',
    output: generalPath.bundle + '/assets/img/',
    watch: generalPath.source + '/assets/img/**/*',
  },
  mov: {
    input: generalPath.source + '/assets/mov/**/*',
    output: generalPath.bundle + '/assets/mov/',
    watch: generalPath.source + '/assets/mov/**/*',
  },
  doc: {
    input: generalPath.source + '/assets/doc/**/*',
    output: generalPath.bundle + '/assets/doc/',
    watch: generalPath.source + '/assets/doc/**/*',
  },
};

// Libraries
export const libs = {
  css: {
    paths: generalPath.source + '/assets/libs/**/*.css',
    output: generalPath.bundle + '/assets/css',
    name: { basename: 'libs', extname: '.min.css' },
    watch: generalPath.source + '/assets/libs/**/*.css',
  },
  js: {
    paths: generalPath.source + '/assets/libs/**/*.js',
    output: generalPath.bundle + '/assets/js',
    name: { basename: 'libs', extname: '.min.js' },
    watch: generalPath.source + '/assets/libs/**/*.js',
  },
};
