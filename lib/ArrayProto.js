(function(){
	'use strict';

	Array.prototype.addRange = function (arr) {

		if (!arr || !arr.length) throw 'Empty array';

		for (var i = 0; i < arr.length; i++) {
			this.push(arr[i]);
		}

	};


})();