import { Router } from "express";


const routes = Router();

routes.get('/', () => console.log('hello world'))

export default routes;