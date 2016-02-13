module.exports = function(grunt){


	grunt.initConfig({
		copy: {
			plugins: {
				files: [
				{expand: false, src: ['node_modules/angular/angular.min.js'], dest: 'public/js/angular.min.js'},
				{expand: false, src: ['node_modules/bootstrap/dist/js/bootstrap.min.js'], dest: 'public/js/bootstrap.min.js'},
				{expand: false, src: ['node_modules/bootstrap/dist/css/bootstrap.min.css'], dest: 'public/css/bootstrap.min.css'},
				{ cwd: 'node_modules/bootstrap/fonts', src: '**/*', dest: 'public/fonts', expand: true },
				{expand: false, src: ['node_modules/jquery/dist/jquery.min.js'], dest: 'public/js/jquery.min.js'},
				{expand: false, src: ['node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js'], dest: 'public/js/ui-bootstrap.js'},
				{expand: false, src: ['node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'], dest: 'public/js/ui-bootstrap-tpls.js'}
				]
			},
			html: {
				files: [
					{expand:false, src: ['src/html/index.html'], dest: 'public/index.html'}
				]
			}
		},
		uglify: {
			angularApp: {
				files: {
					'public/app/app.js' : ['src/app/app.js', 'src/app/controller.js']
				}
			},
			util: {
				files: {
					'public/js/util.min.js' : ['src/js/prototype.js', 'src/js/scripts.js']
				}
			}
		},
		cssmin: {
			target: {
				files: {
					'public/css/style.css' : ['src/css/style.css']
				}
			}
		},
		watch: {
			app: {
				files: [ 'src/app/**/*' ],
				tasks: ['uglify:angularApp']
			},
			utilities: {
				files: ['src/js/*.js'],
				tasks: ['uglify:util']
			},
			html: {
				files: [ 'src/html/*.html' ],
				tasks: [ 'copy:html' ]
			},
			css: {
				files: [ 'src/css/*.css' ],
				tasks: [ 'cssmin']
			}
		}
	});

grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks( 'grunt-contrib-watch' );
grunt.loadNpmTasks('grunt-contrib-cssmin');

grunt.registerTask('default',['copy', 'uglify', 'cssmin']);

grunt.registerTask('w', ['watch']);

}