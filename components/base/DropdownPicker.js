import { View } from 'react-native'
import React from 'react'
import Text from '@kaloraat/react-native-text';
import {Picker} from '@react-native-picker/picker';

const DropdownPicker = ({title, data, value, setValue}) => {
  return (
    <View>
      <Text semi>{title}</Text>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) =>
          setValue(itemValue)
        }
        style={{
            height:48,
            marginBottom:10,
          }}
      >
        { data.map((item, key)=>(
          <Picker.Item label={item.label} value={item.value} key={key} />) 
        )}
      </Picker>
    </View>
  )
}

export default DropdownPicker