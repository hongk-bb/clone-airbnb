import countries from 'world-countries'

const formattedCountries = countries.map(country => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region
}))

/**
 * This is a TypeScript function that returns an object with two methods to get a list of countries and
 * to get a specific country by its value.
 * @returns An object with two methods: `getAll` and `getByValue`.
 */
const useCountries = () => {
  const getAll = () => formattedCountries

  const getByValue = (value: string) => {
    return formattedCountries.find(item => item.value === value)
  }

  return {
    getAll,
    getByValue
  }
}

export default useCountries
