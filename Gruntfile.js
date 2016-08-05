module.exports = function (grunt) {

    grunt.initConfig({

        wiredep:{
            app:{
                src: [
                    'public/views/index.html'
                ]
            }
        },

        // check all js files for errors
        jshint: {
            all: ['./public/src/js/**/*.js']
        },

        // take all the js files and minify them into app.min.js
        uglify: {
            build: {
                files: {
                    'public/dist/js/app.min.js': ['public/src/js/**/*.js', 'public/src/js/*.js']
                }
            }
        },
        // process the less file to style.css
        less: {
            build: {
                files: {
                    'public/dist/css/base.css': 'public/src/css/base.less'
                }
            }
        },
        // take the processed style.css file and minify
        cssmin: {
            build: {
                files: {
                    'public/dist/css/base.min.css': 'public/dist/css/base.css'
                }
            }
        },
        // watch css and js files and process the above tasks
        watch: {
            css: {
                files: ['public/src/css/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            js: {
                files: ['public/src/js/**/*.js'],
                tasks: ['jshint', 'uglify']
            }
        },
        // watch our node server for changes
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        // run watch and nodemon at the same time
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }
    });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'concurrent']);
};