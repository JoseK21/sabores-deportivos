export enum UserRole {
  unknown = "unknown",
  client = "client",
  master = "master",
  admin_rest = "admin_rest",
  cashier_rest = "cashier_rest",
  waiter_rest = "waiter_rest",
  bartender_rest = "bartender_rest",
}

export enum UserStatus {
  unknown = "unknown",
  actived = "actived",
  suspented = "suspented",
  deactivated = "deactivated",
}

export enum EventStatus {
  incoming = "incoming",
  live = "live",
  finished = "finished",
  canceled = "canceled",
  pending = "pending",
  postponed = "postponed",
}

export enum ForecastStatus {
  won = "won",
  lost = "lost",
  pending = "pending",
  canceled = "canceled",
  completed = "completed",
}

export enum BusinessTypes {
  bar = "bar",
  cafe = "cafe",
  hotel = "hotel",
  sportbar = "sportbar",
  restaurant = "restaurant",
  sports_club = "sports_club",
  bar_restaurant = "bar_restaurant",
  shopping_center = "shopping_center",
  recreation_center = "recreation_center",
}

export enum Countries {
  cr = "cr",
  mx = "mx",
  es = "es",
}