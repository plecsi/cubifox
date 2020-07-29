# cubifox

###
Crud app

-api login url: .env.development => VUE_APP_APIURL
-api product url: .env.development => VUE_APP_PRODUCT
-username: admin
-password: admin

App indulás után a főoldalon megjelenik a login form(ha nincs bejelentkezve), valamint egy kisebb statisztika. Itt már lekérdezésre kerülnek a termékek, de jelen állapotban csak bejelentkezett felhasználó látja és tudja szerkeszteni. Ezt a store
Belépés után a dashboard-ra irányít a route. Listában vannak termékek, amelyeket lehet megtekinteni, szerkeszteni és törölni. Új terméket is ezen az oldalon lehet létrehozni. 

##
-App: vue, vuex
-Api: php, jwt auth
-Style: scss, bootstrap 5 alpha
-Icon: icomoon, fontawesome icons

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```




