import { FeatureLayer, TiledMapLayer, DynamicMapLayer } from 'esri-leaflet'
import Services from '../services/endpoints'

const mapData = new Services()

export default function esriFeatureLayer() {
  return new FeatureLayer({
    url: mapData.alerts().url,
    style: function () {
      return { 
        color: 'white',
        weight: 2,
        opacity: 0.3,
        fillOpacity: 0.4 
      }
    }
  })
}

function esriTiledMapLayer() {
  return new TiledMapLayer({
    url: mapData.evacuation(),
    opacity: 0.7,
    minZoom: 6
  })
}

function esriDynamicMapLayer() {
  return new DynamicMapLayer({

  })
}

export { esriTiledMapLayer, esriDynamicMapLayer }