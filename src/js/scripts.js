$(function(){

  $(window).scroll(function(){

    var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();

    if ((wintop / (docheight - winheight)) > 0.80) {
      var $scope = angular.element($('[ng-app]')).scope();
      $scope.carregarMais();
    }


  });

});