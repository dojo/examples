import { Outlet } from '@dojo/framework/routing/Outlet';
import { Home } from './../widgets/Home';

export const HomeOutlet = Outlet({ index: Home }, 'home');
