const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const{isLoggedIn,isOwner}=require("../middleware.js");
const {validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
.get(wrapAsync(listingController.index)) //index.route
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing)); //create route


//new Route-
router.get("/new", isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));



//Edit Route-
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

// router.post("/",validateListing,wrapAsync(async(req,res,next)=>{
   
//        //let{title,description,image,price,country,location}=req.body; 
//        // let listing=req.body.listing;
//        // //it check whether req .body statisfy condition in listing schema.
//        // let result=listingSchema.validate(req.body);
//        // console.log(result);
//        // if(result.error){
//        //     throw new ExpressError(400,result.error);
//        // }
//        const newListing=await new Listing(req.body.listing).save();
//        //console.log(listing);
//        res.redirect("/listings");
   
//    }));



//Edit Route-


// router.get("/:id/edit",wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     const listing=await Listing.findById(id);
//     res.render("listings/edit.ejs",{listing});
// }));


// //Update route


// router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
//     if(!req.body.listing){
//         throw new ExpressError(404,"Send Valid data for Listing");
//     }
//     let {id}=req.params;
//     await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect(`/listings/${id}`);
// }));

module.exports=router;