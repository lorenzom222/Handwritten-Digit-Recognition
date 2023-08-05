import { Canvas } from './canvas.js';
// driver.js


// Set the canvas options
let canvasId = "canvas";
let canvasWidth = 150;
let canvasHeight = 150;
let canvasStrokeStyle = "white";
let canvasLineJoin = "round";
let canvasLineWidth = 10;
let canvasBackgroundColor = "black";

// Create a new Canvas object
let myCanvas = new Canvas(
  canvasId,
  canvasWidth,
  canvasHeight,
  canvasStrokeStyle,
  canvasLineJoin,
  canvasLineWidth,
  canvasBackgroundColor
);
let canvas = myCanvas.canvas;


//-------------------------------------
// loader for cnn model

let model;
async function loadModel() {
    try {
      console.log("model loading..");
  
      // clear the model variable
      model = undefined;
      
      // load the model using a HTTPS request (where you have stored your model files)
      model = await tf.loadLayersModel("json-model/model.json");
      
      console.log("model loaded..");
    } catch (error) {
      // Display an error message on the screen
      let errorMessage = "An error occurred while loading the model: " + error.message;
    //   document.getElementById('error-message').textContent = errorMessage;
    }
  }
  
  
  loadModel();
  
  //-----------------------------------------------
// preprocess the canvas
//-----------------------------------------------
function preprocessCanvas(image) {
    // resize the input image to target size of (1, 28, 28)
    let tensor = tf.browser.fromPixels(image)
      .resizeNearestNeighbor([28, 28])
      .mean(2)
      .expandDims(2)
      .expandDims()
      .toFloat();
    console.log(tensor.shape);
  
    // remove dimensions of size 1 from the tensor
    tensor = tensor.squeeze([-1]);

    console.log(tensor.shape);
  
    return tensor.div(255.0);
  }
  

//--------------------------------------------
// predict function 
//--------------------------------------------
$("#predict-button").click(async function () {
    // get image data from canvas
	var imageData = canvas.toDataURL();

	// preprocess canvas
	let tensor = preprocessCanvas(canvas);

	// make predictions on the preprocessed image tensor
	let predictions = await model.predict(tensor).data();

	// get the model's prediction results
	let results = Array.from(predictions);

	// display the predictions in chart
	$("#result_box").removeClass('d-none');


	console.log(results);
});