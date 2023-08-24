import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { constantStyles } from '../constants'

const ShortsSection = () => {
  return (
    <View style={[constantStyles.container,{backgroundColor:"#2f2f2f",borderRadius:10}]}>
      <Text>ShortsSection</Text>
    </View>
  )
}

export default ShortsSection

const styles = StyleSheet.create({})