import app from './app.js';
import { connectDatabase } from './db/connections.js';
const PORT = process.env.PORT || 3000;

connectDatabase().then(() => {
    app.listen(PORT, () => console.log("Server is running on Port 3000 & connected to DataBase"));
}).catch((err) => console.log(err));

