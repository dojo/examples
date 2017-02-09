import router from './routes';
import app from './App';

app.append().then(() => router.start());
