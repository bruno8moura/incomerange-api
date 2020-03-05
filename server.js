const { app } = require('./config/app');
const PORT = 'port';

app.set(PORT, process.env.PORT || 3000);

app.listen(app.get(PORT), () => {
    console.log( `Server listening on port ${ app.get(PORT) }` );
});