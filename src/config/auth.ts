// Arquivo de configuração JWT
// foi criado um subpath no tsconfig.json para facilitar o import
export default {
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    }
}