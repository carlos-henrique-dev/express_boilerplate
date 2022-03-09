import UserRouter from './user.routes';
import RoleRouter from './role.routes';
import AuthRoutes from './auth.routes';

export = [
  {
    name: '/user',
    route: UserRouter,
  },
  {
    name: '/role',
    route: RoleRouter,
  },
  {
    name: '/auth',
    route: AuthRoutes,
  },
];
