const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title :{
          type : String,
          required : true
          },
    description : String,
    image : {
       type : String,
       default : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiLR7-DRcTKgY6RvbySJpr7xJbSjXKYVBzQRsNJdIDDiDkx1Lnel8Wuhr0RDX9wr5BJ2eR-lsJYb_2cPz13_q60DLUwnookLQLUoaY6sWtJRBF0vtkpxxdXDb7AQsimOQbfa6iZyfg7klvj/s1600/simple-beautiful-house.jpg",
       set : (v)=> v=== "" ? "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiLR7-DRcTKgY6RvbySJpr7xJbSjXKYVBzQRsNJdIDDiDkx1Lnel8Wuhr0RDX9wr5BJ2eR-lsJYb_2cPz13_q60DLUwnookLQLUoaY6sWtJRBF0vtkpxxdXDb7AQsimOQbfa6iZyfg7klvj/s1600/simple-beautiful-house.jpg" : v,
           },
    price : Number,
    location : String,
    country : String

});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
