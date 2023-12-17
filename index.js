import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common/common.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';

// ReactDOM.render(<Controller />, document.getElementById('root'));

ReactDOM.render(
    <React.StrictMode>
        <Controller />
    </React.StrictMode>,
    document.getElementById('root')
  );
registerServiceWorker();
