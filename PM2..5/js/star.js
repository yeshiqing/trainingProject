var runstars = true;



var a=jQuery;
jQuery(document).ready(function() {
    window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
            window.setTimeout(a, 1e3 / 60);
        };
    }();
    var b = {
        window: jQuery(window),
        ww: window.innerWidth,
        hh: window.innerHeight
    };
    var c = {
        canvas: document.getElementById("stars"),
        mouse_pos: {
            x: 0,
            y: 0
        },
        opacity_line: .125,
        min_dist_stars: 60,
        min_dist_mouse: 180,
        status: "mouseleave",
        stars_alpha: true,
        alpha_color: 1,
        enablemouse: true
    };
    var d = {
        nb: 1e3,
        array: []
    };
    c.ctx = c.canvas.getContext("2d");
    setStarsCount = function() {
        var a = window.innerWidth;
        if (a < 767) d.nb = 300;
        if (a >= 768 && a < 1280) d.nb = 500;
        if (a >= 1280 && a < 1440) d.nb = 700;
        if (a >= 1440 && a < 1600) d.nb = 900;
        if (a >= 1600) d.nb = 1200;
    };
    sizeCanvas = function() {
        b.window.on("resize", function() {
            b.ww = window.innerWidth;
            b.hh = 630;
            c.canvas.width = b.ww;
            c.canvas.height = b.hh;
            paintCanvas();
            setStarsCount();
        });
        c.canvas.width = jQuery(window).innerWidth();
        c.canvas.height = document.body.offsetHeight;
    };
    paintCanvas = function() {
        c.ctx.fillStyle = "rgba(64,75,113, 1)";
        c.ctx.fillRect(0, 0, b.ww, b.hh);
    };
    star = function(a) {
        this.x = Math.random() * b.ww;
        this.y = Math.random() * b.hh;
        this.vx = -.5 + Math.random() * 1.1;
        this.vy = -.5 + Math.random() * 1.1;
        this.radius = Math.random() * 1.7;
        this.draw = function(a) {
            c.ctx.fillStyle = a;
            c.ctx.beginPath();
            c.ctx.arc(this.x, this.y, this.radius*1, 0, Math.PI * 2, false);
            c.ctx.fill();
        };
    };
    createStars = function() {
        for (var a = 0; a < d.nb; a++) {
            d.array.push(new star("white"));
        }
    };
    drawStars = function() {
        paintCanvas();
        for (var a = 0; a < d.array.length; a++) {
            if (d.array[a].linked) d.array[a].draw("white"); else d.array[a].draw("rgba(255,255,255," + c.alpha_color + ")");
        }
        moveStars();
    };
    var e = [];
    moveStars = function() {
        for (var a = 0; a < d.array.length; a++) {
            p = d.array[a];
            if (c.status == "mousemove") {
                e.push(new Date().getTime());
                var f = new Date().getTime() - e[0];
                var g = f * 3 / 6e3;
                if (f > 1e3) {
                    c.stars_alpha = true;
                    c.alpha_color = 1 - f / 6e3;
                }
                p.x += p.vx;
                p.y += p.vy;
            } else {
                p.x += p.vx;
                p.y += p.vy;
            }
            if (p.x + p.radius > b.ww) p.x = p.radius; else if (p.x - p.radius < 0) p.x = b.ww - p.radius;
            if (p.y + p.radius > b.hh) p.y = p.radius; else if (p.y - p.radius < 0) p.y = b.hh - p.radius;
            for (var h = a + 1; h < d.array.length; h++) {
                p2 = d.array[h];
                distanceParticleMouse(p, p2);
            }
        }
    };
    distanceParticleMouse = function(a, b) {
        var d, e = a.x - b.x;
        dy = a.y - b.y;
        d = Math.sqrt(e * e + dy * dy);
        var f, g = a.x - c.mouse_pos.x;
        dy_mouse = a.y - c.mouse_pos.y;
        f = Math.sqrt(g * g + dy_mouse * dy_mouse);
        if (d <= c.min_dist_stars && f <= c.min_dist_mouse && c.status == "mousemove") {
            c.ctx.beginPath();
            c.ctx.strokeStyle = "rgba(255,255,255," + c.opacity_line + ")";
            c.ctx.moveTo(a.x, a.y);
            c.ctx.lineTo(b.x, b.y);
            c.ctx.stroke();
            c.ctx.closePath();
            a.linked = true;
            b.linked = true;
        }
    };
    animloop = function() {
        drawStars();

        animFrame = requestAnimFrame(animloop);
    };
    initStarsAnimate = function() {
        setStarsCount();
        sizeCanvas();
        paintCanvas();
        createStars();
        drawStars();
        animloop();
        a(c.canvas).on("mousemove mouseleave", function(a) {
            if (c.enablemouse) {
                if (a.type == "mousemove") {
                    c.status = "mousemove";
                    c.mouse_pos.x = a.pageX;
                    c.mouse_pos.y = a.pageY;
                } else {
                    c.status = "mouseleave";
                    c.mouse_pos.x = 0;
                    c.mouse_pos.y = 0;
                    e = [];
                    setTimeout(function() {
                        c.stars_alpha = false;
                        c.alpha_color = 1;
                    }, 600);
                }
            }
        });
    };
});





jQuery(function(a) {
    a(document).ready(function() {
        if (runstars) {
            initStarsAnimate();
        }
    });
});
