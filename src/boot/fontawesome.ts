import { boot } from 'quasar/wrappers';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLocationDot,
  faChevronDown,
  faSackDollar,
  faCreditCard,
  faMoneyBillWave,
  faTabletScreenButton,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add icons to the library
library.add(
  faLocationDot,
  faChevronDown,
  faSackDollar,
  faCreditCard,
  faMoneyBillWave,
  faTabletScreenButton,
);

export default boot(({ app }) => {
  app.component('font-awesome-icon', FontAwesomeIcon);
});
