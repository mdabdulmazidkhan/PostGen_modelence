import { startApp } from 'modelence/server';
import postGenerator from './post-generator';

startApp({
  modules: [postGenerator]
});