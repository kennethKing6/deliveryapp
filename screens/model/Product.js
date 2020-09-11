import {IN_STOCK} from './Constants/ProductConstant';
import {OUT_STOCK} from './Constants/ProductConstant';
import {DEALS} from './Constants/ProductConstant';
import firebase from "@react-native-firebase/app";



export class Product{

    //References
    userOwnerRef;
    productKeyRef;
    productQueryRef ;
    productReviewsRef;


    productState;

    //Product Ratings variables
    positiveProductRating;
    negativeProductRating;
    totalProductRating;

    //Product properties
    productCategory;
    productName;
    productDescription;
    productPrice;
    locationArray;


    constructor(userId,key,queryRef,reviewsRef){
        this.userOwnerRef = userId;
        this.productKeyRef = key;
        this.productQueryRef = queryRef;
        this.productReviewsRef = reviewsRef;
        this.productState = IN_STOCK;

        //Initialize Product ratings
        this.positiveProductRating = 0;
        this.negativeProductRating = 0;
        this.totalProductRating = 0;
    }

    setCategory(category){
        this.category = category;
    }
    getCategory(){
        if(this.category == undefined){
            return this.category;
        }else{
            return null;
        }
    }
    //When you delete a product. You need to delete everything there
    //is about a product in the database
    deleteProduct(){
    }

    
    setProductWeight(weight){
        this.weight = weight;
    }
    setProductDescrition(description){
        this.description = description;
    }


    //Product Rating
    addPositiveProductRating(){
        var path = this.ref + "/positiveProductRating";
        var positiveProductRating = firebase.database().ref(path);
        positiveProductRating.transaction(function(productRating) {
            // If users/ada/rank has never been set, currentRank will be `null`.
            return productRating + 1;
          });
       
          var totalProductRatingPath = this.ref + "/totalProductRating";
          totalProductRatingPath.transaction(function(productRating) {
            // If users/ada/rank has never been set, currentRank will be `null`.
            return productRating + 1;
          });

    }
    getPositiveProductRating(){
        var path = this.ref + "/positiveProductRating";
        var ref = firebase.database().ref(path);
        return ref.on("value",(dataSnapshot)=>{

           return dataSnapshot;
       });
    }
    addNegativeProductRating(){
        var path = this.ref + "/negativeProductRating";
        var negativeProductRating = firebase.database().ref(path);
        negativeProductRating.transaction(function(productRating) {
            // If users/ada/rank has never been set, currentRank will be `null`.
            return productRating + 1;
          });

          var totalProductRatingPath = this.ref + "/totalProductRating";
          totalProductRatingPath.transaction(function(productRating) {
            // If users/ada/rank has never been set, currentRank will be `null`.
            return productRating + 1;
          });
        
    }
    getNegativeProductRating(){
        var path = this.ref + "/negativeProductRating";
        var ref = firebase.database().ref(path);
        return ref.on("value",(dataSnapshot)=>{

           return dataSnapshot;
       });
    }
    
    getTotalProductRating(){
        var path = this.ref + "/totalProductRating";
        var ref = firebase.database().ref(path);
        return ref.on("value",(dataSnapshot)=>{

           return dataSnapshot;
       });
    }

    setProductDescription(){
        var path = this.ref + "/positiveProductRating";
        var positiveProductRating = firebase.database().ref(path);
    }

    addProductQuery(){

    }

    addProductReview(){
        
    }

    //Product Properties
    setProductCategory(category){
        
    }
    getProductCategory(){}

    getProductName(){}
    setProductName(){}

    setProductPrice(){}
    getProductPrice(){}

    setProductPrice(){}
    getProductPrice(){}

    //These methods only accept an array
    setProductLocation(locationArray){
        if(Array.isArray(locationArray)){

        }
    }
    getProductLocation(){}
}
