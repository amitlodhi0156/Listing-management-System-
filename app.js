const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");
const { listingSchema } = require("./schema.js");

MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected succssfully");
}).catch((err)=>{
console.log(err);
});

async function  main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")))

app.get("/", async (req , res)=>{
    res.send("hi amit how are you")
});

// const validateListing = (req, res ,next)=>{
//     let result = listingSchema.validate(req.body);
//     console.log(result);
//     if(result.error){
//         throw new expressError(400, result.error);
//     }
// }



/// index route
app.get("/listings", wrapAsync (async (req,res)=>{

 let allListings =   await Listing.find({});
 res.render("listings/index.ejs", {allListings});

}
));

// New & Create Route
app.get("/listings/new", wrapAsync(async (req, res) => {
    res.render("listings/new.ejs")

}
));

// Create New Listing
app.post("/listings" , wrapAsync(async (req, res , next )=>{
    if(!req.body.listing){
        throw new expressError(400 , "send the valid listing")
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})
    );

// show route
app.get("/listings/:id", wrapAsync(async (req, res)=>{
    let  { id }   = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
   

}
));





// Edit Route 
app.get("/listings/:id/edit",wrapAsync( async (req,res)=>{
    let  { id }   = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",  {listing});
}
));


//Update route
// Update route
app.put("/listings/:id", wrapAsync(async (req, res) => {
    if(!(req.body.listing)){
        throw new expressError(404 ," send valid data for listing")
    } 

    let  id  = req.params.id;

    let data = await Listing.findByIdAndUpdate(id, {...req.body.listing }, { new: true });
    res.redirect(`/listings/${id}`);
}));


//delete Route
app.delete("/listings/:id", wrapAsync(async (req,res)=>{
let {id }= req.params;
 await Listing.findByIdAndDelete(id);
res.redirect("/listings");
}
));


app.get("/testListing", wrapAsync(async (req, res)=>{
      let sampleListing = new Listing({
        title : "My Home",
        description : "by the beach",
        price : 120000,
        location : "hirawal",
        countery : 'india'
      });

     await sampleListing.save().then(()=>{
        res.send("listing sample saved")
      }).catch(()=>{
   res.send("some error accured")
      });
}
));

app.all("*" , (req, res , next)=>{
 next(new expressError(404 , "page not found!!"));
});


app.use((err , req , res , next) =>{
  let {statusCode = 500 , message = "something went wrong"} = err;
  res.status(statusCode).render("error.ejs",{err});
//   res.status(statusCode).send(message);
});


app.listen(8080 ,()=>{
    console.log("server is listening at 8080");
} );







