import { createRouter, createWebHistory } from "vue-router";
import CreateTradingSession from "@/components/CreateTradingSession.vue";
import TradingSystem from "@/components/tradingSystem.vue";
import AdminPage from "@/components/AdminPage.vue";
import dayOver from "@/components/dayOver.vue";
import { useTraderStore } from "@/store/app";
import { storeToRefs } from "pinia";

const routes = [
  {
    path: "/",
    redirect: "/create-trading-session", // Redirect from root to CreateTrader
  },
  {
    path: "/create-trading-session",
    name: "CreateTradingSession",
    component: CreateTradingSession,
  },
  {
    path: "/trader/:traderUuid",
    name: "TradingSystem",
    component: TradingSystem,
    props: true,
  },
  {
    path: "/day-over",
    name: "DayOver",
    component: dayOver,
  },
  // let's add a component for showing admin page
  {
    path: "/admin/:tradingSessionUUID",
    component: AdminPage,
    name: "AdminPage",
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const traderStore = useTraderStore();

  // Check if navigating to the TradingSystem without a traderUuid
  if (to.name === "TradingSystem" && !to.params.traderUuid) {
    next({ name: "CreateTradingSession" });
  } else {
    next();
  }
});

export default router;
