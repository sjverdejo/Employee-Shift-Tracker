import config from './config.js';
import app from './app.js';
app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});
