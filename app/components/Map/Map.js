import React from 'react'
import { mapContainer, mapHeader } from './styles.css'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import { mapbox } from 'config/mapbox'
import { stadiums } from 'data/stadiums'

const s = { height:'40vh', width:'90%' }


const Map = ({ sport }) => (
  <section className={mapContainer}>
    <h1 className={mapHeader}>{`${sport} games`}</h1>
    <ReactMapboxGl {...mapbox} containerStyle={s}>
      <Layer type='symbol' id='marker' layout={{ 'icon-image': 'marker-15' }}>
        { Object.keys(stadiums[sport]).map((item, index) => {
            console.log(stadiums[sport][item])
            return <Feature coordinates={stadiums[sport][item]} key={index} />
          })
        }
      </Layer>
    </ReactMapboxGl>
  </section>
)

export default Map
