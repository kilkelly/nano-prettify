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
  let fractionalPartOfNanoValue = nanoValue.substring(nanoValue.length - unitPlaces)  
  let integerPartOfNanoValue = nanoValue.substring(0, nanoValue.length - fractionalPartOfNanoValue.length)
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
    return 'NANO_PRETTIFY_DISPLAY_ERROR'
  }

  let importantRawDigits = raw
  let rawNanoValueInProcess = importantRawDigits

  return formatNanoValue(rawNanoValueInProcess, {
    commas,
    decimals,
    decimalPlaces,
    unit
  })
}

// ---------------------------------------------------

export default nanoPrettify_
export const nanoPrettify = nanoPrettify_
