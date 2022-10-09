import { View, Image } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <View 
      style={{
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <Image 
        style={{
            width:200,
            height:100,
            marginVertical:20
        }}
        source={require('./../../assets/logo-tt.png')}
      />
    </View>
  )
}

export default Logo