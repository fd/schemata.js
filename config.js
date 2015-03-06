System.config({
  "baseURL": "/base",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "json": "github:systemjs/plugin-json@0.1.0"
  }
});

