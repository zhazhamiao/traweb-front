import Vue from 'vue'

//element-ui
import 'element-ui/lib/theme-chalk/index.css';
import {Backtop,Icon as elIcon,Card as elCard} from 'element-ui'
import {Avatar,Input,Loading as elLoading} from "element-ui";

Vue.use(Input)
Vue.use(Avatar)
Vue.use(elCard)
Vue.use(Backtop)
Vue.use(elIcon)
Vue.use(elLoading)


//vant按需导入
import {Button, Form, Field, NavBar, Icon, Notify, Toast, Divider, Search} from 'vant';
import {Col, Row, Swipe, SwipeItem, Tabbar, TabbarItem} from 'vant';
import {Lazyload} from 'vant';
import {Image as VanImage} from 'vant';
import {Dialog} from 'vant';
import {Cell, CellGroup} from 'vant';
import {Popup} from 'vant';
import {Picker} from 'vant';
import {NumberKeyboard} from 'vant';
import {AddressList} from 'vant';
import {Uploader} from 'vant';
import {TreeSelect} from 'vant';
import {Tag} from 'vant';
import {Loading} from 'vant';
import {List} from 'vant';
import {Card} from 'vant';
import {Sticky} from 'vant';
import {GoodsAction, GoodsActionIcon, GoodsActionButton} from 'vant';
import {Grid, GridItem} from 'vant';
import {Panel} from 'vant';
import {PullRefresh} from 'vant';
import {Tab, Tabs} from 'vant';
import { SubmitBar } from 'vant';

Vue.use(SubmitBar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(PullRefresh);
Vue.use(Panel);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Sticky);
Vue.use(Card);
Vue.use(List);
Vue.use(Loading);
Vue.use(Tag);
Vue.use(TreeSelect);
Vue.use(Uploader);
Vue.use(AddressList);
Vue.use(NumberKeyboard);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Dialog);
Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Notify);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Form);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Divider)
Vue.use(Search);
