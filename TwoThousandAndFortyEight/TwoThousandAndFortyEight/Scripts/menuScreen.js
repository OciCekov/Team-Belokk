(function () {

    // TODO: Add canvas to the HTML <canvas id="menu-screen"width="500" height="500"> </canvas>
    // It also needs some other things, and some beauty touches.

    var canvas = document.getElementById("menu-screen"),
        stage = canvas.getContext("2d");
    // Probably ugliest way to do this
    var menuCanvas = document.getElementById('menu-screen').style.backgroundColor = BG_COLOR;

    var DISTANCE = 100;
    var LINE_WIDTH = 10;
    var MENU_TOP_BORDER = 200;
    var MENU_BOTTOM_BORDER = 400;
    var BG_MENU_TILE_COLOR = '#9EBCD9';

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
        }
        this.moveUp = function () {
            this.y -= DISTANCE
        }
        this.moveDown = function () {

            this.y += DISTANCE
        }
    }

    var pointer = new Pointer(350, MENU_TOP_BORDER);
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
                // left arow
                // TODO: Create select item;
                // Has to be something like......
                // if (pointer.x == menuItem.x){start current menu item, and remove this canvas}
                break;
        }
    })

    var TODO = new MenuItem(50,50,' Welcome? ')

    var start = new MenuItem(50, 200, 'Sart Game');
    var about = new MenuItem(50, 300, 'About Us');
    var goAway = new MenuItem(50, 400, 'Leave Us');

    function motionTest() {
        stage.clearRect(0, 0, stage.canvas.width, stage.canvas.height);
        pointer.print(stage)
        requestAnimationFrame(motionTest);

        TODO.printMenuItem(stage);
        start.printMenuItem(stage);
        about.printMenuItem(stage);
        goAway.printMenuItem(stage);
    }
    motionTest()
})();