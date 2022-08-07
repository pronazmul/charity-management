/**
 *@desc Data Table Filter Custom Function
 * @param {String} search String to be searched
 * @param {Number} page - Current Page
 * @param {Number} entities - Entities to show
 * @param {Array<JSON>} array - Main array to Filter
 * @param {[String]} Fields to be searched inside array.
 * @returns {[]} Filtered Array
 */
export const dataTableFilter = (
  search = '',
  page = 1,
  entities = 10,
  array = [],
  searchItems = []
) => {
  const regex = new RegExp(search, 'i')

  // Filter By String Search:
  let searchedData = search
    ? array.filter((item) => {
        let data
        for (let v of searchItems) {
          if (item[v].match(regex)) {
            data = true
            break
          }
        }
        return data
      })
    : array

  // Pagination Data
  let pages = searchedData && Math.ceil(searchedData.length / entities)
  let skipData = entities * (page - 1) || 0

  // Filter By Entities:
  let filteredEntities = entities
    ? searchedData.slice(skipData, skipData ? skipData + entities : entities)
    : searchedData

  return {
    filteredData: filteredEntities,
    pages,
    page,
    totalData: searchedData,
    startAt: skipData,
  }
}

/**
 *
 * @param {Array<JSON>} sidebarLinks
 * @param {String} searchBy String to search
 * @returns {[{ name: 'Item Name', sublink: 'item_link' }]} Filtered Array of Links
 */
export const autoSuggestFilter = (sidebarLinks = [], searchBy) => {
  let regx = new RegExp(searchBy, 'i')
  return sidebarLinks
    .filter((v) => v.nasted)
    .map((v) => v.subCategory)
    .flat()
    .filter((v) => v.name.match(regx))
}

/**
 *@desc Data Table Filter Function
 * @param {String} search String
 * @param {Number} page
 * @param {Number} entities
 * @param {Array<JSON>} array
 * @returns
 */
export const productFilter = (
  search = '',
  page = 1,
  entities = 10,
  array = []
) => {
  const regex = new RegExp(search, 'i')

  // Filter By String Search:
  let searchedData = search
    ? array.filter(
        (item) =>
          item.name.match(regex) ||
          item.description.match(regex) ||
          item.brand.match(regex) ||
          item.category.match(regex)
      )
    : array

  // Pagination Data
  let pages = searchedData && Math.ceil(searchedData.length / entities)
  let skipData = entities * (page - 1) || 0

  // Filter By Entities:
  let filteredEntities = entities
    ? searchedData.slice(skipData, skipData ? skipData + entities : entities)
    : searchedData

  return {
    filteredData: filteredEntities,
    pages,
    page,
    totalData: searchedData,
    startAt: skipData,
  }
}
