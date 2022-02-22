class DataHandler {
    constructor() {
        this.origemIda = '';
        this.destinoIda = '';
        this.dataIda = '';
        this.origemVolta = '';
        this.destinoVolta = '';
        this.dataVolta = '';
        this.assento = '';
        this.assentoID = 0;
        this.viagemID = 0;
        this.accessToken = '';
        this.refreshToken = '';
        this.userID = '';
    };

    getOrigemIda() {
        return this.origemIda;
    };

    setOrigemIda(origemIda){
        this.origemIda = origemIda;
    };

    getDestinoIda() {
        return this.destinoIda;
    };

    setDestinoIda(destinoIda){
        this.destinoIda = destinoIda;
    };

    getDataIda() {
        return this.dataIda;
    };

    setDataIda(dataIda){
        this.dataIda = dataIda;
    };

    getOrigemVolta() {
        return this.origemVolta;
    };

    setOrigemVolta(origemVolta){
        this.origemVolta = origemVolta;
    };

    getDestinoVolta() {
        return this.destinoVolta;
    };

    setDestinoVolta(destinoVolta){
        this.destinoVolta = destinoVolta;
    };

    getDataVolta() {
        return this.dataVolta;
    };

    setDataIda(dataVolta){
        this.dataVolta = dataVolta;
    };

    getAccessToken() {
        return this.accessToken;
    };

    setAccessToken(accessToken){
        this.accessToken = accessToken;
    };

    getRefreshToken() {
        return this.refreshToken;
    };

    setRefreshToken(refreshToken){
        this.refreshToken = refreshToken;
    };

    getUserID() {
        return this.userID;
    };

    setUserID(userID){
        this.userID = userID;
    };

    getAssentoID() {
        return this.assentoID;
    };

    setAssentoID(assentoID){
        this.assentoID = assentoID;
    };

    getAssento() {
        return this.assento;
    };

    setAssento(assento){
        this.assento = assento;
    };
}

export default DataHandler;