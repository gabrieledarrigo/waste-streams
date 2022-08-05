export default () => ({
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://user:password@localhost:27017/wasteStreams?authSource=admin',
  },
});
