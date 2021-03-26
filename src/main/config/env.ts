export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/clean-node-api',
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || 'aa00faf97d042c13a59da4d27eb32358'
}
