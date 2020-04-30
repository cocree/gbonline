var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    cleanCSS      = require('gulp-clean-css'),
    autoprefixer  = require('gulp-autoprefixer'),
    rename        = require('gulp-rename'),
    inject        = require('gulp-inject'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    plumber       = require('gulp-plumber'),
    babel         = require('gulp-babel'),
    browserify    = require('browserify'),
    clean         = require('gulp-clean'),
    sourcemaps    = require('gulp-sourcemaps'),
    htmlmin       = require('gulp-html-minifier'),
    sftp          = require('gulp-sftp'),
    gutil         = require('gulp-util');
    glob          = require('glob'),
    ftp           = require('vinyl-ftp');
    buffer        = require('vinyl-buffer');
    source        = require('vinyl-source-stream');
    browserSync   = require('browser-sync').create();
var reload        = browserSync.reload;

var src           = "./src/",
    dist          = "./contao/files/",
    projectname   = "gbdd",
    globsftp      = 'contao/**',
    conn = ftp.create( {
    host:     'cocree-express.de',
    user:     '461853-webgb',
    password: 'epGtaaHq1Be0bjwujuO8ix4jrAzjaezb',
    parallel: 10,
    log:      gutil.log,
    idleTimeout: 100000,
    timeOffset: 0
    } );
var globsscss = [
        'files/**'
    ];
var globsjs = [
            'files/**'
        ];


// #######################################
// MINIFIER SASS
gulp.task('scss',function(done){
    gulp.src(src + 'style/' + projectname + '/*.scss')
        .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(rename({basename: 'style'}))
            .pipe(cleanCSS())
            .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist + 'style/' + projectname + '/'))
        .pipe(browserSync.stream());
        done();
});

// #######################################
// MINIFIER JS
// hier weiter https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
// browserify config
gulp.task('bundle',function(done){
    return browserify(src + '/js/third/' + projectname + '-extern.js')
   .bundle()
   .pipe(source(projectname + '-bundle.js'))
   .pipe(gulp.dest(src + '/js/concat'));
    
});


gulp.task('js',function(done){
    // glob('./app/main-**.js', function(err, files) {
    //     if(err) done(err);
    // var b = browserify({
    //     insertGlobals: true,
    //     debug: !gutil.env.productio
    //   });
    //   return b.bundle(src + 'js/.js')
    //     .pipe(buffer())
    gulp.src([src + 'js/concat/*.js', src + 'js/my/*.js'])
        .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(concat('' + projectname + '.js'))
            .pipe(babel({
               presets: ['@babel/preset-env']}))
            .pipe(uglify())
            
            .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist + 'js/'))
        .pipe(browserSync.stream());
        done();
});


//gulp.task('syncscss',function(done){

//      return gulp.src( globsscss, { base: '.', buffer: false } )
//            .pipe( conn.newer( '/' ) ) // only upload newer files
//          .pipe( conn.dest( '/' ) );
        
//});

gulp.task('ftp-upload',function(done){

    return gulp.src( globsftp, { base: 'contao/', buffer: false } )
        .pipe( conn.newer( '/' ) ) // only upload newer files
        .pipe( conn.dest( '/' ) );

});
// #######################################
// WATCH
gulp.task('watch', function() {
  gulp.watch([src + 'style/' + projectname + '/*.scss', src + 'style/src/*.scss'], gulp.series('scss'));
  gulp.watch([src + 'js/my/*.js', src + 'js/third/*.js'], gulp.series('bundle','js'));
  gulp.watch([dist + '**'], gulp.series('ftp-upload', reload));
});

gulp.task('default', gulp.series ('scss','bundle','js','ftp-upload','watch', function(done) {
    
    done();
  
}));
