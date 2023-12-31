var canvas = document.querySelector('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
/*
var generateShapes = function(q) {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(i=0;i<q;i++) {
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        var xwidth  = Math.random() * 3;
        var xheight  = Math.random() * 100;
        var rainAlpha = Math.random() * 0.8;
        var rainHue = `rgba(0,0,150,${rainAlpha}`;

        c.fillStyle = `${rainHue}`;
        c.fillRect(x, y, xwidth, xheight);
    };
}

//generateShapes(1000);
var q = 10; // quantity of drops
var i = 1; // quantity increase
var s = 5; // forced speed of ramp up
setInterval(() => {
    generateShapes(q);
    if (q < 100)  {
        i = Math.random() * s; // randomised increase
        q = q + i
        console.log(`${q}, ${i}`);
    }
    
}, 1000 / 24);
*/
var randomValidX = function() {
    x = Math.random() * (innerWidth - radius * 2) + radius;
    return x;
}
var randomValidY = function() {
    y = Math.random() * (innerHeight - radius * 2) + radius;
    return y;
}

var maxRadius = 40;

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius) { // circle object
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    var rv = Math.random() * 255;
    var gv = Math.random() * 255;
    var bv = Math.random() * 255;
    this.fillColor = `rgba(${rv},${gv},${bv},1)`;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //c.strokeStyle = `black`;
        //c.stroke();  
        c.fill();  
        c.fillStyle = this.fillColor;
        
    }
    this.update = function() {
        if (this.x + this.radius > innerWidth ||
            this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight ||
            this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        if (this.x > innerWidth + 1) {
            this.x = randomValidX();
        }
        if (this.y > innerHeight + 1) {
            this.y = randomValidY();
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // interactivity

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y >  -50) {
            if (this.radius < maxRadius) {
                this.radius +=2;
            }
        } else if (this.radius > radius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];
var circleQuantity = 1000;

for (var i = 0; i < circleQuantity; i++) {
    var radius = Math.floor(Math.random() * 3) + 1;
    var x = randomValidX();
    var y = randomValidY();
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}
var wait = 0;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i= 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

/*
    if (wait < 20) {
        wait++
    } else if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log('triggered'+ wait);
        wait = 0
    } else {
        wait = 0
    }
    
    
    if (wait == 60 && canvas.width !== window.innerWidth ||
        wait == 60 && canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            console.log('triggered'+ wait);
            
        }
*/
}

animate();