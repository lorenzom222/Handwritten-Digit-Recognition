class CanvasModelLoader {
    constructor() {
      this.model = undefined;
    }
  
    async loadModel() {
      console.log("Model loading..");
      // clear the model variable
      this.model = undefined;
      // load the model using a HTTPS request (where you have stored your model files)
      this.model = await tf.loadLayersModel("models/model.json");
      console.log("Model loaded..");
    }
  
    preprocessCanvas(image) {
      // resize the input image to target size of (1, 28, 28)
      let tensor = tf.browser
        .fromPixels(image)
        .resizeNearestNeighbor([28, 28])
        .mean(2)
        .expandDims(2)
        .expandDims()
        .toFloat();
      return tensor.div(255.0);
    }
  
    async predict() {
      // get image data from canvas
      var imageData = document.getElementById("canvas").toDataURL();
  
      // preprocess canvas
      let tensor = this.preprocessCanvas(document.getElementById("canvas"));
  
      // make predictions on the preprocessed image tensor
      let predictions = await this.model.predict(tensor).data();
  
      // get the model's prediction results
      let results = Array.from(predictions);
  
      // display the predictions as text
      $(".prediction-text").empty();
      $(".prediction-text").text(this.formatPredictionResults(results));
  
      // Show the result box
      $("#result_box").removeClass("d-none");
  
      console.log(results);
    }
  
    formatPredictionResults(results) {
      // Implement this method to format the prediction results as desired
      // For example, you can find the index with the highest probability and return it as the predicted class.
      // Replace this implementation with your specific requirement.
      const maxIndex = results.indexOf(Math.max(...results));
      return `Predicted Class: ${maxIndex}`;
    }
  }
  
  // Usage in driver.js:
  // import { CanvasModelLoader } from "./load_model.js";
  // const modelLoader = new CanvasModelLoader();
  // await modelLoader.loadModel();
  