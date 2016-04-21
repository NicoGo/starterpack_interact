module.exports = function (grunt)
{
    grunt.initConfig(
        {
            concat:
            {
                options:
                {

                },
                bootstrap:
                {
                    src: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/bootstrap/dist/js/bootstrap.js'
                    ],
                    dest: 'dist/js/site-all.js'
                }
            },
            uglify:
            {
                my_target: {
                    options: {
                        sourceMap: true,
                        sourceMapName: 'dist/js/site-all.min.map'
                    },
                    files: {
                        'dist/js/site-all.min.js': ['dist/js/site-all.js']
                    }
                }
            },
            less:
            {
                compile:
                {
                    options:
                    {
                        paths: ['src/less']
                    },
                    files:
                    {
                        "dist/css/style.css": "src/less/style.less" // destination file and source file
                    }
                }
            },
            watch:
            {
                styles:
                {
                    files: ['src/*/*.less'], // which files to watch
                    tasks: ['less']
                },
                scripts:
                {
                    files: ['src/*/*.js'],
                    tasks: ['concat']
                },
                html:
                {
                    files: 'src/*.html'
                },
                options: {
                    livereload: true
                }
            },
            connect:
            {
                server:
                {
                    options:
                    {
                        port: 9000,
                        base: '.',
                        hostname: '0.0.0.0',
                        protocol: 'http',
                        livereload: true,
                        open: true,
                    }
                }
            }

        });

        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-connect');

        grunt.registerTask('default', ['less', 'watch']);

        grunt.registerTask('server', ['connect','watch']);

        grunt.registerTask('prod', ['uglify']);

};