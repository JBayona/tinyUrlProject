'use strict';

angular.module('tinyUrlApp')
  .filter('startFrom', function () {
    return function (input, start) {
      if(!input){
    		return;
    	}
      start = +start;
      return input.slice(start); //Cortamos el array que nos va a regresar para mostrarlo
      //En este caso vamos a cortar los elementos que vengan, por ejemplo si son 20, vamos a cortar los primeros 20 o lo que vengan
    };
  });
