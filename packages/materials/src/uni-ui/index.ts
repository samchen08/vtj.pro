import type { App } from 'vue';
import UniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue';
import UniBreadcrumb from '@dcloudio/uni-ui/lib/uni-breadcrumb/uni-breadcrumb.vue';
import UniBreadcrumbItem from '@dcloudio/uni-ui/lib/uni-breadcrumb-item/uni-breadcrumb-item.vue';
import UniCalendar from '@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue';
import UniCalendarItem from '@dcloudio/uni-ui/lib/uni-calendar/uni-calendar-item.vue';
import UniCard from '@dcloudio/uni-ui/lib/uni-card/uni-card.vue';
import UniCol from '@dcloudio/uni-ui/lib/uni-col/uni-col.vue';
import UniCollapse from '@dcloudio/uni-ui/lib/uni-collapse/uni-collapse.vue';
import UniCollapseItem from '@dcloudio/uni-ui/lib/uni-collapse-item/uni-collapse-item.vue';
import UniCombox from '@dcloudio/uni-ui/lib/uni-combox/uni-combox.vue';
import UniCountdown from '@dcloudio/uni-ui/lib/uni-countdown/uni-countdown.vue';
import UniDataCheckbox from '@dcloudio/uni-ui/lib/uni-data-checkbox/uni-data-checkbox.vue';
import UniDataPicker from '@dcloudio/uni-ui/lib/uni-data-picker/uni-data-picker.vue';
import UniDataPickerview from '@dcloudio/uni-ui/lib/uni-data-pickerview/uni-data-pickerview.vue';
import UniDataSelect from '@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.vue';
import UniDateformat from '@dcloudio/uni-ui/lib/uni-dateformat/uni-dateformat.vue';
import UniDatetimePicker from '@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.vue';
import Calendar from '@dcloudio/uni-ui/lib/uni-datetime-picker/calendar.vue';
import CalendarItem from '@dcloudio/uni-ui/lib/uni-datetime-picker/calendar-item.vue';
import TimePicker from '@dcloudio/uni-ui/lib/uni-datetime-picker/time-picker.vue';
import UniDrawer from '@dcloudio/uni-ui/lib/uni-drawer/uni-drawer.vue';
import UniEasyinput from '@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue';
import UniFab from '@dcloudio/uni-ui/lib/uni-fab/uni-fab.vue';
import UniFav from '@dcloudio/uni-ui/lib/uni-fav/uni-fav.vue';
import UniFilePicker from '@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.vue';
import UploadFile from '@dcloudio/uni-ui/lib/uni-file-picker/upload-file.vue';
import UploadImage from '@dcloudio/uni-ui/lib/uni-file-picker/upload-image.vue';
import UniForms from '@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue';
import UniFormsItem from '@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue';
import UniGoodsNav from '@dcloudio/uni-ui/lib/uni-goods-nav/uni-goods-nav.vue';
import UniGrid from '@dcloudio/uni-ui/lib/uni-grid/uni-grid.vue';
import UniGridItem from '@dcloudio/uni-ui/lib/uni-grid-item/uni-grid-item.vue';
import UniGroup from '@dcloudio/uni-ui/lib/uni-group/uni-group.vue';
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import UniIndexedList from '@dcloudio/uni-ui/lib/uni-indexed-list/uni-indexed-list.vue';
import UniIndexedListItem from '@dcloudio/uni-ui/lib/uni-indexed-list/uni-indexed-list-item.vue';
import UniLink from '@dcloudio/uni-ui/lib/uni-link/uni-link.vue';
import UniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import UniListAd from '@dcloudio/uni-ui/lib/uni-list-ad/uni-list-ad.vue';
import UniListChat from '@dcloudio/uni-ui/lib/uni-list-chat/uni-list-chat.vue';
import UniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
import UniRefresh from '@dcloudio/uni-ui/lib/uni-list/uni-refresh.vue';
import UniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import UniNavBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar.vue';
import UniStatusBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-status-bar.vue';
import UniNoticeBar from '@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.vue';
import UniNumberBox from '@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue';
import UniPagination from '@dcloudio/uni-ui/lib/uni-pagination/uni-pagination.vue';
import UniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';
import UniPopupDialog from '@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.vue';
import UniPopupMessage from '@dcloudio/uni-ui/lib/uni-popup-message/uni-popup-message.vue';
import UniPopupShare from '@dcloudio/uni-ui/lib/uni-popup-share/uni-popup-share.vue';
import UniRate from '@dcloudio/uni-ui/lib/uni-rate/uni-rate.vue';
import UniRow from '@dcloudio/uni-ui/lib/uni-row/uni-row.vue';
import UniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue';
import UniSection from '@dcloudio/uni-ui/lib/uni-section/uni-section.vue';
import UniSegmentedControl from '@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue';
import UniSteps from '@dcloudio/uni-ui/lib/uni-steps/uni-steps.vue';
import UniSwipeAction from '@dcloudio/uni-ui/lib/uni-swipe-action/uni-swipe-action.vue';
import UniSwipeActionItem from '@dcloudio/uni-ui/lib/uni-swipe-action-item/uni-swipe-action-item.vue';
import UniSwiperDot from '@dcloudio/uni-ui/lib/uni-swiper-dot/uni-swiper-dot.vue';
import UniTable from '@dcloudio/uni-ui/lib/uni-table/uni-table.vue';
import UniTag from '@dcloudio/uni-ui/lib/uni-tag/uni-tag.vue';
import UniTbody from '@dcloudio/uni-ui/lib/uni-tbody/uni-tbody.vue';
import UniTd from '@dcloudio/uni-ui/lib/uni-td/uni-td.vue';
import UniTh from '@dcloudio/uni-ui/lib/uni-th/uni-th.vue';
import FilterDropdown from '@dcloudio/uni-ui/lib/uni-th/filter-dropdown.vue';
import UniThead from '@dcloudio/uni-ui/lib/uni-thead/uni-thead.vue';
import UniTitle from '@dcloudio/uni-ui/lib/uni-title/uni-title.vue';
import UniTooltip from '@dcloudio/uni-ui/lib/uni-tooltip/uni-tooltip.vue';
import UniTr from '@dcloudio/uni-ui/lib/uni-tr/uni-tr.vue';
import TableCheckbox from '@dcloudio/uni-ui/lib/uni-tr/table-checkbox.vue';
import UniTransition from '@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue';

const components = {
  UniBadge,
  UniBreadcrumb,
  UniBreadcrumbItem,
  UniCalendar,
  UniCalendarItem,
  UniCard,
  UniCol,
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
  Calendar,
  CalendarItem,
  TimePicker,
  UniDrawer,
  UniEasyinput,
  UniFab,
  UniFav,
  UniFilePicker,
  UploadFile,
  UploadImage,
  UniForms,
  UniFormsItem,
  UniGoodsNav,
  UniGrid,
  UniGridItem,
  UniGroup,
  UniIcons,
  UniIndexedList,
  UniIndexedListItem,
  UniLink,
  UniList,
  UniListAd,
  UniListChat,
  UniListItem,
  UniRefresh,
  UniLoadMore,
  UniNavBar,
  UniStatusBar,
  UniNoticeBar,
  UniNumberBox,
  UniPagination,
  UniPopup,
  UniPopupDialog,
  UniPopupMessage,
  UniPopupShare,
  UniRate,
  UniRow,
  UniSearchBar,
  UniSection,
  UniSegmentedControl,
  UniSteps,
  UniSwipeAction,
  UniSwipeActionItem,
  UniSwiperDot,
  UniTable,
  UniTag,
  UniTbody,
  UniTd,
  UniTh,
  FilterDropdown,
  UniThead,
  UniTitle,
  UniTooltip,
  UniTr,
  TableCheckbox,
  UniTransition
};

export {
  UniBadge,
  UniBreadcrumb,
  UniBreadcrumbItem,
  UniCalendar,
  UniCalendarItem,
  UniCard,
  UniCol,
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
  Calendar,
  CalendarItem,
  TimePicker,
  UniDrawer,
  UniEasyinput,
  UniFab,
  UniFav,
  UniFilePicker,
  UploadFile,
  UploadImage,
  UniForms,
  UniFormsItem,
  UniGoodsNav,
  UniGrid,
  UniGridItem,
  UniGroup,
  UniIcons,
  UniIndexedList,
  UniIndexedListItem,
  UniLink,
  UniList,
  UniListAd,
  UniListChat,
  UniListItem,
  UniRefresh,
  UniLoadMore,
  UniNavBar,
  UniStatusBar,
  UniNoticeBar,
  UniNumberBox,
  UniPagination,
  UniPopup,
  UniPopupDialog,
  UniPopupMessage,
  UniPopupShare,
  UniRate,
  UniRow,
  UniSearchBar,
  UniSection,
  UniSegmentedControl,
  UniSteps,
  UniSwipeAction,
  UniSwipeActionItem,
  UniSwiperDot,
  UniTable,
  UniTag,
  UniTbody,
  UniTd,
  UniTh,
  FilterDropdown,
  UniThead,
  UniTitle,
  UniTooltip,
  UniTr,
  TableCheckbox,
  UniTransition
};

export function install(app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
