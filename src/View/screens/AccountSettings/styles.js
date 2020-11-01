import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },

    TopNav: {
        backgroundColor: 'white',
        width: '90%',
        height: 'auto',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: "center", 
        justifyContent: 'space-between'
    },
    icon1: {
        color: "#2ecc71",
        fontSize: 25,

    },

    heyShahbek: {
        color: "#121212",
        width: '90%',
        alignSelf: "center",
        fontSize: 30,
        fontWeight:'900',
        marginTop: 15,
    },
    settingsOptions: {
        width: "100%",
        height: "auto",
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 25
    },
    settings: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        marginBottom:10

    },
    accSett: {
        width: '90%',
        color: "#121212",
        marginBottom: 10,
        fontSize: 25
    },
    settingOpts: {

        width: '90%',
        height: 'auto',
        justifyContent: "space-between"
    },
    personal: {
    
        height: 35,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    personalInformation: {
        
        color: "#121212",
        fontSize: 17,
        marginLeft:10
    },

    centeredView: {
        flex:1,
        // backgroundColor: '#00000099',
              
        
      },
      centeredView2: {
        flex:1,
        
        // backgroundColor: '#00000099',
        justifyContent: "center",
        alignItems: "center",        
        
      },
      
      
      modalView: {
        width:'80%',
        height:'60%',
        padding:20,
        justifyContent:'space-between',
        backgroundColor: "#f5f7f8",
        borderRadius: 20,
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