var movement = {
  moving: true,
  from: [],
  left: 0,
  top: 0
};

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
    console.log(movement.left, movement.top);
    $('html, body').animate({
      scrollLeft: movement.left,
      scrollTop: movement.top
    }, 4500);
  };
  shift();
  setInterval(shift, 3500);
};

var checkMovement = function(to) {
  var from = movement.from;
  var dist = distance(to, from);
  movement.moving = dist > 30 ? true : false;
  if (movement.moving && !!to.length && !!from.length) { 
    var moveX = from[0] - to[0];
    var moveY = from[1] - to[1];
    moveX = Math.floor(moveX * -0.55);
    moveY = Math.floor(moveY * -0.55);
    window.scrollBy(moveX, moveY);

    $('html, body').clearQueue();
    $('html, body').stop(); 
  }
  moveX = typeof moveX !== 'number' ? 0 : moveX;
  moveY = typeof moveY !== 'number' ? 0 : moveY;
  movement.from = !!from ? to : [to[0] + moveX, to[1] + moveY];
};

var distance = function(first, second) {
  var x = first[0] - second[0];
  var y = first[1] - second[1];
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};