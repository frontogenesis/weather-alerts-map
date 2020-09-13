export default class Services {

  urlPrefix(service) {
    const serviceUrls = {
      nws: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/',
      nowcoast: 'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast',
      esri: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/',
      florida: 'https://tiles.arcgis.com/tiles/3wFbqsFPLeKqOlIK/arcgis/rest/services/'
    }
    return serviceUrls[service]
  }

  alerts() {
    return {
      url: `${this.urlPrefix('esri')}NWS_Watches_Warnings_v1/FeatureServer/6`,
      type: 'FeatureLayer'
    }
  }

  evacuation() {
    return this.urlPrefix('florida') + 'Evacuation_Zones_Cached/MapServer'
  }
  
}