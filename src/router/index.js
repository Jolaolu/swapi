import Vue from "vue";
import VueRouter from "vue-router";

Vue.use( VueRouter );

const Home = () => import( "@/views/Home.vue" );
const PeopleView = () => import("@/views/PeopleView");
const StarshipsView = () => import("@/views/StarshipsView");
const PlanetsView = () => import("@/views/PlanetsView");
const Person = () => import("@/views/Person");
const Starship = () => import("@/views/Starship");
const Planet = () => import("@/views/Planet");
const NotFound = () => import("@/views/404.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/search",
    name: "search",
    component: Home,
    props: params => ({ q: params.query.q })
  },
  {
    path: "/people",
    name: "People",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PeopleView
  },
  {
    path: "/starships",
    name: "Starships",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: StarshipsView
  },
  {
    path: "/planets",
    name: "Planets",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PlanetsView
  },
  {
    path: "/people/:id",
    name: "Person",
    component: Person,
    props: true
  },
  {
    path: "/starships/:id",
    name: "Starship",
    component: Starship,
    props: true
  },
  {
    path: "/planets/:id",
    name: "Planet",
    component: Planet,
    props: true
  },
  {
    path: "/404",
    name: "404",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: NotFound
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
