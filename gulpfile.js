
const {src, dest, parallel, watch, series}    = require("gulp"),
      sass                                    = require("gulp-sass"),
      pug                                     = require("gulp-pug"),
      autoprefixer                            = require("autoprefixer"),
      postcss                                 = require("gulp-postcss"),
      csso                                    = require("gulp-csso"),
      htmlmin                                 = require("gulp-htmlmin"),
      uglify                                  = require("gulp-uglify"),
      imagemin                                = require("gulp-imagemin"),
      clean                                   = require("gulp-clean"),
      rename                                  = require("gulp-rename"),
      sync                                    = require("browser-sync");

function compileHtml() {

    return src("src/template/*.pug")
        .pipe(pug({pretty:true}))
        .pipe(dest("src/"))
        .pipe(sync.reload({stream:true}))
};

function distHtml() {
    var settings = {
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            sortAttributes: true,
            sortClassName: true
            };

    return src("src/*.html")
        .pipe(htmlmin(settings))
        .pipe(rename("index-min.html"))
        .pipe(dest("./dist/"))

};


function compileCss() {

    return src("src/style/sass/*.sass")
        .pipe(sass())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(dest("src/style"))
        .pipe(sync.reload({stream:true}))
};

function distCss() {

    return src("src/style/*.css")
        .pipe(csso())
        .pipe(dest("./dist/style/"))
};

function distJs() {

    return src("src/js/*.js")
        .pipe(uglify())
        .pipe(dest("./dist/js/"))

};

function distImage() {

    return src("src/img/*")
        .pipe(imagemin())
        .pipe(dest("dist/img/"))
};
    

function pagesync() {
    sync({
        server:{
            baseDir:"./",
            directory: true
        }
    });
};

function cleanDist() {

    return src("dist/*")
    .pipe(clean());

    };

function watchCompile() {
    watch("./src/template/*.pug", compileHtml);
    watch("./src/style/sass/*.sass", compileCss);
};

exports.compileHtml = compileHtml;
exports.compileCss  = compileCss;
exports.distCss     = distCss;
exports.distJs      = distJs;
exports.distImage   = distImage;
exports.pagesync    = pagesync;
exports.clean       = clean;
exports.watchCompile = watchCompile;
exports.build       = series(cleanDist, parallel(distHtml, distCss, distJs, distImage));
exports.default     = series(parallel(compileHtml, compileCss), parallel(pagesync, watchCompile));