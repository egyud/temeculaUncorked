import React from 'react'
import { View, StyleSheet } from 'react-native'
import { List, ListItem, Left, Right, Body, Thumbnail, Text } from 'native-base'
import { Rating } from 'react-native-ratings' 

export default RatingsList = ({ ratings }) => {

  if (ratings && ratings.length > 0) {
    return (
      <List style={styles.ratingListItem}>
        {ratings.map(rating => (
          <ListItem
            testID="ratings-list-item"
            key={`${rating.wineId.name}-${rating.rating}`} 
            style={styles.ratingListItem}>
            <Left>
              <Text>{rating.wineId.name}-{rating.wineId.winery}</Text>
            </Left>
            <Right>
              <Rating
                readonly={true} 
                startingValue={rating.rating}
                imageSize={18}
                type="custom"
                ratingColor="#99ff99"
              />
            </Right>
          </ListItem>
        ))}
      </List>
    )
  } else {
    return (
      <View>
        <Text>This user has no ratings to display</Text>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  ratingListItem: {
    backgroundColor: '#fff',
    paddingLeft: 0,
    marginLeft: 2
  }
})