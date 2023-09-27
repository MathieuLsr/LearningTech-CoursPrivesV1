import express from 'express'; 
import loginRouter from './routes/api/Login';
import registerRouter from './routes/api/Register';
import testRouter from './routes/api/Tests/Test';
import test2Router from './routes/api/Tests/Test2';
import userRouter from './routes/api/User';
import cors from 'cors'
import updateRouter from './routes/api/Update';
import userAvisRouter from './routes/api/Avis';
import coursEnseignesRouter from './routes/api/CoursEnseignes';
import sessionRouter from './routes/api/RechercherCours';
import reservationRouter from './routes/api/Session';
import listTypeCoursRouter from './routes/api/config/ListTypeCours';
import listNiveauScolaireRouter from './routes/api/config/ListNiveauScolaire';
import listTypeUserRouter from './routes/api/config/ListTypeUser';
import dashboardRouter from './routes/api/Dashboard';
import postForumRouter from './routes/api/PostForum';

const app = express()
const PORT = 3001

app.use(userRouter);

app.use(cors())
app.use(cors({
    origin: ['http://localhost', 'http://192.168.1.208']
}));

app.use(userAvisRouter);
app.use(loginRouter);
app.use(registerRouter);
app.use(updateRouter);
app.use(coursEnseignesRouter);
app.use(sessionRouter) ;
app.use(reservationRouter);
app.use(dashboardRouter);
app.use(postForumRouter);

app.use(listTypeCoursRouter);
app.use(listNiveauScolaireRouter);
app.use(listTypeUserRouter);

app.use(testRouter);
app.use(test2Router);

app.listen(PORT, () => {
    const currentDate = new Date();
    console.log(`[${currentDate.toLocaleString()}] Server started on port `+PORT);
});
