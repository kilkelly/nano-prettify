# nano-prettify

Prettify / format Nano (formally RaiBlocks) Raw amounts to be more human-readable. Format amounts in any Nano compatible unit e.g. unano, Gnano etc.... Adds decimal point and commas where necessary. Raw amounts are commonly returned when interacting with a Nano node.

e.g. Raw amount "2100176034320859259343606608761791" becomes "2,100.176034"

## Install
```sh
npm install --save nano-prettify
```

## Include in scripts

```sh
// require
var nanoPrettify = require('nano-prettify').nanoPrettify

// require (ES6 version)
const { nanoPrettify } = require('nano-prettify')

// import
import nanoPrettify from 'nano-prettify'
```

## Usage Example
```sh
nanoPrettify("2100176034320859259343606608761791")
// "2,100.176034"
```

## Note

**nano-prettify** works with strings only. If you need to deal with numbers you can try converting a returned result to a numeric format using parseInt or parseFloat where applicable. 

## API

### nanoPrettify(raw, config &lt;optional&gt;)

**Parameters**

**raw** *(string)* - The Raw amount to format. This is commonly returned when performing API calls to a Nano node e.g. "2100176034320859259343606608761791"

**config** *(object)* &lt;optional&gt; - Configuration for the returned result. The configurations are:
* **unit** *(Possible values: 'raw', 'unano', 'mnano', 'nano', 'knano', 'Mnano', 'Gnano')* - Specify which Nano unit is used to prettify the Raw amount. Default unit is 'Mnano'.
* **commas** *(boolean)* - Choose whether or not to display commas where necessary e.g. "1,000,000.000000". Default: true
* **decimals** *(boolean)* - Choose whether or not to display decimal places. Default: true
* **decimalPlaces** *(number)* - Number of decimal places to display. Default is 6. Enter 0 to show all decimal places.

#### Examples

Prettify a Raw amount

```sh
nanoPrettify("2100176034320859259343606608761791")
// Result: "2,100.176034"
```

Prettify a Raw amount using the 'nano' unit (overridiing the default unit 'Mnano')

```sh
nanoPrettify("2100176034320859259343606608761791", { unit: 'nano' })
// Result: "2,100,176,034.320859"
```

Prettify a Raw amount without commas

```sh
nanoPrettify("2100176034320859259343606608761791", { commas: false })
// Result: "2100.176034"
```

Prettify a Raw amount without decimal places

```sh
nanoPrettify("2100176034320859259343606608761791", { decimals: false })
// Result: "2,100"
```

Prettify a Raw amount with 10 decimal places (overriding the default of 6 decimal places)

```sh
nanoPrettify("2100176034320859259343606608761791", { decimalPlaces: 10 })
// Result: "2,100.1760343208"
```

Prettify a Raw amount using a combination of configurations

```sh
nanoPrettify("2100176034320859259343606608761791", 
  {
    commas: false,
    decimals: true,
    unit: 'nano',
    decimalPlaces: 10
  }
)
// Result: "2100176034.3208592593"
```

## Tests

```sh
/* run this command inside nano-prettify's
   node_modules folder */

npm run test
```

## Feedback

Pull requests and opened issues are welcome!

## License

MIT

