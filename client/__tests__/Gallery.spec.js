import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import Gallery from '../screens/Gallery'

const navigation = {
  navigate: jest.fn(),
  getParam: (param) => {
    let data = {
      images: [
        {
          _id: 1,
          winery: {
            _id: 1,
          },
          url: 'hello.com',
          user: {
            _id: 1,
            name: 'andy'
          }
        },
        {
          _id: 2,
          winery: {
            _id: 1,
          },
          url: 'hello.com/world',
          user: {
            _id: 2,
            name: 'joe'
          }
        }
      ],
      wineryData: {
        _id: 1,
        name: 'Doffo Winery'
      },
      user: {
        _id: 1,
        name: 'Andy'
      },
      isAuthenticated: true
    }
    return data[param]
  }
}

const navigationWithoutImages = {
  navigate: jest.fn(),
  getParam: (param) => {
    let data = {
      images: [],
      wineryData: {
        _id: 1,
        name: 'Doffo Winery'
      },
      user: {
        _id: 1,
        name: 'Andy'
      },
      isAuthenticated: true
    }
    return data[param]
  }
}

afterEach(cleanup)

describe('Gallery', () => {
  it('renders a GalleryImage component for every image passed in', () => {
    const { queryAllByTestId } = render(<Gallery navigation={navigation}/>)
    const images = queryAllByTestId('gallery-image')

    expect(images.length).toBe(navigation.getParam('images').length)
  })
})