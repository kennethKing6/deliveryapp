import {IN_STOCK} from './Constants/ProductConstant';
import firebase from "@react-native-firebase/app";



export class Product{

    

    

    constructor(userId){

        var key = firebase.database().ref("users/" + userId + "/products").push().key;
        this.userOwnerRef = userId;
        this.productKeyRef = key;
        this.ref =  "users/" + this.userOwnerRef + "/products/" + key;

        //Initialize Tags
        this.tags = {};
    }

    
    deleteProduct(){
        firebase.database().ref(this.ref).remove();
    }

 


    //Product Rating
    addPositiveProductRating(){
        var path = this.ref + "rating/positiveProductRating";
        var positiveProductRating = firebase.database().ref(path);
        positiveProductRating.transaction(function(productRating) {
            // If users/ada/rank has never been set, currentRank will be `null`.
            return productRating + 1;
          });
       
          var totalProductRatingPath = this.ref + "rating/totalProductRating";
          firebase.database().ref(totalProductRatingPath).transaction(function(productRating) {
            // If users/ada/rank has never been set, currentRank will be `null`.
            return productRating + 1;
          });

    }
 
    addNegativeProductRating(){
        var path = this.ref + "rating/negativeProductRating";
        var negativeProductRating = firebase.database().ref(path);
        negativeProductRating.transaction(function(productRating) {
            // If users/ada/rank has never been set, currentRank will be `null`.
            return productRating + 1;
          });

          var totalProductRatingPath = this.ref + "rating/totalProductRating";
          firebase.database().ref(totalProductRatingPath).transaction(function(productRating) {
            // If users/ada/rank has never been set, currentRank will be `null`.
            return productRating + 1;
          });
        
    }
    
    
    getProductRating(){
        var path = this.ref + "/rating";
        var ref = firebase.database().ref(path);
        return ref.on("value",(dataSnapshot)=>{

           return dataSnapshot;
       });
    }

    //Initialize product object
    
  initProductReference(){
    firebase.database().ref(this.ref + "/productReference").set({
        userID: this.userOwnerRef,
        productKey: this.productKeyRef,
        productPathRef: this.ref
      });
  }

    /**
     * This method is used to initialize the product properties and
     * ratings ref when product is first
     * registered
     * @param {*} productCategory 
     * @param {*} productName 
     * @param {*} productDescription 
     * @param {*} productLocation 
     * @param {*} productPrice 
     */
    initProductProperties(productCategory,productName,productDescription,productLocation,productPrice){

        firebase.database().ref(this.ref + "/properties").set({
            productCategory: productCategory,
            productName: productName,
            productDescription : productDescription,
            productLocation: productLocation,
            productPrice: productPrice,
            productState : IN_STOCK

          });
          
          this.initProductSearchQueries({
            user: this.userOwnerRef,
            productKey :this.productKeyRef,
            productRef: this.ref,
            productCategory: productCategory,
            productName: productName,
            productDescription : productDescription,
            productLocation: productLocation,
            productPrice: productPrice,
            productState : IN_STOCK

          })
         this.properties ={
            productCategory: productCategory,
            productName: productName,
            productDescription : productDescription,
            productLocation: productLocation,
            productPrice: productPrice,
            productState : IN_STOCK

          };
          this.searchQueries = {
            user: this.userOwnerRef,
            productKey :this.productKeyRef,
            productRef: this.ref,
            productCategory: productCategory,
            productName: productName,
            productDescription : productDescription,
            productLocation: productLocation,
            productPrice: productPrice,
            productState : IN_STOCK

          }
    }

   

    initProductRatings(){
        firebase.database().ref(this.ref + "/rating").set({
            negativeProductRating: 0,
            positiveProductRating: 0,
            totalProductRating : 0
          });

          this.ratings = {
            negativeProductRating: 0,
            positiveProductRating: 0,
            totalProductRating : 0
          };
    }

    initProductSearchQueries(querries){
        var key = firebase.database().ref("all_products").push().set(querries).key;
        firebase.database().ref(this.ref + "/productReference").set({productQueryRef: "all_products/" + key});
        this.productQueryRef =  "all_products/" + key;
          
    }
    addProductTag(productTag){

        if(typeof productTag === 'string'){
            this.tags[productTag] = productTag;
        }
    }
    uploadProductQueryTag(){
      
        if(Object.keys(this.tags).length !== 0 && this.productQueryRef !== undefined){
            firebase.database().ref(this.ref + "/tags").set(this.tags);
            firebase.database().ref( this.productQueryRef).set(this.tags);

        }

    }

   

    //Set product properties
    setProductProperties(productObject){
        firebase.database().ref(this.ref + "/properties").set(productObject);
    }

    
    getProductProperties(){
        return this.properties;
    }
    getRatings(){
        return this.ratings;
    }

    getProductTags(){
        return this.tags;
    }
}
