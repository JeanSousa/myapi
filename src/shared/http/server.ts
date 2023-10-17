class AppServer {
    // propriedade app tipada como string
    private app: string 

    constructor(info: string) {
        this.app = info ?? 'Ola dev'
    }
}