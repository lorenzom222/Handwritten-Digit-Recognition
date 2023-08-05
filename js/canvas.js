// canvas.js
export class Canvas {
	constructor(canvasId, canvasWidth, canvasHeight, canvasStrokeStyle, canvasLineJoin, canvasLineWidth, canvasBackgroundColor) {
	  this.canvasId = canvasId;
	  this.canvasWidth = canvasWidth;
	  this.canvasHeight = canvasHeight;
	  this.canvasStrokeStyle = canvasStrokeStyle;
	  this.canvasLineJoin = canvasLineJoin;
	  this.canvasLineWidth = canvasLineWidth;
	  this.canvasBackgroundColor = canvasBackgroundColor;
  
	  this.clickX = new Array();
	  this.clickY = new Array();
	  this.clickD = new Array();
	  this.drawing;
  
	  this.createCanvas();
	}
  
	createCanvas() {
	  var canvasBox = document.getElementById('canvas_box');
	  var canvas = document.createElement("canvas");
	  this.canvas = canvas;

  
	  canvas.setAttribute("width", this.canvasWidth);
	  canvas.setAttribute("height", this.canvasHeight);
	  canvas.setAttribute("id", this.canvasId);
	  canvas.style.backgroundColor = this.canvasBackgroundColor;
	  canvasBox.appendChild(canvas);
	  if (typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	  }
  
	  this.ctx = canvas.getContext("2d");
  
	  // Add event listeners
	  $("#canvas").mousedown((e) => {
		var rect = canvas.getBoundingClientRect();
		var mouseX = e.clientX - rect.left;;
		var mouseY = e.clientY - rect.top;
		this.drawing = true;
		this.addUserGesture(mouseX, mouseY);
		this.drawOnCanvas();
	  });
  
	  $("#canvas").mousemove((e) => {
		if (this.drawing) {
		  var rect = canvas.getBoundingClientRect();
		  var mouseX = e.clientX - rect.left;;
		  var mouseY = e.clientY - rect.top;
		  this.addUserGesture(mouseX, mouseY, true);
		  this.drawOnCanvas();
		}
	  });
  
	  $("#canvas").mouseup((e) => {
		this.drawing = false;
	  });
  
	  $("#canvas").mouseleave((e) => {
		this.drawing = false;
	  });
  
	  $("#clear-button").click(async () => {
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.clickX = new Array();
		this.clickY = new Array();
		this.clickD = new Array();
		$(".prediction-text").empty();
		$("#result_box").addClass('d-none');
	  });
	}
  
	addUserGesture(x, y, dragging) {
	  this.clickX.push(x);
	  this.clickY.push(y);
	  this.clickD.push(dragging);
	}
  
	drawOnCanvas() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	  
		this.ctx.strokeStyle = this.canvasStrokeStyle;
		this.ctx.lineJoin = this.canvasLineJoin;
		this.ctx.lineWidth = this.canvasLineWidth;
	  
		for (var i = 0; i < this.clickX.length; i++) {
		  this.ctx.beginPath();
		  if (this.clickD[i] && i) {
			this.ctx.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
		  } else {
			this.ctx.moveTo(this.clickX[i] - 1, this.clickY[i]);
		  }
		  this.ctx.lineTo(this.clickX[i], this.clickY[i]);
		  this.ctx.closePath();
		  this.ctx.stroke();
		}
	  }
	  
  }
  
  