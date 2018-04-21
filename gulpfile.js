const gulp = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const cssMin = require("gulp-cssmin");
const htmlMin = require("gulp-htmlmin");

//PUBLIC

// Minify and copy index.php file to dist
gulp.task("copyMainIndex", function() {
  gulp.src("src/public/*.php")
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist/public"));
});

// Compile sass
gulp.task("compileSass", function() {
  gulp.src("src/public/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("src/public/css"))
});

// Minify and copy CSS files to dist
gulp.task("copyCss", function(){
  gulp.src("src/public/css/*.css")
    .pipe(cssMin())
    .pipe(gulp.dest("dist/public/css"));
});

// Concat and minify JS
gulp.task("scripts", function() {
  gulp.src([
    "layout/indexPage.js",
    "layout/registerPage.js",
    "layout/loginPage.js",
    "layout/profileSetupPage.js",
    "layout/profilePage.js",
    "modules/createPost.js",
    "modules/friendBtn.js",
    "modules/getPost.js"
  ], {cwd: "src/public/js/"})
    .pipe(concat("index.js"))
    .pipe(gulp.dest("dist/public/js"));
});

//APP-php

// Copy PHP files to dist
gulp.task("copyPhp", function() {
  gulp.src("src/app/**")
    .pipe(gulp.dest("dist/app"));
});

// Copy all .htaccess files
gulp.task("copyHtaccess", function() {
  gulp.src("src/.htaccess")
    .pipe(gulp.dest("dist"));
  gulp.src("src/public/.htaccess")
    .pipe(gulp.dest("dist/public"));
  gulp.src("src/app/.htaccess")
    .pipe(gulp.dest("dist/app"));
});

// Gulp Message
gulp.task("message", function(){
  return console.log("Gulp has started...");
});

// Gulp Watch
gulp.task("watch", function(){
  //PUBLIC SECTION
  // Main index php
  gulp.watch("src/public/*.php", ["copyMainIndex"]);
  // Sass compiler
  gulp.watch("src/public/sass/base/*.scss", ["compileSass"]);
  gulp.watch("src/public/sass/layout/*.scss", ["compileSass"]);
  gulp.watch("src/public/sass/modules/*.scss", ["compileSass"]);
  gulp.watch("src/public/sass/state/*.scss", ["compileSass"]);
  gulp.watch("src/public/sass/theme/*.scss", ["compileSass"]);
  //gulp.watch("src/public/sass/*.scss", ["compileSass"]);
  // CSS copy
  gulp.watch("src/public/css/*.css", ["copyCss"]);
  // JS files
  gulp.watch("src/public/js/modules/*.js", ["scripts"]);
  gulp.watch("src/public/js/layout/*.js", ["scripts"]);
  gulp.watch("src/public/js/*.js", ["scripts"]);

  //APP SECTION
  //PHP files copy
  gulp.watch("src/app/config/*.php", ["copyPhp"]);
  gulp.watch("src/app/controllers/*.php", ["copyPhp"]);
  gulp.watch("src/app/helpers/*.php", ["copyPhp"]);
  gulp.watch("src/app/libraries/*.php", ["copyPhp"]);
  gulp.watch("src/app/models/*.php", ["copyPhp"]);
  gulp.watch("src/app/views/*.php", ["copyPhp"]);
  gulp.watch("src/app/views/**/*.php", ["copyPhp"]);
  gulp.watch("src/app/*.php", ["copyPhp"]);
  //.htaccess files copy
  gulp.watch("src/app/.htaccess", ["copyHtaccess"]);
  gulp.watch("src/app/public/.htaccess", ["copyHtaccess"]);
  gulp.watch("src/app/app/.htaccess", ["copyHtaccess"]);
});

// Gulp default
gulp.task("default", [
  "copyMainIndex",
  "compileSass",
  "copyCss",
  "scripts",
  "copyPhp",
  "copyHtaccess",
  "message",
  "watch"
]);
