import React from 'react'
import { View, StyleSheet } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'
import { Rating } from 'react-native-ratings' 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default RatingsList = ({ ratings }) => {

  if (ratings && ratings.length > 0) {
    return (
      <List testID="ratings-list" style={styles.ratingListItem}>
        {ratings.map(rating => (
          <ListItem
            testID="ratings-list-item"
            key={`${rating.wineId.name}-${rating.rating}`} 
            style={styles.ratingListItem}>
            <Left>
              <Text style={styles.text}>{rating.wineId.name}-{rating.wineId.winery}</Text>
            </Left>
            <Right>
              <Rating
                readonly={true} 
                startingValue={rating.rating}
                imageSize={18}
                type="custom"
                ratingColor='#fcf1d2'
              />
            </Right>
          </ListItem>
        ))}
      </List>
    )
  } else {
    return (
      <View>
        <Text style={styles.text}>This user has no ratings to display</Text>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  ratingListItem: {
    backgroundColor: '#fff',
    paddingLeft: 0,
    marginLeft: 2
  },
  text: {
    fontSize: hp('1.6%')
  }
})