import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import BodyParts from '../components/BodyParts'
import { COLORS } from '../constants/theme'
import Search from '../components/Search'

export default function Exercise() {
  return (
    <View style = {tw`flex flex-1 pt-20 px-5 bg-[${COLORS.primary}] pb-20`}>
        <Search />
      <BodyParts />
    </View>
  )
}