var canvas, context;

function canvasSetup(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    
    let h1 = window.innerHeight;
    let w1 = window.innerWidth*0.95;
    canvas.height = h1;
    canvas.width = w1;
}

function Particle(x, y, r, vel, created){
    this.x = x;
    this.y = y;
    this.radius = r;
    this.opacity = 1;
    this.color = "rgba("+Math.ceil(Math.random()*255)+", "+Math.ceil(Math.random()*255)+", "+Math.ceil(Math.random()*255)+", "+this.opacity+")";
    
    if(!created){
        this.vel = -vel;  
        this.velx = 0;
    }else{
        this.vel = (Math.round(Math.random()) * 2 - 1) * (Math.random()*5);
        this.velx = (Math.round(Math.random()) * 2 - 1) * (Math.random()*5);
    }
    this.acc = 0;
    this.created = created;
    
    this.gravity = function(gravityforce){
        this.acc += gravityforce;
    }
    
    this.update = function(){
        this.vel += this.acc;
        this.y += this.vel;
        this.x += this.velx;
        this.acc = 0;
        
        if(this.y >= canvas.height + 50){
            this.vel = 0;
        }
        
    }
    
    this.draw = function(){
        
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
    
    this.show = function(){
        this.draw();
    }
}

function Firework(){
    this.firework = new Particle(Math.random()*canvas.width, canvas.height, Math.random()*2 + 2, Math.random()*4 + 13, false);
    this.top = false;
    this.newparticles = [];
    
    this.update = function(){
        if(this.top == false){
            this.firework.gravity(0.2);
            this.firework.update();

            if(this.firework.vel >= 0){
                this.top = true;
                this.explode();
            }
        }
        
        for(i = 0; i < this.newparticles.length; i++){
            this.newparticles[i].gravity(0.2);
            this.newparticles[i].update();
        }
        
    }
    
    
    this.explode = function(){
        for(i = 0; i < 100; i++){
            var par = new Particle(this.firework.x, this.firework.y, Math.random()*this.firework.radius, -15, true);
            this.newparticles.push(par);
        }
    }
    
    this.show = function(){
        if(!this.top){
            this.firework.show();
        }
        
        for(i = 0; i < this.newparticles.length; i++){
            this.newparticles[i].show();
        }
    }
}
