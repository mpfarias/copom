const ARI = require('./node-ari-client');

ARI.connect('http://10.222.1.200:8088', 'asterisk', 'hefesto123')
  .then((client) => {
    client.on('StasisStart', (event, channel) => {
      channel.answer()
        .then(() => {
          return channel.play({media: 'sound:hello-world'});
        });
    });
    console.log("Conectado Asterisk")
    client.start('myApp');
  })
  .catch((err) => {
    console.error('Error connecting to ARI', err);
  });
