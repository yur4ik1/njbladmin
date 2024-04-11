/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UsersImport } from './routes/users'
import { Route as TransactionsImport } from './routes/transactions'
import { Route as SubscriptionImport } from './routes/subscription'
import { Route as SkillsImport } from './routes/skills'
import { Route as RequestsImport } from './routes/requests'
import { Route as PositionsImport } from './routes/positions'
import { Route as LoginImport } from './routes/login'
import { Route as LevelsImport } from './routes/levels'
import { Route as InventoryImport } from './routes/inventory'
import { Route as IntegrationsImport } from './routes/integrations'
import { Route as BrandingImport } from './routes/branding'
import { Route as BillingImport } from './routes/billing'
import { Route as AchievementsImport } from './routes/achievements'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const UsersRoute = UsersImport.update({
  path: '/users',
  getParentRoute: () => rootRoute,
} as any)

const TransactionsRoute = TransactionsImport.update({
  path: '/transactions',
  getParentRoute: () => rootRoute,
} as any)

const SubscriptionRoute = SubscriptionImport.update({
  path: '/subscription',
  getParentRoute: () => rootRoute,
} as any)

const SkillsRoute = SkillsImport.update({
  path: '/skills',
  getParentRoute: () => rootRoute,
} as any)

const RequestsRoute = RequestsImport.update({
  path: '/requests',
  getParentRoute: () => rootRoute,
} as any)

const PositionsRoute = PositionsImport.update({
  path: '/positions',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const LevelsRoute = LevelsImport.update({
  path: '/levels',
  getParentRoute: () => rootRoute,
} as any)

const InventoryRoute = InventoryImport.update({
  path: '/inventory',
  getParentRoute: () => rootRoute,
} as any)

const IntegrationsRoute = IntegrationsImport.update({
  path: '/integrations',
  getParentRoute: () => rootRoute,
} as any)

const BrandingRoute = BrandingImport.update({
  path: '/branding',
  getParentRoute: () => rootRoute,
} as any)

const BillingRoute = BillingImport.update({
  path: '/billing',
  getParentRoute: () => rootRoute,
} as any)

const AchievementsRoute = AchievementsImport.update({
  path: '/achievements',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/achievements': {
      preLoaderRoute: typeof AchievementsImport
      parentRoute: typeof rootRoute
    }
    '/billing': {
      preLoaderRoute: typeof BillingImport
      parentRoute: typeof rootRoute
    }
    '/branding': {
      preLoaderRoute: typeof BrandingImport
      parentRoute: typeof rootRoute
    }
    '/integrations': {
      preLoaderRoute: typeof IntegrationsImport
      parentRoute: typeof rootRoute
    }
    '/inventory': {
      preLoaderRoute: typeof InventoryImport
      parentRoute: typeof rootRoute
    }
    '/levels': {
      preLoaderRoute: typeof LevelsImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/positions': {
      preLoaderRoute: typeof PositionsImport
      parentRoute: typeof rootRoute
    }
    '/requests': {
      preLoaderRoute: typeof RequestsImport
      parentRoute: typeof rootRoute
    }
    '/skills': {
      preLoaderRoute: typeof SkillsImport
      parentRoute: typeof rootRoute
    }
    '/subscription': {
      preLoaderRoute: typeof SubscriptionImport
      parentRoute: typeof rootRoute
    }
    '/transactions': {
      preLoaderRoute: typeof TransactionsImport
      parentRoute: typeof rootRoute
    }
    '/users': {
      preLoaderRoute: typeof UsersImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AchievementsRoute,
  BillingRoute,
  BrandingRoute,
  IntegrationsRoute,
  InventoryRoute,
  LevelsRoute,
  LoginRoute,
  PositionsRoute,
  RequestsRoute,
  SkillsRoute,
  SubscriptionRoute,
  TransactionsRoute,
  UsersRoute,
])

/* prettier-ignore-end */