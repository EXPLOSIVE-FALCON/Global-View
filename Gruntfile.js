module.exports = function(grunt) {
  // 1. All configuration goes here 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },
    watch: {
      scripts: {
        files: [
          'public/*.js',
          'public/*.html'
        ],
        options: {
          livereload: true
        }
      } 
    },
    // watch: {
    //   scripts: {
    //     files: [
    //       'server/*.js',
    //       'server/**/*.js'
    //     ],
    //     tasks: ['jsdoc'],
    //     options: {
    //       livereload: true
    //     }
    //   } 
    // },
    jsdoc : {
      dist : {
        src: ['server/**/*.js', 'server/*.js'], 
        options: {
          destination: 'docs'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('server-dev', function (target) {
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  grunt.registerTask('docs', [
    'jsdoc'
  ]);
  grunt.registerTask('docs-watch', [
    'jsdoc',
    'watch'
  ]);
};