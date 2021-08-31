// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Home,
  Dashboard,
  Login,
  Feedback,
  ItJira,
  MstJira,
  DashboardView,
  Users,
  Role,
  ManageFeedback,
  Team,
  Offers,
  About,
  AgeingDashboard,
  Ortom8Jira,
} from './';

export default {
  path: 'pulse',
  childRoutes: [
    { path: '/', component: Home },
    { path: '/pulse-dashboard', component: Dashboard },
    { path: '/login', component: Login },
    { path: '/feedback', component: Feedback },
    { path: '/it-jira', component: ItJira },
    { path: '/mst-jira', component: MstJira },
    { path: '/dash-view', component: DashboardView },
    { path: '/mst-users', component: Users },
    { path: '/role-manage', component: Role },
    { path: '/manage-feedback', component: ManageFeedback },
    { path: '/team', component: Team },
    { path: '/offers', component: Offers },
    { path: '/about', component: About },
    { path: '/ageing', component: AgeingDashboard },
    { path: '/ortom8-jira', component: Ortom8Jira },
  ],
};
