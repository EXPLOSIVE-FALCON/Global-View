module.exports = function(grunt) {
  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    distFolder: 'dist',
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },
    watch: {
      scripts: {
        files: [
          'client/views/**/*.js',
          'client/views/**/*.html',
          'client/views/*.css',
          'client/views/**/**/*.js',
          'client/views/**/**/*.html',
          'client/views/**/*.css',
          'client/*.js',
          'client/*.html'
        ],
        options: {
          livereload: true
        }
      }
    },
    clean: {
      build: [
        'dist'
      ]
    },
    // uglify:{

    // },
    // concat:{
    //   dist: {
    //     src:[],
    //     dest:'dist/built.js'
    //   }
    // },
    jsdoc : {
      dist : {
        src: ['server/**/*.js', 'server/*.js', 'client/services/*.js', 'client/*.js', 'client/views/**/*.js', 'client/views/**/**/*.js'],
        options: {
          destination: 'docs'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-concat');
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
};