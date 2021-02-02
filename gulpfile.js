let gulp = require("gulp"),
  gutil = require("gulp-util"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  cleanCSS = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  del = require("del"),
  image = require("gulp-image"),
  svgo = require("gulp-svgo"),
  svgmin = require("gulp-svgmin"),
  cache = require("gulp-cache"),
  autoprefixer = require("gulp-autoprefixer"),
  ftp = require("vinyl-ftp"),
  notify = require("gulp-notify"),
  rsync = require("gulp-rsync"),
  groupmq = require("gulp-group-css-media-queries"),
  csscomb = require("gulp-csscomb"),
  nunjucksRender = require("gulp-nunjucks-render"),
  data = require("gulp-data"),
  connect = require("gulp-connect"),
  svgSprite = require("gulp-svg-sprite");

gulp.task("connect", function() {
  connect.server({
    root: "app",
    livereload: true
  });
});

const globalDataRu = {
  main: require("./app/templates/ru/partials/data/globalData.json")
};

const globalDataUa = {
  main: require("./app/templates/ua/partials/data/globalData.json")
};

gulp.task("nunjucksRu", function() {
  return gulp
    .src("./app/templates/ru/*.nunjucks")

    .pipe(
      data(function() {
        return globalDataRu;
      }).on("error", notify.onError())
    )

    .pipe(
      nunjucksRender({
        path: ["./app/templates/ru/partials/"]
      }).on("error", notify.onError())
    )
    .pipe(gulp.dest("./app/"));
});

gulp.task("nunjucksUa", function() {
  return gulp
    .src("./app/templates/ua/*.nunjucks")

    .pipe(
      data(function() {
        return globalDataUa;
      }).on("error", notify.onError())
    )

    .pipe(
      nunjucksRender({
        path: ["./app/templates/ua/partials/"]
      }).on("error", notify.onError())
    )
    .pipe(gulp.dest("./app/"));
});

gulp.task("common-js", function() {
  return gulp
    .src(["./app/js/script.js"])
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./app/js"));
});

gulp.task("js", function() {
  return (
    gulp
      .src(["./app/js/script.min.js"])
      .pipe(concat("scripts.min.js"))
      // .pipe(uglify()) // Минимизировать весь js (на выбор)
      .pipe(gulp.dest("./app/js"))
      .pipe(connect.reload())
  );
});

gulp.task("sass", function() {
  return gulp
    .src("./app/scss/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", notify.onError()))
    .pipe(autoprefixer(["last 2 versions", "ie >= 11"]))
    .pipe(csscomb())
    .pipe(groupmq())
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(cleanCSS())

    .pipe(gulp.dest("./app/css"))
    .pipe(connect.reload());
});

function watchFiles() {
  gulp.watch(
    ["./app/templates/ru/*.nunjucks", "./app/templates/ru/**/*.nunjucks"],
    gulp.series(["nunjucksRu"])
  );
  gulp.watch(
    ["./app/templates/ua/*.nunjucks", "./app/templates/ua/**/*.nunjucks"],
    gulp.series(["nunjucksUa"])
  );
  gulp.watch("./app/scss/**/*.scss", gulp.series(["sass"]));
  gulp.watch(["libs/**/*.js", "./app/js/common.js"], gulp.series(["js"]));
  gulp.watch("./app/*.html");
}

gulp.task("imagemin", function() {
  return gulp
    .src("./app/img/**/*")
    .pipe(image()) // Cache Images
    .pipe(gulp.dest("dist/img"));
});

gulp.task("svgmin", () => {
  return gulp
    .src("./app/img/icons/*.svg")
    .pipe(svgo())
    .pipe(gulp.dest("dist/img/icons/"));
});

// gulp.task("deploy", function() {
//   var conn = ftp.create({
//     host: "hostname.com",
//     user: "username",
//     password: "userpassword",
//     parallel: 10,
//     log: gutil.log
//   });

//   var globs = ["dist/**", "dist/.htaccess"];
//   return gulp
//     .src(globs, { buffer: false })
//     .pipe(conn.dest("/path/to/folder/on/server"));
// });

// gulp.task("rsync", function() {
//   return gulp.src("dist/**").pipe(
//     rsync({
//       root: "dist/",
//       hostname: "username@yousite.com",
//       destination: "yousite/public_html/",
//       // include: ['*.htaccess'], // Скрытые файлы, которые необходимо включить в деплой
//       recursive: true,
//       archive: true,
//       silent: false,
//       compress: true
//     })
//   );
// });

gulp.task("removedist", function() {
  return del("dist");
});
gulp.task("clearcache", function() {
  return cache.clearAll();
});

gulp.task("svgSprite", function() {
  return gulp
    .src("./app/img/icons/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg"
          }
        }
      })
    )
    .pipe(
      svgmin({
        plugins: [
          {
            removeComments: true
          },
          {
            removeMetadata: true
          },
          {
            removeEditorsNSData: true
          },
          {
            removeAttrs: { attrs: "data.*" }
          },
          {
            removeStyleElement: true
          },
          {
            removeDesc: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    )
    .pipe(gulp.dest("./app/img/icons/sprite"));
});

const build = gulp.series("removedist", "imagemin", "svgmin", "sass", "js",'nunjucksRu', 'nunjucksUa');
const watch = gulp.parallel("connect", watchFiles);
exports.build = build;
exports.default = watch;
