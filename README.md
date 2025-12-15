npx create-react-app react-burger --template typescript
npm i @ya.praktikum/react-developer-burger-ui-components 


https://www.figma.com/design/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?node-id=0-1&p=f

https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/

## Как поднять приложение без CRA

1. npm init

2. webpack.config.js:

````
const path = require('path');
// Импортируем пакет path

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [ ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.join(__dirname, './dist'),
    compress: true,
    port: 3000,
  },
};

````

3. npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader

4. .babelrc:

````
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
````

5. Когда Babel сконфигурирован, его нужно связать с конфигом Webpack, иначе ничего не заработает. Связать Babel с
   Webpack достаточно просто: в правиле работы с js-файлами нужно указать babel-loader в массиве use:

````
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
                // Сообщаем вебпаку, что для работы с js-, jsx-файлами
                // следует использовать babel-loader
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.join(__dirname, './dist'),
    compress: true,
    port: 3000,
  },
};
````

6. Структура проекта

````
- node_modules/
- dist/
    - index.html
- src/
    - index.js
- package.json
- webpack.config.js
````

7. npm install --save react react-dom

8. Создать заголовку

````
import React from 'react';
import ReactDOM from 'react-dom/client';

const title = 'React с Webpack и Babel';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<h1>{title}</h1>);
````

9. index.html:

````
<!DOCTYPE html>
<html>
  <head>
    <title>Hello React</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./bundle.js"></script>
  </body>
</html>
````

10. npm install --save-dev webpack webpack-cli webpack-dev-server

11. package.json:

````
{
  "name": "react-webpack-project",
  "version": "1.0.0",
  "license": "ISC",
  "private": true,
  "scripts": {
        // скрипт start запускает webpack
    "start": "webpack serve --mode=development"
  },
  "devDependencies": {
    "@babel/core": "^7.20.7",
    "@babel/preset-env": "^7.20.2",
    "@babel/preset-react": "^7.18.6",
    "babel-loader": "^9.1.0",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.11.1"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
````

12. npm start


13. src/index.js:

````
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
````

14. cd src/


15. touch app.js:

````
import React from 'react';
import Title from './title';

const title = 'React with Webpack and Babel';

function App() {
  return (
    <div>
      <Title text={title} />
    </div>
  );
}

export default App;
````

18. touch title.js:

````
import React from 'react';

function Title({ text }) {
  return <h1>{text}</h1>;
}

export default Title;
````

19. npm install --save react-hot-loader


20. webpack.config.js:

````
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.join(__dirname, './dist'),
    compress: true,
    port: 3000,
        // сообщим dev-серверу, что в проекте используется hmr
        hot: true
  },
};
````

21. .babelrc:

````
{
  ...
  "plugins": ["react-hot-loader/babel"]
  ...
}
````

22. src/index.js:

````
// Импорт обязательно до импорта реакта
import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
````

23. src/app.js:

````
import { hot } from 'react-hot-loader/root';
import React from 'react';
import Title from './title';

const title = 'React with Webpack and Babel';

function App() {
  return (
    <div>
      <Title text={title} />
    </div>
  );
}

export default hot(App);
````

24. npm install css-loader style-loader --save-dev

25. webpack.config.js:

````
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  ...
};
````

26. src/style.css:

````
.title {
  color: red;
}
````

27. sdf

````
import React from 'react';

import styles from './style.css';

function DangerText({ text }) {
  return <p className={styles.title}>{text}</p>;
}

export default DangerText;
````

28. images:

````
- src/
--- assets/
----- images/
------- dog.jpg

````

29. npm install url-loader --save-dev

30. webpack.config.js:

````
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  ...
};

````

31. sdf

````
import React from 'react';

import MyImage from './assets/images/myimage.jpg';

function App({ title }) {
  return (
    <div>
      <span>{title}</span>
      <img src={MyImage} alt="torchlight in the sky" />
    </div>
  );
}

export default App;
````

32. fonts:

````
- src/
--- assets/
----- fonts/
------- OpenSans-Bold.woff
------- OpenSans-Bold.woff2
------- OpenSans-Regular.woff
------- OpenSans-Regular.woff2
````

33. sdf

````
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },
  // ...
};
````

34. sdf

````
@font-face {
  font-family: 'OpenSans';
  font-style: normal;
  font-weight: 700;
  src: url("../assets/fonts/OpenSans-Bold.woff") format("woff");
}

html,
body {
  font-family: 'OpenSans', sans-serif;
}
````

35. ESLint: npm install eslint

36. npm install --save-dev eslint-webpack-plugin

37. webpack.config.js:

````
...
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx'],
    }),
  ],
  ...
};
````

38. touch .eslintrc:

````
{
  "rules": {}
}
````

39. npm install --save-dev @babel/eslint-parser

40. .eslintrc:

````
{
  "parser": "@babel/eslint-parser",
  "rules": {}
}
````

41. .eslintrc:

````
{
  ...
  "rules": {
    "max-len": [1, 70, 4, {"ignoreComments": true}]
  }
  ...
}
````

42. ESLint Airbnb: npx install-peerdeps --dev eslint-config-airbnb

43. .eslintrc:

````
{
  "parser": "@babel/eslint-parser",
  "extends": ["airbnb"],
  "env": {
    "browser": true
  }
}
````

44. PropTypes: npm install --save prop-types

````
import React from 'react';
import PropTypes from 'prop-types';

function Title({ text }) {
  return <h1>{text}</h1>;
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
````

45. npm install redux react-redux
46. Разделение кода по функциональности

````
└── src/
    ├── components/
    │   ├── user-profile/
    │   │   ├── user-profile.js
    │   │   ├── user-profile.test.js
    │   │   └── user-profile.module.css
    │   ├── cart/
    │   │   ├── cart.js
    │   │   ├── cart.test.js
    │   │   └── cart.module.css
    │   └── favorites/
    │       ├── favorites.js
    │       ├── favorites.test.js
    │       └── favorites.module.css
    │
    └── services/
        ├── actions/
        │   ├── user-profile.js
        │   ├── cart.js
        │   └── favorites.js
        └── reducers/
            ├── cart.js
            ├── user-profile.js
            ├── favorites.js
            └── index.js
````

47. модель с разделением на представление и хранилище

````
└── src/
   └── components/
      ├── user-profile/
      │   ├── user-profile-container.js
      │   ├── user-profile-container.module.css
      │   ├── components
      │   │   ├── addresses.js
      │   │   ├── addresses.module.css
      │   │   ├── address.js
      │   │   ├── address.module.css
      │   │   ├── profile.js
      │   │   ├── profile.module.css
      │   │   ├── payment-info.js
      │   │   └── payment-info.module.css
      │   └── services
      │       ├── actions
      │       │   └── user-profile.js
      │       └── reducers
      │           └── user-profile.js
      ├── cart/
      │   ├── cart.js
      │   ├── cart.test.js
      │   ├── cart.module.css
      │   └── services
      │       ├── actions
      │       │   └── cart.js
      │       └── reducers
      │           └── cart.js
      └── favorites/
          ├── favorites.js
          ├── favorites.test.js
          ├── favorites.module.css
          └── services
             ├── actions
             │   └── favorites.js
             └── reducers
               └── favorites.js
````

48. npm install @reduxjs/toolkit
49. npm i react-dnd react-dnd-html5-backend
50. npm install --save-dev @types/library-name 

## ТЕСТИРОВАНИЕ

1. npm install jest --save-dev
2. npm test
3. npm install react-test-renderer --save-dev
4. npm install fetch-mock --save-dev
5. npm install redux-mock-store --save-dev
6. npm install @testing-library/react --save-dev
7. npm run test -- --coverage .