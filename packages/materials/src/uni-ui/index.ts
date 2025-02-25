import './polyfill';
import type { App } from 'vue';
import './lib/uni.scss';

import UniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue';
import UniBreadcrumb from '@dcloudio/uni-ui/lib/uni-breadcrumb/uni-breadcrumb.vue';
import UniBreadcrumbItem from '@dcloudio/uni-ui/lib/uni-breadcrumb-item/uni-breadcrumb-item.vue';
import UniCalendar from '@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue';
import UniCard from '@dcloudio/uni-ui/lib/uni-card/uni-card.vue';
import UniCollapse from '@dcloudio/uni-ui/lib/uni-collapse/uni-collapse.vue';
import UniCollapseItem from '@dcloudio/uni-ui/lib/uni-collapse-item/uni-collapse-item.vue';
import UniCombox from '@dcloudio/uni-ui/lib/uni-combox/uni-combox.vue';
import UniCountdown from '@dcloudio/uni-ui/lib/uni-countdown/uni-countdown.vue';
import UniDataCheckbox from '@dcloudio/uni-ui/lib/uni-data-checkbox/uni-data-checkbox.vue';
import UniDataPicker from '@dcloudio/uni-ui/lib/uni-data-picker/uni-data-picker.vue';
import UniDataPickerview from '@dcloudio/uni-ui/lib/uni-data-pickerview/uni-data-pickerview.vue';
// import UniDataSelect from '@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.vue';
import UniDataSelect from './lib/uni-data-select/uni-data-select.vue';
import UniDateformat from '@dcloudio/uni-ui/lib/uni-dateformat/uni-dateformat.vue';
//? 编译器 原因： 声明了变量多次。第618-620行。
// import UniDatetimePicker from '@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.vue';
import UniDatetimePicker from './lib/uni-datetime-picker/uni-datetime-picker.vue';
//? css 参数。 $uni-bg-color异常。 scss 问题 处理不了 $ 变量
import UniDrawer from '@dcloudio/uni-ui/lib/uni-drawer/uni-drawer.vue';
//? 条件编译 出现两个组件
// import UniEasyinput from '@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue';
import UniEasyinput from './lib/uni-easyinput/uni-easyinput.vue';
import UniFob from '@dcloudio/uni-ui/lib/uni-fab/uni-fab.vue';
import UniFov from '@dcloudio/uni-ui/lib/uni-fav/uni-fav.vue';
import UniFilePicker from '@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.vue';
import UniForms from './lib/uni-forms/uni-forms.vue';
//? 条件编译 出现两个组件
// import UniFormsItem from '@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue';
import UniFormsItem from './lib/uni-forms-item/uni-forms-item.vue';
import UniGoodsNav from '@dcloudio/uni-ui/lib/uni-goods-nav/uni-goods-nav.vue';
import UniGrid from '@dcloudio/uni-ui/lib/uni-grid/uni-grid.vue';
import UniGridItem from '@dcloudio/uni-ui/lib/uni-grid-item/uni-grid-item.vue';
import UniGroup from '@dcloudio/uni-ui/lib/uni-group/uni-group.vue';
// import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import UniIcons from './lib/uni-icons/uni-icons.vue';
//? css 参数。 scss 问题  处理不了 $ 变量
// import UniIndexedList from '@dcloudio/uni-ui/lib/uni-indexed-list/uni-indexed-list.vue';
import UniIndexedList from './lib/uni-indexed-list/uni-indexed-list.vue';
import UniLink from '@dcloudio/uni-ui/lib/uni-link/uni-link.vue';
// import UniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import UniList from './lib/uni-list/uni-list.vue';
import UniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
import UniListChat from '@dcloudio/uni-ui/lib/uni-list-chat/uni-list-chat.vue';
//? css 参数。。 scss 问题 处理不了 $ 变量
import UniListAd from '@dcloudio/uni-ui/lib/uni-list-ad/uni-list-ad.vue';
import UniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import UniNavBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar.vue';
import UniNoticeBar from '@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.vue';
import UniNumberBox from '@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue';
import UniPagination from '@dcloudio/uni-ui/lib/uni-pagination/uni-pagination.vue';
//? 编译器 原因： 声明了变量多次。 第228-235行
// import UniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';
import UniPopup from './lib/uni-popup/uni-popup.vue';
import UniPopupMessage from '@dcloudio/uni-ui/lib/uni-popup-message/uni-popup-message.vue';
import UniPopupDialog from '@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.vue';
import UniPopupShare from '@dcloudio/uni-ui/lib/uni-popup-share/uni-popup-share.vue';
// import UniRate from '@dcloudio/uni-ui/lib/uni-rate/uni-rate.vue';
import UniRate from './lib/uni-rate/uni-rate.vue';
import UniRow from '@dcloudio/uni-ui/lib/uni-row/uni-row.vue';
// import UniCol from '@dcloudio/uni-ui/lib/uni-col/uni-col.vue';
import UniCol from './lib/uni-col/uni-col.vue';
import UniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue';
import UniSection from '@dcloudio/uni-ui/lib/uni-section/uni-section.vue';
import UniSegmentedControl from '@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue';
import UniSteps from '@dcloudio/uni-ui/lib/uni-steps/uni-steps.vue';
import UniSwipeAction from '@dcloudio/uni-ui/lib/uni-swipe-action/uni-swipe-action.vue';
//? 多个 script 异常。 保留最后一个。
// import UniSwipeActionItem from '@dcloudio/uni-ui/lib/uni-swipe-action-item/uni-swipe-action-item.vue';
import UniSwipeActionItem from './lib/uni-swipe-action-item/uni-swipe-action-item.vue';
import UniSwiperDot from '@dcloudio/uni-ui/lib/uni-swiper-dot/uni-swiper-dot.vue';
// import UniTable from '@dcloudio/uni-ui/lib/uni-table/uni-table.vue';
import UniTable from './lib/uni-table/uni-table.vue';
import UniThead from '@dcloudio/uni-ui/lib/uni-thead/uni-thead.vue';
import UniTBody from '@dcloudio/uni-ui/lib/uni-tbody/uni-tbody.vue';
// import UniTr from '@dcloudio/uni-ui/lib/uni-tr/uni-tr.vue';
import UniTr from './lib/uni-tr/uni-tr.vue';
//? 编译器 原因： 声明了变量多次。 第119行
// import UniTh from '@dcloudio/uni-ui/lib/uni-th/uni-th.vue';
import UniTh from './lib/uni-th/uni-th.vue';
import UniTd from './lib/uni-td/uni-td.vue';
import UniTag from '@dcloudio/uni-ui/lib/uni-tag/uni-tag.vue';
import UniTitle from '@dcloudio/uni-ui/lib/uni-title/uni-title.vue';
import UniTooltip from '@dcloudio/uni-ui/lib/uni-tooltip/uni-tooltip.vue';
import UniTransition from '@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue';

import UniuniPopupDialog from './lib/uni-popup-dialog/uni-popup-dialog.vue';

// 62
const components = {
  UniBadge,
  UniBreadcrumb,
  UniBreadcrumbItem,
  UniCalendar,
  UniCard,
  UniCollapse,
  UniCollapseItem,
  UniCombox,
  UniCountdown,
  UniDataCheckbox,
  UniDataPicker,
  UniDataPickerview,
  UniDataSelect,
  UniDateformat,
  UniDatetimePicker,
  UniDrawer,
  UniEasyinput,
  UniFob,
  UniFov,
  UniFilePicker,
  UniForms,
  UniFormsItem,
  UniGoodsNav,
  UniGrid,
  UniGridItem,
  UniGroup,
  UniIcons,
  UniIndexedList,
  UniLink,
  UniList,
  UniListItem,
  UniListChat,
  UniListAd,
  UniLoadMore,
  UniNavBar,
  UniNoticeBar,
  UniNumberBox,
  UniPagination,
  UniPopup,
  UniPopupMessage,
  UniPopupDialog,
  UniPopupShare,
  UniRate,
  UniRow,
  UniCol,
  UniSearchBar,
  UniSection,
  UniSegmentedControl,
  UniSteps,
  UniSwipeAction,
  UniSwipeActionItem,
  UniSwiperDot,
  UniTable,
  UniThead,
  UniTBody,
  UniTr,
  UniTh,
  UniTd,
  UniTag,
  UniTitle,
  UniTooltip,
  UniTransition,
  UniuniPopupDialog
};

export {
  UniBadge,
  UniBreadcrumb,
  UniBreadcrumbItem,
  UniCalendar,
  UniCard,
  UniCollapse,
  UniCollapseItem,
  UniCombox,
  UniCountdown,
  UniDataCheckbox,
  UniDataPicker,
  UniDataPickerview,
  UniDataSelect,
  UniDateformat,
  UniDatetimePicker,
  UniDrawer,
  UniEasyinput,
  UniFob,
  UniFov,
  UniFilePicker,
  UniForms,
  UniFormsItem,
  UniGoodsNav,
  UniGrid,
  UniGridItem,
  UniGroup,
  UniIcons,
  UniIndexedList,
  UniLink,
  UniList,
  UniListItem,
  UniListChat,
  UniListAd,
  UniLoadMore,
  UniNavBar,
  UniNoticeBar,
  UniNumberBox,
  UniPagination,
  UniPopup,
  UniPopupMessage,
  UniPopupDialog,
  UniPopupShare,
  UniRate,
  UniRow,
  UniCol,
  UniSearchBar,
  UniSection,
  UniSegmentedControl,
  UniSteps,
  UniSwipeAction,
  UniSwipeActionItem,
  UniSwiperDot,
  UniTable,
  UniThead,
  UniTBody,
  UniTr,
  UniTh,
  UniTd,
  UniTag,
  UniTitle,
  UniTooltip,
  UniTransition,
  UniuniPopupDialog
};

export function install(app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
