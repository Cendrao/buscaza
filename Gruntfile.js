module.exports = function(grunt){
	

	grunt.initConfig({
		copy: {
			plugins: {
				files: [
				{expand: false, src: ['node_modules/angular/angular.min.js'], dest: 'public/js/angular.min.js'},
				{expand: false, src: ['node_modules/bootstrap/dist/js/bootstrap.min.js'], dest: 'public/js/bootstrap.min.js'},
				{expand: false, src: ['node_modules/bootstrap/dist/css/bootstrap.min.css'], dest: 'public/css/bootstrap.min.css'},
				{expand: false, src: ['node_modules/jquery/dist/jquery.min.js'], dest: 'public/js/jquery.min.js'}
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