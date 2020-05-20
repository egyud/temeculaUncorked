import React from 'react'
import { render, cleanup } from 'react-native-testing-library'
import GalleryImage from '../../components/GalleryImage'

const image = {
  uri: 'http://res.cloudinary.com/dkoz1ezfx/image/upload/v1578004715/demo/styfpo4frp1kal8wul1c.jpg'
}

afterEach(cleanup)

describe('GalleryImage', () => {
  it('renders an Image', () => {
    const { queryByTestId } = render(<GalleryImage />)
    const element = queryByTestId('gallery-image')

    expect(element).not.toBeNull()
  })
})
