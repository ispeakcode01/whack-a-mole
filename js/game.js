var game = (function () {

    var countDown = 60
    const TIME_OUT = countDown * 1000
    var timeout
    var interval
    var holes = []
    var gameStarted = false
    var gameMusic

    init()

    function init() {
        displayTime()

        document.addEventListener('keypress', event => {
            if (event.code === 'Space' && !gameStarted) {
                gameStarted = true
                gameMusic = grid.playAudio('gameAudio')
                document.getElementsByClassName('menu')[0].style.display = "none"
                start()
                startTimer()

                interval = setInterval(function () {
                    countDown--
                    updateTime()
                }, 1000)
            }
        })
    }

    function startTimer() {
        timeout = setTimeout(function () {
            clearTimeout(timeout)
            holes.forEach(hole => {
                clearInterval(interval)
                hole.stop()
                setBestScore()
                showMenu()
                reset()
            })
        }, TIME_OUT)
    }

    function displayTime() {
        var date = new Date(TIME_OUT)
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        if (minutes < 10)
            minutes = "0" + minutes

        if (seconds < 10)
            seconds = "0" + seconds
        document.querySelector('#timer').innerHTML = `00:${minutes}:${seconds}`
    }

    function reset() {
        gameMusic.load()
        countDown = 60
        gameStarted = false
        document.querySelector('#score').innerHTML = "0"
        clearInterval(interval)
        clearTimeout(timeout)
        grid.resetGrid()
        holes = []
        displayTime()
    }

    function start() {

        var id = 1
        grid.getHoles().forEach(hole => {
            holes.push(new Hole(id++, hole.x, hole.y))
        });
        var pos = [0, 1, 2, 3, 4, 5]
        var min = 0
        var max = pos.length - 1
        var time = 1000
        for (var i = 0; i < holes.length; i++) {
            var randPos = Math.floor(Math.random() * (max - min + 1)) + min;
            var selected = pos[randPos]
            var hole = holes[selected]
            hole.setIntervalTime(time)
            hole.start()
            pos.splice(randPos, 1)
            max = pos.length - 1
            time += 300
        }
    }

    function showMenu() {
        var menu = document.getElementsByClassName('menu')[0]
        menu.style.display = 'initial'
        menu.querySelector('#best').innerHTML = getBestScore()
    }

    function setBestScore() {
        var score = parseInt(document.getElementById('score').innerHTML)
        var bestScore = getBestScore()
        if (bestScore <= score)
            localStorage.setItem("score", score)
    }

    function getBestScore() {
        var best = localStorage.getItem('score')
        if (best)
            return best
        return 0
    }

    function updateTime() {
        var time = countDown
        if (countDown < 10)
            time = "0" + time
        document.querySelector('#timer').innerHTML = "00:00:" + time
    }




}())