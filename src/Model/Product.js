import productState from './Constants/ProductStateConstant';
import firebase from "@react-native-firebase/app";



export class Product{

    
    constructor(userId){

       
      this.userId = userId;
       
    }

    async initProductRef(){
      this.key = await firebase.database().ref("users/" + this.userId + "/products").push().key;
      this.userOwnerRef = this.userId;

      this.productKeyRef = this.key;


      this.ref =  "users/" + this.userOwnerRef + "/products/" + this.key;



      //Initialize Tags
      this.tags = {};
      return;
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
   async initProductProperties(productCategory,productName,productDescription,productLocation,productPrice,url){

        await firebase.database().ref(this.ref + "/properties").set({
            productCategory: productCategory,
            productName: productName,
            productDescription : productDescription,
            productLocation: productLocation,
            productPrice: productPrice,
            productState : productState.IN_STOCK,
            url : url

          }).then(()=>{}).catch(()=>{console.log("failed to set product properties")})
          
          this.initProductSearchQueries({
            user: this.userOwnerRef,
            productKey :this.productKeyRef,
            productRef: this.ref,
            productCategory: productCategory,
            productName: productName,
            productDescription : productDescription,
            productLocation: productLocation,
            productPrice: productPrice,
            productState : productState.IN_STOCK

          }).then(()=>{}).catch(()=>{console.log("failed to init product querries")})
         this.properties ={
            productCategory: productCategory,
            productName: productName,
            productDescription : productDescription,
            productLocation: productLocation,
            productPrice: productPrice,
            productState : productState.IN_STOCK


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
            productState : productState.IN_STOCK

          }
    }

   

    async initProductRatings(){
       await firebase.database().ref(this.ref + "/rating").set({
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

    async initProductSearchQueries(querries){
        var reference = firebase.database().ref("all_products").push();
        var key =  reference.key;
        await reference.set(querries);
        await firebase.database().ref(this.ref + "/productReference").set({
          // If users/ada/rank has never been set, currentRank will be `null`.
         
          productQueryRef:"all_products/" + key,
          userID: this.userOwnerRef,
          productKey: this.key,
          productPathRef: this.ref
        });
        this.productQueryRef =  "all_products/" + key;
        this.productTags = "tags"
          
    }
    addProductTag(productTag){

        if(typeof productTag === 'string'){
            this.tags[productTag] = productTag;
        }
    }
    async uploadProductQueryTag(){
      
            await firebase.database().ref(this.ref + "/tags").set(this.tags);
            await firebase.database().ref( this.productTags).set(this.tags);

        
      
    }

   

    //Set product properties
    async setProductProperties(productObject){
        await firebase.database().ref(this.ref + "/properties").set(productObject);
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
    setProductKey(key){
      this.productKeyRef = key;
    }

    uploadProductFileMeta(metadata){
      return new Promise((resolve,reject)=>{

      if (metadata != null){
            var path = this.ref + "/productFileMetadata";
            resolve(firebase.database().ref(path).set(metadata))
        }else{
            reject("failed to load product metadata")
        }
    })

    }
}
