import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import BodyParts from '../components/BodyParts'

export default function Exercise() {
  return (
    <View style = {tw`flex-1`}>
      <BodyParts />
    </View>
  )
}