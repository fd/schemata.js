System.config({
  "baseURL": "/base",
  "transpiler": "babel",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "json": "github:systemjs/plugin-json@0.1.0",
    "polyfill": "github:inexorabletash/polyfill@0.1.1"
  }
});

