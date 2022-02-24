class DataHandler {
    constructor() {
        this.origem = '';
        this.destino = '';
        this.data = '';
        this.assento = '';
        this.assentoID = '';
        this.viagemID = '';
        this.accessToken = '';
        this.refreshToken = '';
        this.userID = '';
    };

    getOrigem() {
        return this.origem;
    };

    setOrigem(origem){
        this.origem = origem;
    };

    getDestino() {
        return this.destino;
    };

    setDestino(destino){
        this.destino = destino;
    };

    getData() {
        return this.data;
    };

    setData(data){
        this.data = data;
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

    getViagemID() {
        return this.viagemID;
    };

    setViagemID(viagemID){
        this.viagemID = viagemID;
    };
}

export default DataHandler;