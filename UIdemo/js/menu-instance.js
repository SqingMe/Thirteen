/**
 * Created by rsq0113 on 2018/5/2.
 */

function menuExpand(menusJson) {
    var menu = new WholeMenu(menusJson.menus);
    console.log(menu);
    menu.selectFirst("用户管理");
    menu.effect.disable = false;
    menu.effect.init(menu);
}

