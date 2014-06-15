(function () {
    //todo  Remove when files merge, whenever I loaded with everything else, it all went to... бе не беше яко :)
    var BG_COLOR = "#2D4559",
        BG_BOX_COLOR = '#576A7A',
        RECT_WIDTH = 105,
        RECT_HEIGHT = 105,
        TEXT_OFFSET = 33,
        STAGE_WIDTH = 500,
        STAGE_HEIGHT = 500;
    // todo: Add canvas to the HTML <canvas id="menu-screen "width="500" height="500"> </canvas>
    // It also needs some other things, and some beauty touches.

    var canvas = document.getElementById("menu-screen"),
        stage = canvas.getContext("2d");

    var $menuCanvas = $('#menu-screen')
        .css({'background-color': BG_COLOR, 'border-radius': '5px'});

    // todo: Add this to the constants file.
    var DISTANCE = 100;
    var LINE_WIDTH = 10;
    var MENU_TOP_BORDER = 200;
    var MENU_BOTTOM_BORDER = 400;
    var BG_MENU_TILE_COLOR = '#9EBCD9';
    var ANIMATION_DELAY = 500;

    function MenuItem(menuX, menuY, label) {

        this.x = menuX;
        this.y = menuY;
        this.printMenuItem = function (stage) {
            stage.strokeStyle = BG_BOX_COLOR;
            stage.fillStyle = BG_MENU_TILE_COLOR;
            stage.lineWidth = LINE_WIDTH;
            stage.fillRect(this.x, this.y, RECT_HEIGHT * 2.2, RECT_HEIGHT * 0.7);
            stage.strokeRect(this.x, this.y, RECT_HEIGHT * 2.2, RECT_HEIGHT * 0.7);
            stage.fillStyle = 'white';
            stage.font = '35px Veranda';

            stage.fillText(label, this.x + TEXT_OFFSET, this.y + TEXT_OFFSET * 1.5);
        }
    }

    function Pointer(x, y) {
        this.x = x;
        this.y = y;
        this.print = function (stage) {

            stage.strokeStyle = BG_BOX_COLOR;
            stage.fillStyle = BG_MENU_TILE_COLOR;
            stage.lineWidth = LINE_WIDTH;
            stage.fillRect(this.x, this.y, RECT_WIDTH * 0.7, RECT_HEIGHT * 0.7);
            stage.strokeRect(this.x, this.y, RECT_WIDTH * 0.7, RECT_HEIGHT * 0.7);
            stage.strokeWidth = 5;
            stage.strokeStyle = 'white';
            stage.beginPath();
            stage.moveTo(this.x + 56, this.y + 20);
            stage.lineTo(this.x + 25, this.y + 35);
            stage.lineTo(this.x + 56, this.y + 55);
            stage.stroke();
        };
        this.moveUp = function () {
            this.y -= DISTANCE
        };
        this.moveDown = function () {
            this.y += DISTANCE
        };
        this.moveLeft = function () {
            this.x -= DISTANCE * 2;
        }
    }

    function chooseItem() {
        if (pointer.y === start.y) {
            console.log('start new game');
            startNewGame();
        }
        if (pointer.y === about.y) {
            console.log('yep');
            showAboutWindow();
        }
        if (pointer.y === goAway.y) {
            console.log('Not Cool man, not cool');
            hideMainMenu();
            window.close();
            // $menuCanvas.remove();
            // TODO: stop whatever functions there are, alto, there shouldn't be ani.
        }
    }

    function startNewGame() {

        //hideMainMenu();
		window.location.href='index.html';
        // start whatever function you guys like, or you can move hideMain menu options up there
        // and just refer some func
    }

    function showAboutWindow() {
        hideMainMenu();
        setTimeout(function () {
            $('#about-us')
                .fadeIn('duration: 5000')
                .css({                     
                    'background-color': BG_COLOR,
                    'border-radius': '5px',
					'margin-left':'auto',
					'margin-right':'auto',
                    'width': STAGE_WIDTH,
                    'height': STAGE_HEIGHT
                }).append("<p> A story should be in here, but I still don't know it</p>")
                .css({
                    'color': BG_MENU_TILE_COLOR,
                    'font-family': 'clear_sansregular'
                })
        }, ANIMATION_DELAY)
    }

    function delayMenuRemove() {
        $menuCanvas.remove().delay(ANIMATION_DELAY);
    }

    function hideMainMenu() {
        // Here we can add whatever animation we like
        $menuCanvas
            .animate({
                opacity: 0.25,
                height: "toggle"
            }, ANIMATION_DELAY);
        delayMenuRemove();
    }

    document.body.addEventListener('keydown', function (ev) {

        ev = ev || window.event;

        switch (ev.keyCode) {
            case 38:
                pointer.moveUp();
                if (pointer.y < MENU_TOP_BORDER) {
                    pointer.y = MENU_BOTTOM_BORDER
                }
                break;
            case 40:
                pointer.moveDown();
                if (pointer.y > MENU_BOTTOM_BORDER) {
                    pointer.y = MENU_TOP_BORDER
                }
                break;
            case 37:
                pointer.moveLeft();
                if (pointer.x < 150) {
                    pointer.x = 350;
                }
                chooseItem();
                break;
        }
    });

    var TODO = new MenuItem(50, 50, ' Welcome? ');
    var pointer = new Pointer(350, MENU_TOP_BORDER);
    var start = new MenuItem(50, 200, 'Start Game');
    var about = new MenuItem(50, 300, 'About Us');
    var goAway = new MenuItem(50, 400, 'Leave Us');

    function motionTest() {
        stage.clearRect(0, 0, stage.canvas.width, stage.canvas.height);

        requestAnimationFrame(motionTest);
        pointer.print(stage);
        TODO.printMenuItem(stage);
        start.printMenuItem(stage);
        about.printMenuItem(stage);
        goAway.printMenuItem(stage);
    }

    motionTest();
})();