import province from './province.service'

class Services {
    constructor() {
        this.province = province
    }
}

export default new Services()