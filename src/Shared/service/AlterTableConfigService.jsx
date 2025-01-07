import Endpoints from '../constants/Endpoints'
class AlterTableConfigService {

  constructor(httpClient) {
    this.httpClient = httpClient
  }

  insertTable(data) {
    try {
      const res = this.httpClient.Alter(Endpoints.alterTableUrl('insert'), data)
      return res
    } catch(error) {
      console.log(error)
      throw error
    }
  }

  deleteTable(data) {
    try {
      const res = this.httpClient.Alter(Endpoints.alterTableUrl('delete'), data)
      return res
    } catch(error) {
      console.log(error)
      throw error
    }
  }

  renameTable(data) {
    try {
      const res = this.httpClient.Alter(Endpoints.alterTableUrl('rename'), data)
      return res
    } catch(error) {
      console.log(error)
      throw error
    }
  }
  
  insertColumn(data) {
    try {
      const res = this.httpClient.Alter(Endpoints.alterColumnUrl('insert'), data)
      return res
    } catch(error) {
      console.log(error)
      throw error
    }
  }

  deleteColumn(data) {
    try {
      const res = this.httpClient.Alter(Endpoints.alterColumnUrl('delete'), data)
      return res
    } catch(error) {
      console.log(error)
      throw error
    }
  }

  renameColumn(data) {
    try {
      const res = this.httpClient.Alter(Endpoints.alterColumnUrl('rename'), data)
      return res
    } catch(error) {
      console.log(error)
      throw error
    }
  }
}

export default AlterTableConfigService