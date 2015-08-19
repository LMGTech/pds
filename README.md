# pds-902

Node.js module to control a Barco PDS 902.

### Installation

```bash
$ npm install pds
```

### Usage

```javascript
var Pds = require('pds');

var switcher = new Pds({
  host: '192.168.0.3' // switcher ip address
}).connect();


/**
 *  transition the bus on the switcher
 */

switcher.take();


/**
 *  preview input 2
 *
 *  @param {Number} Input - the input number you would like to preview
 */

switcher.prev(2);

```
