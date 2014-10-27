angular.module('splashBox', ['globalMethods'])
.controller('BoxController', function ($scope, GlobalMethods) {
  $scope.data = {
    boxes: []
  };
  $scope.populate = function(city, state, topic) {
    var requestObj = {
      city: city,
      state: state,
      query: topic,
      date: new Date(),
      street: "944 market st"
    }
    $('.a_splashHome').hide();
    // $('.a_splashHome')
    //     .velocity({width: 100})
    //     .velocity({height: 0}, {display: 'none'});
    // $('.a_splashHome')
    //   .find('div')
    //     .velocity({width: 100})
    //     .velocity({height: 0}, {display: 'none'});
    // $('.a_splashHome')
    //   .find('img')
    //     .velocity({width: 100})
    //     .velocity({height: 0}, {display: 'none'});
    // $('.a_splashHome')
    //   .find('h3')
    //     .velocity({width: 100})
    //     .velocity({height: 0}, {display: 'none'})
    //   .find('a')
    //     .velocity({width: 100})
    //     .velocity({height: 0}, {display: 'none'});
    // $('.a_splashHome')
    //   .find('ul')
    //     .velocity({width: 100})
    //      .velocity({height: 0}, {display: 'none'})
    //   .find('li')
    //     .velocity({width: 100})
    //     .velocity({height: 0}, {display: 'none'});
    GlobalMethods.getNews(requestObj);
    GlobalMethods.setCity(requestObj);
    GlobalMethods.getTweets(requestObj);
    GlobalMethods.getPhotos(requestObj);
  };
});
