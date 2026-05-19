import type { RouteNamedMap } from 'vue-router/auto-routes';

type RoutePaths = RouteNamedMap[keyof RouteNamedMap]['path'];

export type { RoutePaths };
