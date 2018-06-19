var gulp = require("gulp"), //http://gulpjs.com/
  util = require("gulp-util"), //https://github.com/gulpjs/gulp-util
  sass = require("gulp-sass"), //https://www.npmjs.org/package/gulp-sass
  autoprefixer = require('gulp-autoprefixer'), //https://www.npmjs.org/package/gulp-autoprefixer
  minifycss = require('gulp-minify-css'), //https://www.npmjs.org/package/gulp-minify-css
  rename = require('gulp-rename'), //https://www.npmjs.org/package/gulp-rename
  rigger = require('gulp-rigger'),
  watch = require('gulp-watch'),
  uglify = require('gulp-uglify'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload,
  log = util.log;

gulp.task("sass", function() {
  log("Generate CSS files " + (new Date()).toString());

  var colors = ['acapulco','brown','default','gray','nero'];

  for (var i in colors) {
    var color = colors[i];
    gulp.src('src/style/colors_' + color + '.scss')
      .pipe(sass({
        style: 'expanded'
      }))
      .pipe(autoprefixer("last 3 version", "safari 5", "ie 8", "ie 9", 'ios 6', 'android 4'))
      //.pipe(gulp.dest("public/css"))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(minifycss())
      .pipe(gulp.dest('public/css'));
  }

  gulp.src('src/style/style.scss')
    .pipe(sass({
      style: 'expanded'
    }))
    .pipe(autoprefixer("last 3 version", "safari 5", "ie 8", "ie 9", 'ios 6', 'android 4'))
    .pipe(gulp.dest("public/css"))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('html', function() {
  log("Generate HTML files " + (new Date()).toString());
  gulp.src('src/html/*.html')
    .pipe(rigger())
    .pipe(gulp.dest('public'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('js', function() {
  log("Generate JS files " + (new Date()).toString());
  gulp.src('src/js/*.js')
    .pipe(rigger())
    .pipe(gulp.dest('public/js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(reload({
      stream: true
    }));

  gulp.src('src/js/vendor/*.js')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/vendor'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('webserver', function() {
  log("Start webserver http://localhost:9000/ " + (new Date()).toString());
  browserSync({
    server: {
      baseDir: "public"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "garik.djan"
  });
});

gulp.task('watch', function() {
  log("Start watch " + (new Date()).toString());
  watch(['src/html/**/*.html'], function(event, cb) {
    gulp.start('html');
  });

  watch(['src/style/**/*.scss'], function(event, cb) {
    gulp.start('sass');
  });

  watch(['src/js/**/*.js'], function(event, cb) {
    gulp.start('js');
  });
});

gulp.task('build', ['html', 'sass', 'js']);
gulp.task('default', ['build', 'webserver', 'watch']);
