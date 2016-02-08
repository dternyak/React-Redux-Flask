/*
 * Is mobile or tablet?
 *
 * @return {Boolean}
 */
export function isMobileAndTablet() {
  window.innerWidth <= 800 && window.innerHeight <= 600
    ? true
    : false;
}
