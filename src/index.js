'use strict'

const UNIT_RAW = 'raw'
const UNIT_UNANO = 'unano'
const UNIT_MNANO = 'mnano'
const UNIT_NANO = 'nano'
const UNIT_KNANO = 'knano'
const UNIT_MNANO_ = 'Mnano'
const UNIT_GNANO = 'Gnano'

const units = {
  [UNIT_RAW]: {
    places: 0
  },
  [UNIT_UNANO]: {
    places: 18
  },
  [UNIT_MNANO]: {
    places: 21
  },
  [UNIT_NANO]: {
    places: 24
  },
  [UNIT_KNANO]: {
    places: 27
  },
  [UNIT_MNANO_]: {
    places: 30
  },
  [UNIT_GNANO]: {
    places: 33
  }
}

// ---------------------------------------------------

function formatNanoValue (nanoValue,
  {
    commas,
    decimals,
    decimalPlaces,
    unit
  }) {
  let unitPlaces = units[unit].places

  let fractionalPartOfNanoValue = (nanoValue.length - unitPlaces) > 0
    ? nanoValue.substring(nanoValue.length - unitPlaces)
    : nanoValue

  let integerPartOfNanoValue = nanoValue.substring(0, nanoValue.length - fractionalPartOfNanoValue.length)

  // Left pad fractional part after decimal point with zeroes if required
  while (fractionalPartOfNanoValue.length < unitPlaces) {
    fractionalPartOfNanoValue = '0' + fractionalPartOfNanoValue
  }

  if (!integerPartOfNanoValue) {
    integerPartOfNanoValue = '0'
  }

  let integerPartOfNanoValueWithCommas = []

  if (commas) {
    let commasInsertTrigger = 0 // when equal to 3 then this is the trigger to insert a comma

    for (let i = integerPartOfNanoValue.length - 1; i >= 0; i--) {
      // Comma insert has been triggered and we are not at the beginning of the integer part
      if (commasInsertTrigger === 3 && i >= 0) {
        integerPartOfNanoValueWithCommas.unshift(',')
        commasInsertTrigger = 0
      }

      integerPartOfNanoValueWithCommas.unshift(integerPartOfNanoValue[i])
      commasInsertTrigger++
    }

    integerPartOfNanoValue = integerPartOfNanoValueWithCommas.join('')
  }

  if (unit === UNIT_RAW) {
    return integerPartOfNanoValue
  } else {
    if (decimals) {
      return integerPartOfNanoValue + '.' + (decimalPlaces === 0 ? fractionalPartOfNanoValue : fractionalPartOfNanoValue.substring(0, decimalPlaces))
    } else {
      return integerPartOfNanoValue
    }
  }
}

// ---------------------------------------------------

function nanoPrettify_ (
  raw,
  {
    unit = 'Mnano',
    commas = true, // include commas? e.g. '4,002.513383'
    decimals = true, // include decimal places? e.g. 4002.513383
    decimalPlaces = 6
  } = {}
) {
  // Check that the raw value we are working with is a string
  if (typeof raw !== 'string') {
    console.error('nano-prettify must be supplied with a string. Please check your types.')
    return 'NANO_PRETTIFY_ERROR_NOT_A_STRING'
  }

  // Check that the raw value contains only digits
  let rawRegexTestResult = raw.match(/[0-9]/g)
  if (!rawRegexTestResult || rawRegexTestResult.length !== raw.length) {
    console.error('nano-prettify must be supplied with a valid raw value (containing only digits). Please check the raw value supplied.')
    return 'NANO_PRETTIFY_ERROR_NOT_VALID_RAW_VALUE'
  }

  return formatNanoValue(raw, {
    commas,
    decimals,
    decimalPlaces,
    unit
  })
}

// ---------------------------------------------------

export default nanoPrettify_
export const nanoPrettify = nanoPrettify_
