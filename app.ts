
import Robo from './src';
import dotenv from 'dotenv';
dotenv.config();
import UnsplashService from './src/services/unsplash';

const res = UnsplashService.getPhoto('office');
