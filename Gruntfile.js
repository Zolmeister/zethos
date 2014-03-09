module.exports = function(grunt) {

  grunt.initConfig({
    'closure-compiler': {
      frontend: {
        closurePath: 'closure-compiler',
        js: 'main.js',
        jsOutputFile: 'main.min.js',
        maxBuffer: 5000,
        noreport:true,
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          language_in: 'ECMASCRIPT5'
        }
      }
    },
    jscrush: {
      options: {},
      main: {
        files: {
          'main.atom.js': ['main.min.js'],
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-jscrush');
  
  grunt.registerTask('default', ['closure-compiler', 'jscrush']);

};