
var hammer = document.getElementById('hammer')

hammer.style.position = "absolute"

var currentX 
var currentY

var registerEvent = true
document.addEventListener('mousemove', onMoveOverGame)


function positionHammer() {
    hammer.style.display = "initial"
    var gameArea = getGameArea()
    hammer.style.left = (gameArea.left + ((gameArea.right - gameArea.left)/2) - 95/2) + "px"
    hammer.style.top = (gameArea.top + ((gameArea.bottom - gameArea.top)/2) - 95/2) + "px"
}

function onMoveOverGame(e) {
    var gameArea = getGameArea()
    if (gameArea.left <= e.x && gameArea.right >= e.x && gameArea.top <= e.y && gameArea.bottom >= e.y) {
        var padding =42
        hammer.style.top = (e.y - padding) + "px"
        hammer.style.left = (e.x ) + "px"
        currentX = e.x 
        currentY = e.y

        if (registerEvent) {
            document.addEventListener('mousedown', onClick)
            document.addEventListener('mouseup', onRelease)
            registerEvent = false
        }




    } else {
        positionHammer()

        document.removeEventListener('mousedown', onClick)
        document.removeEventListener('mouseup', onRelease)

        registerEvent = true
    }
}

function onClick() {
    hammer.className = "hit"
}

function onRelease() {
    hammer.className = "initialHammer"
}




function getGameArea() {

    var border = 10
    var table = document.querySelectorAll('table')[1]
    return {
        left: table.offsetLeft - border,
        right: table.offsetLeft + table.offsetWidth + border,
        top: table.offsetTop,
        bottom: table.offsetHeight + border
    }

}

function showPoints(id, points) {
    console.log(id)
    var point = document.getElementById('point-' + id)
    point.classList.remove('disabled')
    point.style.top = (currentY - 45) + "px"
    point.style.left = (currentX - 45 ) + "px"
    point.innerHTML = points
    animateCSS(point, "slideOutUp").then((smg) => {
        point.classList.add('disabled')
    })
}



const animateCSS = (node, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });