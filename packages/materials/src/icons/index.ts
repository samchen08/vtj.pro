import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../version';
import { setPackageName } from '../shared';

const name = '@vtj/icons';
const VTJ =
  'VtjIconChatRecord, VtjIconNewChat, VtjIconAi, VtjIconUniapp, VtjIconWindowMax, VtjIconWindowMin, VtjIconWindowClose, VtjIconWindowNormal, VtjIconWindowDown, VtjIconWindowUp, VtjIconNpSave, VtjIconNpFile, VtjIconNpEdit, VtjIconNpShare, VtjIconNpSearch, VtjIconNpExport, VtjIconNpImport, VtjIconNpList, VtjIconNpPrint, VtjIconNpCancel, VtjIconNpConfirm, VtjIconNpReset, VtjIconNpReturnAll, VtjIconNpReturn, VtjIconNpRemove, VtjIconNpRemoveRow, VtjIconNpDelete, VtjIconNpExit, VtjIconNpRefresh, VtjIconNpAdd, VtjIconNpSelect, VtjIconNpAddRow, VtjIconNpExtend, VtjIconNpClose, VtjIconNpSubmit, VtjIconDeps, VtjIconBack, VtjIconHome, VtjIconApi, VtjIconExport, VtjIconImport, VtjIconGreater, VtjIconSmaller, VtjIconCheck, VtjIconSwitch, VtjIconCopy, VtjIconLock, VtjIconUnlock, VtjIconLayers, VtjIconConsole, VtjIconTeam, VtjIconPublish, VtjIconPreview, VtjIconSave, VtjIconPc, VtjIconPhone, VtjIconPad, VtjIconRedo, VtjIconRefresh, VtjIconUndo, VtjIconCategory, VtjIconProject, VtjIconNotice, VtjIconFav, VtjIconBug, VtjIconFile, VtjIconFolder, VtjIconUpload, VtjIconDownload, VtjIconUser, VtjIconSetting, VtjIconArrowRight, VtjIconArrowLeft, VtjIconArrowDown, VtjIconArrowUp, VtjIconShare, VtjIconData, VtjIconTemplate, VtjIconExitFullscreen, VtjIconFullscreen, VtjIconEdit, VtjIconRemove, VtjIconJs, VtjIconDatabase, VtjIconInfo, VtjIconPlus, VtjIconMinus, VtjIconHelp, VtjIconVars, VtjIconOutline, VtjIconVisible, VtjIconInvisible, VtjIconDocument, VtjIconHistory, VtjIconFixed, VtjIconUnfixed, VtjIconSearch, VtjIconMore, VtjIconClose, VtjIconComponents, VtjIconBlock'.split(
    ','
  );
const El =
  'AddLocation, Aim, AlarmClock, Apple, ArrowDownBold, ArrowDown, ArrowLeftBold, ArrowLeft, ArrowRightBold, ArrowRight, ArrowUpBold, ArrowUp, Avatar, Back, Baseball, Basketball, BellFilled, Bell, Bicycle, BottomLeft, BottomRight, Bottom, Bowl, Box, Briefcase, BrushFilled, Brush, Burger, Calendar, CameraFilled, Camera, CaretBottom, CaretLeft, CaretRight, CaretTop, Cellphone, ChatDotRound, ChatDotSquare, ChatLineRound, ChatLineSquare, ChatRound, ChatSquare, Check, Checked, Cherry, Chicken, ChromeFilled, CircleCheckFilled, CircleCheck, CircleCloseFilled, CircleClose, CirclePlusFilled, CirclePlus, Clock, CloseBold, Close, Cloudy, CoffeeCup, Coffee, Coin, ColdDrink, CollectionTag, Collection, Comment, Compass, Connection, Coordinate, CopyDocument, Cpu, CreditCard, Crop, DArrowLeft, DArrowRight, DCaret, DataAnalysis, DataBoard, DataLine, DeleteFilled, DeleteLocation, Delete, Dessert, Discount, DishDot, Dish, DocumentAdd, DocumentChecked, DocumentCopy, DocumentDelete, DocumentRemove, Document, Download, Drizzling, EditPen, Edit, ElemeFilled, Eleme, ElementPlus, Expand, Failed, Female, Files, Film, Filter, Finished, FirstAidKit, Flag, Fold, FolderAdd, FolderChecked, FolderDelete, FolderOpened, FolderRemove, Folder, Food, Football, ForkSpoon, Fries, FullScreen, GobletFull, GobletSquareFull, GobletSquare, Goblet, GoldMedal, GoodsFilled, Goods, Grape, Grid, Guide, Handbag, Headset, HelpFilled, Help, Hide, Histogram, HomeFilled, HotWater, House, IceCreamRound, IceCreamSquare, IceCream, IceDrink, IceTea, InfoFilled, Iphone, Key, KnifeFork, Lightning, Link, List, Loading, LocationFilled, LocationInformation, Location, Lock, Lollipop, MagicStick, Magnet, Male, Management, MapLocation, Medal, Memo, Menu, MessageBox, Message, Mic, Microphone, MilkTea, Minus, Money, Monitor, MoonNight, Moon, MoreFilled, More, MostlyCloudy, Mouse, Mug, MuteNotification, Mute, NoSmoking, Notebook, Notification, Odometer, OfficeBuilding, Open, Operation, Opportunity, Orange, Paperclip, PartlyCloudy, Pear, PhoneFilled, Phone, PictureFilled, PictureRounded, Picture, PieChart, Place, Platform, Plus, Pointer, Position, Postcard, Pouring, Present, PriceTag, Printer, Promotion, QuartzWatch, QuestionFilled, Rank, ReadingLamp, Reading, RefreshLeft, RefreshRight, Refresh, Refrigerator, RemoveFilled, Remove, Right, ScaleToOriginal, School, Scissor, Search, Select, Sell, SemiSelect, Service, SetUp, Setting, Share, Ship, Shop, ShoppingBag, ShoppingCartFull, ShoppingCart, ShoppingTrolley, Smoking, Soccer, SoldOut, SortDown, SortUp, Sort, Stamp, StarFilled, Star, Stopwatch, SuccessFilled, Sugar, SuitcaseLine, Suitcase, Sunny, Sunrise, Sunset, SwitchButton, SwitchFilled, Switch, TakeawayBox, Ticket, Tickets, Timer, ToiletPaper, Tools, TopLeft, TopRight, Top, TrendCharts, TrophyBase, Trophy, TurnOff, Umbrella, Unlock, UploadFilled, Upload, UserFilled, User, Van, VideoCameraFilled, VideoCamera, VideoPause, VideoPlay, View, WalletFilled, Wallet, WarnTriangleFilled, WarningFilled, Warning, Watch, Watermelon, WindPower, ZoomIn, ZoomOut'.split(
    ','
  );

const createMaterialDescription = (name: string, categoryId: string) => {
  return {
    name: name,
    label: name,
    categoryId: categoryId,
    icon: name,
    porps: []
  } as MaterialDescription;
};

const VtjIcons = VTJ.map((n) => createMaterialDescription(n.trim(), 'vtj'));
const ElIcons = El.map((n) => createMaterialDescription(n.trim(), 'el'));

const components: MaterialDescription[] = [VtjIcons, ElIcons].flat();

const categories: MaterialCategory[] = [
  {
    id: 'vtj',
    category: 'VTJ'
  },
  {
    id: 'el',
    category: 'ElementPlus'
  }
];

const material: Material = {
  name: '@vtj/icons',
  version,
  label: '图标',
  library: 'VtjIconsMaterial',
  order: 5,
  categories,
  components: setPackageName(components, name),
  hidden: true
};

export default material;
