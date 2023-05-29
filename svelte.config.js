import adapter from '@sveltejs/adapter-node';
 
export default {
  kit: {
    adapter: adapter({
      // See below for an explanation of these options
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    })
  },
  files:{
      assets:'./public'
  },
  app: {
    // Use the exported app object as the server instance
    listen: false,
    instance: './server.js'
  }
};
