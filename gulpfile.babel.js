import del from "del";
import gulp from "gulp";
import gulpPug from "gulp-pug";
import gulpWebserver from "gulp-webserver";
import gulpImage from "gulp-image";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import autoprefixer from "autoprefixer";
import csso from "gulp-csso";
import postCSS from "gulp-postcss";
import tailwindcss from "tailwindcss";
import bro from "gulp-bro";
import babelify from "babelify";
import "regenerator-runtime";

const routes = {
  pug: {
    watch: "src/views/**/*.pug",
    src: "src/views/*.pug",
    dest: "build",
  },
  img: {
    src: "src/public/images/*",
    dest: "build/imgaes",
  },
  scss: {
    src: "src/public/styles/styles.scss",
    dest: "build/css",
    watch: "src/public/styles/styles.scss",
  },
  js: {
    watch: "src/public/js/**/*.js",
    src: "src/public/js/main.js",
    dest: "build/js",
  },
};

const pug = () =>
  gulp.src(routes.pug.src).pipe(gulpPug()).pipe(gulp.dest(routes.pug.dest));

const scss = async () => {
  const sass = gulpSass(nodeSass);
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(postCSS([tailwindcss, autoprefixer]))
    .pipe(csso())
    .pipe(gulp.dest(routes.scss.dest));
};

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dest));

const clean = () => del(["build"]);

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.scss.watch, scss);
};

const webserver = () =>
  gulp.src("build").pipe(gulpWebserver({ livereload: true }));

const img = () =>
  gulp.src(routes.img.src).pipe(gulpImage()).pipe(gulp.dest(routes.img.dest));

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, scss, js]);

const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);
