var movement = {
  shifter: null,
  moving: true,
  from: [],
  left: 0,
  top: 0
};
var shifter;
var initiateMovement = function() {
  var shift = function() {
    movement.moving = false;
    var dimension = {
      width: $('.a_splashHome')[0].scrollWidth
           - $(window).width(),
      height: $('.a_splashHome')[0].scrollHeight
           - $(window).height()
    };
    movement.left = Math.floor(Math.random() * dimension.width);
    movement.top = Math.floor(Math.random() * dimension.height);
    $('html, body').animate({
      scrollLeft: movement.left,
      scrollTop: movement.top
    }, 5000);
  };
  shift();
  shifter = setInterval(shift, 4500);
};

var checkMovement = function(to) {
  var from = movement.from;
  var dist = distance(to, from);
  if (!movement.moving) {
    movement.moving = dist > 25 ? true : false;
  }
  if (dist !== 0 && movement.moving && !!to.length && !!from.length) { 
    var moveX = from[0] - to[0];
    var moveY = from[1] - to[1];
    moveX = Math.floor(moveX * -0.50);
    moveY = Math.floor(moveY * -0.50);
    // window.scrollBy(moveX, moveY);
    smoothScroll(moveX, moveY, dist);

    $('html, body').clearQueue();
    $('html, body').stop(); 
  }
  moveX = typeof moveX !== 'number' ? 0 : moveX;
  moveY = typeof moveY !== 'number' ? 0 : moveY;
  movement.from = !!from ? to : [to[0] + moveX, to[1] + moveY];
};

var smoothScroll = function(x, y) {
  var sens = 2;
  while (Math.abs(x) > 0 || Math.abs(y) > 0) {
    if (x > 0) {
      var moveX = x > sens ? sens : x;
      x -= moveX;
    } else if (x < 0) {
      var moveX = x < -sens ? -sens : x;
      x -= moveX;
    } else if (x === 0) {
      var moveX = 0;
    }

    if (y > 0) {
      var moveY = y > sens ? sens : y;
      y -= moveY;
    } else if (y < 0) {
      var moveY = y < -sens ? -sens : y;
      y -= moveY;
    } else if (y === 0) {
      var moveY = 0;
    }
    window.scrollBy(moveX, moveY);
  }
};

var distance = function(first, second) {
  var x = first[0] - second[0];
  var y = first[1] - second[1];
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};