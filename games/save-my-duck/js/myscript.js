		window.onload=function(){
			// RequestAnimFrame: a browser API for getting smooth animations
		window.requestAnimFrame = (function(){
			return  window.requestAnimationFrame       || 
				window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     ||  
				function( callback ){
					return window.setTimeout(callback, 1000 / 60);
				};
		})();

		window.cancelRequestAnimFrame = ( function() {
			return window.cancelAnimationFrame          ||
				window.webkitCancelRequestAnimationFrame    ||
				window.mozCancelRequestAnimationFrame       ||
				window.oCancelRequestAnimationFrame     ||
				window.msCancelRequestAnimationFrame        ||
				clearTimeout
		} )();

			//Global Elements
				var ctx;
				var isPaused = false;
				var level=1;
				var gravity=4;
				var forceFactor=0.3;
				var mouseDown=false;
				var balls=new Array();
				var directionOfDuck=0;
				var over=0;
				var points=0;
				var lifes=3;
				var duckSave;
				var duckWords=["Ouccch!!","Uhh! This hurts!","Mind my head !","Balls are heavy !!"]
				var mousePos=new Array();
				var startBtn = {}; // Start button object
				var restartBtn = {}; // Restart button object
				var shootSound = document.createElement('audio');
				shootSound.setAttribute('src', 'sounds/gun.mp3');
				var backgroundSound = document.createElement('audio');
				backgroundSound.setAttribute('src','sounds/background.mp3');
				backgroundSound.setAttribute('loop','loop');
				var duckSound = document.createElement('audio');
				duckSound.setAttribute('src','sounds/duck.mp3');

				// minimum and maximum ball limits.
				var minBall=2;
				var rangeBall=4;

				W = window.innerWidth, // Window's width
				H = window.innerHeight; // Window's height

			//Button for start and restart the game
				startBtn = {
					w: 150,
					h: 50,
					x: W/2 - 50,
					y: 150,

					draw: function() {
						ctx.save();
						ctx.strokeStyle = "black";
						ctx.lineWidth = "4";
						ctx.fillStyle="white";
						ctx.shadowColor = "black";
						ctx.shadowOffsetX = 5; 
						ctx.shadowOffsetY = 5; 
						ctx.shadowBlur = 6;
						ctx.fillRect(this.x, this.y, this.w, this.h);
						ctx.strokeRect(this.x, this.y, this.w, this.h);					
						ctx.font = "20px Arial, sans-serif";
						ctx.textAlign = "center";
						ctx.textBaseline = "middle";
						ctx.fillStyle = "#000";
						ctx.fillText("Start", W/2+25, 175);
						ctx.restore();
					}
				};

				// Restart Button object
				restartBtn = {
					w: 150,
					h: 50,
					x: W/2 - 50,
					y: H/2 - 50,

					draw: function() {
						ctx.save();
						ctx.strokeStyle = "black";
						ctx.lineWidth = "4";
						ctx.fillStyle="white";
						ctx.shadowColor = "black";
						ctx.shadowOffsetX = 5; 
						ctx.shadowOffsetY = 5; 
						ctx.shadowBlur = 6;
						ctx.fillRect(this.x, this.y, this.w, this.h);
						ctx.strokeRect(this.x, this.y, this.w, this.h);
						ctx.font = "20px Arial, sans-serif";
						ctx.textAlign = "center";
						ctx.textBaseline = "middle";
						ctx.fillStyle = "#000";
						ctx.fillText("Restart", W/2+25, H/2 - 25 );
						ctx.restore();
					}
				};
			//Event Handler
				function onMouseDown(evt){
					//TODO: Shot the ball.
					if(isPaused){
						return;
					}
					shootSound.play();
						// Variables for storing mouse position on click
						var mx = evt.pageX,
								my = evt.pageY;
						
						// Click start button
						if(mx >= startBtn.x && mx <= startBtn.x + startBtn.w && my >= startBtn.y && my <= startBtn.y + startBtn.h) {
							duckSave=new duck(50,canvas.height-75,20,0,75,75);
							$('.instruction').hide();
							backgroundSound.play();
							(function(){     
							    var sec = 5;  
							    var id = window.setInterval(function() { 
							        switch(sec){
							        	case 1:
							        			$('.count').html("Save <br>Duck <(*)");
							        			break;
							        	case 2:
							        			$('.count').html("Let's");
							        			break;
							        	case 3:
							        	case 4:
							        	case 5:
							        	$('.count').html(sec);
							        	break;		

							        }
							        if (sec == 0) {
							            clearInterval(id);
							            $('.count').hide();
							            ballgenerator();
							            window.setInterval(function(){
							            	ballgenerator();
							            },5000);
							            return;
							        }        
							         sec--;
							    }, 1000)
							})();

							animloop();
							
							// Delete the start button after clicking it
							startBtn = {};
						}
						
						// If the game is over, and the restart button is clicked
						if(over == 1) {
							if(mx >= restartBtn.x && mx <= restartBtn.x + restartBtn.w && my >= restartBtn.y && my <= restartBtn.y + restartBtn.h) {
								balls=[];
								points=0;
								directionOfDuck=0;
								duckSave=new duck(50,canvas.height-75,20,0,75,75);
								backgroundSound.play();
								animloop();
								over = 0;
								level=1;
								lifes=3;
								minBall=2
								rangeBall=4;
								forceFactor=0.3;
							}
						}
						for(var i=0;i<balls.length;i++){
							checkBlast(balls[i],i,evt);
						}
				}

				function resizeWindow(evt){
					canvas.height=$(window).height();
					canvas.width=$(window).width();
					duckSave.ducky=canvas.height-75;
					duckSave.draw();
				}

				$(document).mousedown(onMouseDown);

				$(window).blur(function() {
					isPaused=true;
				});

				$(window).focus(function() {
					isPaused=false;
				});
				
				$(document).keydown(function(e){
					if(over){
						return;
					}
					if(e.keyCode==32){
						isPaused=!isPaused;
					}
				})
				$(window).bind("resize",resizeWindow);
			
			
				function checkBlast(ball,i,evt){
					if(Math.pow((evt.pageX - ball.x),2) + Math.pow((evt.pageY - ball.y),2) < Math.pow(ball.r,2)){
						ball.c="#f00";
						setTimeout(function(){
							balls.splice(i,1);
							setPoint();
						},70);
						
					}
				}
				
				function setPoint(){
					points+=10;
				}	
				
				var duckWordsImg=new Image();
				duckWordsImg.src="images/duck0.png";
				
				function collision(){
					for(i=0;i<balls.length;i++){
						if (DuckBallColliding(balls[i],duckSave)==true) {
							balls.splice(i,1);
							lifes--;
							$('#canvas').addClass('hit');
							$('.callout').text(duckWords[Math.floor(Math.random()*3)]);
							$('.callout').addClass('hit');
							
							duckSound.play();
							if(lifes>=1){
							isPaused=true;
							ctx.drawImage(duckWordsImg,W/2-100,H/2,200,200);
							window.setTimeout(function(){
								isPaused=false;
								$('#canvas').removeClass('hit');
								$('.callout').removeClass('hit');
								duckSound.pause();
							},1000);
							}
							if(lifes==0){
								duckSound.play();
								$('#canvas').removeClass('hit');
								$('.callout').removeClass('hit');
								gameOver();
							}
						}
					}
					
				}
				function definelevel(){
					if(points/200-level==0){
						level++;
						lifes+=2;
						forceFactor+=0.05;
						minBall+=1;
						rangeBall+=1;
					}
				}
				function ballgenerator(){
					if(isPaused){
						return ;
					}
					for(var i=75;i<=canvas.width;i=i+(canvas.width/Math.round(Math.random()*minBall+rangeBall))){
						balls.push(new ball(i,50,(Math.random()*100+20)*forceFactor,(Math.random()*100-20)*forceFactor,(20+Math.random()*30),0.9,random_color()));
					}
				}
				function DuckBallColliding(circle,rect){
					var distX = Math.abs(circle.x - rect.duckx-rect.width/2)+15;
					var distY = Math.abs(circle.y - rect.ducky-rect.height/2)+15;

					if (distX > (rect.width/2 + circle.r)) { return false; }
					if (distY > (rect.height/2 + circle.r)) { return false; }

					if (distX <= (rect.width/2)) { return true; } 
					if (distY <= (rect.height/2)) { return true; }

					var dx=distX-rect.width/2;
					var dy=distY-rect.height/2;
					return (dx*dx+dy*dy<=(circle.r*circle.r));
				}
			//Graphics Code
				function circle(x,y,r,c){
					
					var gradient = ctx.createRadialGradient(x, y, 5, x, y, r+10);
					gradient.addColorStop(0, 'white');
					gradient.addColorStop(1, c);4
					ctx.fillStyle=gradient;
					ctx.beginPath();
					ctx.arc(x,y,r,0,2*Math.PI,true);
					
					ctx.fill();
					ctx.closePath();
					

					//stroke styles
					ctx.lineWidth=r*0.1;
					ctx.strokeStyle=c;
					ctx.stroke();
				}

				function random_color(){
					var letters="0123456789ABCDEF".split('');
					var color="#";
					for(var i=0;i<=5;i++){
						color+=letters[Math.round(Math.random()*15)];
					}

					return color;
				}

				function drawball(){
					this.vy+=gravity*0.1;
					this.x+=this.vx*0.1;
					this.y+=this.vy*0.1;
					//move the mall
					if(this.x+this.r>canvas.width){
						this.x=canvas.width-this.r;
						this.vx*=-1*this.b;
					}
					if(this.x-this.r<0){
						this.x=this.r;
						this.vx*=-1*this.b;
					}
					if(this.y+this.r>canvas.height){
						this.y=canvas.height-this.r;
						this.vy*=-1*this.b;
					}
					if(this.y-this.r<0){
						this.y=this.r;
						this.vy*=-1*this.b;
					}
					circle(this.x,this.y,this.r,this.c);
				}
				var img = new Image();

				function drawduck(){
					ctx.beginPath();
					this.duckx+=this.duckvx*0.1;
					if(this.duckx+this.width>canvas.width){
						this.duckvx*=-1;
						this.duckx=canvas.width-75;
						directionOfDuck=1;
					}
					if(this.duckx-50<0){
						this.duckx=50;
						this.duckvx*=-1;
						directionOfDuck=0;
					}
					if(directionOfDuck==0){
						img.src = "images/duck0.png";
					}else{
						img.src = "images/duck1.png";
					}
					ctx.drawImage(img,this.duckx,this.ducky,this.width,this.height); // Or at 
					
				}

			//Objects

				function ball(positionX,positionY,velocityX,velocityY,radius,bounciness,color){
					this.x=positionX;
					this.y=positionY;
					this.vx=velocityX;
					this.vy=velocityY;
					this.r=radius;
					this.b=bounciness;
					this.c=color;

					this.draw=drawball;
				}
				function duck(positionX,positionY,velocityX,velocityY,width,height){
					this.duckx=positionX;
					this.ducky=positionY;
					this.duckvx=velocityX;
					this.duckvy=velocityY;
					this.width=width;
					this.height=height;

					this.draw=drawduck;
				}
			//Game loop
				function game_loop(){
					ctx.clearRect(0,0,canvas.width,canvas.height);
					duckSave.draw();
					for(var i=0;i<balls.length;i++){
						balls[i].draw();
					}
					collision();
					definelevel();
					ctx.save();
					ctx.fillStyle = "white";
					ctx.font = "30px Arial, sans-serif";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.shadowColor = "black";
					ctx.shadowOffsetX = 5; 
					ctx.shadowOffsetY = 5; 
					ctx.shadowBlur = 6;
					ctx.textBaseline = 'alphabetic';
					ctx.scale(1,1);
					ctx.fillText("Score: "+points,W/2,50);
					for(var i=0;i<lifes;i++){
						var duckLife=new duck(W/2-50+i*40,70,0,0,40,40);
						duckLife.draw();
					}
					ctx.fillStyle = "white";
					ctx.fillText("Level: "+level,80,50);
					ctx.restore();
				}

					ctx=$('#canvas')[0].getContext('2d');
					canvas.width=$(window).width();
					canvas.height=$(window).height();
					
				function animloop() {
					init = requestAnimFrame(animloop);
					if(!isPaused){
						game_loop();
					}
				}
					
				
				startBtn.draw();
				function gameOver() {
					ctx.save();
					ctx.beginPath();
					ctx.font = "40px Arial, sans-serif";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.shadowColor = "black";
					ctx.shadowOffsetX = 5; 
					ctx.shadowOffsetY = 5; 
					ctx.shadowBlur = 6;
					ctx.textBaseline = 'alphabetic';
					ctx.scale(1,1);
					ctx.fillStyle="white"
					ctx.fillText("Game Over - You scored "+points+" points!", W/2, H/2 + 50 );
					ctx.restore();
					// Stop the Animation
					backgroundSound.pause();
					cancelRequestAnimFrame(init);
					over=1;
					restartBtn.draw();
				}

	}