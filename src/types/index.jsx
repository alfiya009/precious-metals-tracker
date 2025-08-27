/**
 * @typedef {Object} MetalPrice
 * @property {string} metal
 * @property {number} price
 * @property {'INR'} currency
 * @property {string} timestamp
 * @property {number} change
 * @property {number} changePercent
 * @property {number} previousClose
 * @property {number} previousOpen
 * @property {number} high24h
 * @property {number} low24h
 * @property {number} [volume]
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {MetalPrice} [data]
 * @property {string} [error]
 */

/**
 * @typedef {'gold' | 'silver' | 'platinum' | 'palladium'} MetalType
 */

/**
 * @typedef {Object} MetalInfo
 * @property {string} name
 * @property {string} symbol
 * @property {string} color
 * @property {string} bgColor
 * @property {string} textColor
 */
