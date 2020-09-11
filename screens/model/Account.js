export class Account{
    constructor(){

    }
    setUserId(uid){
        this.uid = uid;
    }
    getUserId(){
        if(this.uid === null)
            return this.uid;
    }
}