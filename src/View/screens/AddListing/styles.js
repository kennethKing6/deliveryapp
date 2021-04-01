import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },

    TextOverlay: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
    },
    
    AddPhotos: {
        height: 300,
        width: '100%',
        marginBottom: 10,
        
    },

    
    inner: {
        width: '100%',
        height: '100%',
        
        
    },
    tags: {
        fontSize:20,fontWeight:'200',padding:8,backgroundColor:'dodgerblue',borderRadius:18,overflow:'hidden',marginLeft:5,marginRight:5,color:'white'
    }
    ,
    centeredView: {
        flex:1,
        // backgroundColor: '#00000099',
            
        
    },
    centeredView2: {
        flex:1,
        marginBottom:30,
        justifyContent: "flex-end",
        alignItems: "center",        
        
    },
    modalView: {
        width:'90%',
        height:'auto',
        padding:15,
        justifyContent:'space-between',
        backgroundColor: "#f5f7f8",
        borderRadius: 30,
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
      },
      openButton: {
        width:30,
        borderRadius: 30,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontSize:30,
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        fontSize:30,
        fontWeight:'600',
        textAlign: "center"
      },
      absolute: {
        position:'absolute',
        width: '100%',
        height:'100%',
      }
   
    

    
   

});