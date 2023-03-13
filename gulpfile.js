const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const clean = require('gulp-clean')
const uglify = require('gulp-uglify-es').default

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('./'))
}

function scss() {
    return src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('./'))
}

function scripts() {
    return src('src/scripts/**.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('./'))
}

function img() {
    return src('src/images/**')
        .pipe(dest('./images'))
}

function clear() {
    return src('./')
        .pipe(clean())
}

function serve() {
    sync.init({
        server: './'
    })
    watch('src/**/*.html', series(html)).on('change', sync.reload)
    watch('src/scss/**/*.scss', series(scss)).on('change', sync.reload)
    watch('src/images/**', series(img)).on('change', sync.reload)
    watch('src/scripts/**.js', series(scripts)).on('change', sync.reload)
}

exports.build = series(clear, scss, html, scripts, img)
exports.serve = series(scss, html, scripts, img, serve)
