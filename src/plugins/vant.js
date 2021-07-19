import Vue from 'vue'
import Vant, { Locale } from 'vant'
import 'vant/lib/index.css'
import {NavBar} from "vant";
import {Cell,CellGroup} from "vant";
import {ContactCard} from "vant";
import {SubmitBar} from "vant";
import {Grid,GridItem} from "vant";

Vue.use(Vant);
Vue.use(NavBar);
Vue.use(Cell).use(CellGroup);
Vue.use(ContactCard);
Vue.use(SubmitBar);
Vue.use(Grid).use(GridItem);

