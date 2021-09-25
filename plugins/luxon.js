// https://moment.github.io/luxon/
import { DateTime } from 'luxon';

export default ({ app }, inject) => {
  inject('luxon', DateTime)
}
