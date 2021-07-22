import Vue from 'vue'
import Vant, { Locale, Lazyload} from 'vant'
import 'vant/lib/index.css'
import {NavBar} from "vant";
import {Cell,CellGroup} from "vant";
import {ContactCard} from "vant";
import {SubmitBar} from "vant";
import {Grid,GridItem} from "vant";
import { Card } from 'vant';
import {Toast} from "vant";

Vue.use(Vant);
Vue.use(NavBar);
Vue.use(Cell).use(CellGroup);
Vue.use(ContactCard);
Vue.use(SubmitBar);
Vue.use(Grid).use(GridItem);
Vue.use(Toast)
Vue.use(Lazyload)

Vue.use(Card);
