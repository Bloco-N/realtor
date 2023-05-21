import axios from 'axios'

export class GeoApiService{

  public async listAllCities(){

    const {data:cities} = await axios.get('https://json.geoapi.pt/municipios')

    return cities
  
  }

  public async getCityByZipCode(zipCode:string){

    const {data:city} = await axios.get('https://json.geoapi.pt/cp/' + zipCode)

    return city['Distrito']

  }

}