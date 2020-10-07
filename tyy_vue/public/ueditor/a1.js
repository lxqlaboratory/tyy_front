(function (window, define) {
  "use strict";
  var TPL_MODULE_NAME = 'triton.tpl.v5.booklet-cp';
  var tplBox = window.tn_ng_tpl_box = window.tn_ng_tpl_box || {};
  tplBox[TPL_MODULE_NAME] = function (angular) {
    return angular.module(TPL_MODULE_NAME, []).run(['$templateCache', function ($templateCache) {
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/sys-edit/loader-fullscreen-booklet.html?origin_tag=xiumi_us_80', '<ul class="dock booklet tn-page-slot" tn-cell-type="group" tn-bind-cell="pages" ui-sortable="ebxPageSlotSortableOpts" ng-model="cell"> <li class="tn-page-piece" ng-repeat="chd in (cell.items || cell)"> <div class="tn-page-container"> <div class="tn-page tn-page-inst" tn-solo-comp-loader="chd" tn-bind-comp-tpl-id="booklet-cp:sys-edit/pg-fs" tn-comp-role="page"></div> </div> <!--\n                         <div class="tn-page-container">\n                           <div class="tn-page tn-page-inst" tn-solo-comp-inline="chd" tn-comp-role="page">\n                             <ul class="tn-layer-slot" tn-cell-type="group" tn-bind-cell="layers">\n                               <li class="tn-layer" tn-sub-comp-inline tn-comp-role="layer">\n                                 <ul class="tn-comp-slot" tn-cell-type="group" tn-bind-cell="comps">\n                                   <li class="tn-comp-top-level" tn-sub-comp-loader></li>\n                                 </ul>\n                               </li>\n                             </ul>\n                           </div>\n                         </div>\n                         --> <menu ng-if="false" class="tn-menu tn-page-bottom-bar" stop-propagation="mouseup click"> <li><a title="添加一页" href="javascript:void(0)" ng-click="onPageInsertAfter($event, $index)"> 添加一页 </a></li> </menu> <menu class="tn-menu tn-page-toolbar" stop-propagation="click mousedown mouseup"> <li><a title="动态预览" href="javascript:void(0)" ng-click="onPageRefreshAnim($event, $index)"> <span class="glyphicon glyphicon-play-circle"></span> </a></li> <li><a title="编辑辅助" href="javascript:void(0)" ng-click="onPageAssist($event, $index)"> <span class="glyphicon glyphicon-eye-close"></span> </a></li> <li><a title="收藏页面" href="javascript:void(0)" ng-click="onPageSaveFragment($event, $index)"> <span class="glyphicon glyphicon-star"></span> </a></li> <!--       <li ng-class="{ \'disabled\': $first && $last }">\n                                         <a title="向上移动页面" href="javascript:void(0)">\n                                           <span class="glyphicon glyphicon-move"></span>\n                                         </a>\n                                       </li>\n                                  --> <li ng-if="false"><a title="页面属性" href="javascript:void(0)" ng-click="onPageProps($event, $index)"> <span class="glyphicon glyphicon-asterisk"></span> </a></li> <li ng-if="false"><a title="图层控制" href="javascript:void(0)" ng-click="onPageLayersAttr($event, $index)"> <span class="glyphicon glyphicon-tasks"></span> </a></li> <!--<li><a title="网格" href="javascript:void(0)" ng-click="onPageGrid($event, $index)"> <span\n                               class="glyphicon glyphicon-th"></span> </a></li>--> <li><a title="复制页面" href="javascript:void(0)" ng-click="onPageDuplicate($event, $index)"> <span class="glyphicon glyphicon-duplicate"></span> </a></li> <li><a title="删除页面" href="javascript:void(0)" ng-click="onPageDelete($event, $index)"> <span class="glyphicon glyphicon-trash"></span> </a></li> </menu> <menu class="tn-menu tn-page-num-bar" stop-propagation="click mousedown mouseup"> <li ng-class="{ \'disabled\': $first }"> <a title="向上移动页面" href="javascript:void(0)" ng-click="onPageMoveUp($event, $index)"> <span class="glyphicon glyphicon-chevron-up"></span> </a> </li> <li><span class="tn-menu page-num" ng-bind="$index + 1"></span></li> <li ng-class="{ \'disabled\': $last }"> <a title="向下移动页面" href="javascript:void(0)" ng-click="onPageMoveDown($event, $index)"> <span class="glyphicon glyphicon-chevron-down"></span> </a> </li> </menu> </li> </ul>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/sys-edit/ly-fs.html?origin_tag=xiumi_us_80', '<ul class="tn-comp-slot" tn-cell-type="group" tn-bind-cell="comps" ui-sortable="ebxCompSlotSortableOpts" ng-model="cell"> <li class="tn-comp-top-level" tn-sub-comp-loader=""></li> </ul>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/sys-edit/op-crop-img-set.html?origin_tag=xiumi_us_80', '<div class="bg-group-edit-container out-comp-edit-panel" ng-style="{\n            top: outCompOpStat[\'cropImageSet\'].loc.top + outCompOpStat[\'cropImageSet\'].loc.height / 2,\n            left: (outCompOpStat[\'cropImageSet\'].loc.width - 480) / 2 + outCompOpStat[\'cropImageSet\'].loc.left,\n            width: 500,\n            height: 150 / outCompOpStat[\'cropImageSet\'].loc.width * outCompOpStat[\'cropImageSet\'].loc.height + 30\n        }" ng-controller="OpCropImageSetController"> <span class="up-triangle"></span> <span class="up-triangle-inner"></span> <div class="bg-group-panel" stop-propagation="click"> <div class="arrow-left" ng-click="arrowLeftClicked()" ng-show="showLeftArrow"></div> <div class="arrow-right" ng-click="arrowRightClicked()" ng-show="showRightArrow"></div> <div class="slider tn-overflow-hidden" tn-cell-type="group" tn-bind-cell="col1"> <div class="item-container" tn-sub-set-edit-loader="" ng-style="{ \'width\': 33.33 * (cell.items.length + 1) + \'%\', \'margin-left\': curIndex < 0 ? 0 : -33.33 * curIndex + \'%\' }"></div> </div> </div> </div> ');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/sys-edit/pg-fs.html?origin_tag=xiumi_us_80', '<div class="tn-page-grid tn-page-grid-ver" ng-repeat="idx in [1,2,3,4,5,6,7,8,9]" ng-style="{ \'left\': idx * 32 + \'px\' }" ng-show="compAttr.$$tnEditingAttr.showPageGrid"></div> <div class="tn-page-grid tn-page-grid-hor" ng-repeat="idx in [1,2,3,4,5,6,7,8,9,10,11,12,13,14]" ng-style="{ \'top\': idx * 32 + \'px\' }" ng-show="compAttr.$$tnEditingAttr.showPageGrid"></div> <ul class="tn-layer-slot" tn-cell-type="group" tn-bind-cell="layers"> <li class="tn-layer" tn-sub-comp-loader="" tn-bind-comp-tpl-id="booklet-cp:sys-edit/ly-fs" tn-comp-role="layer"></li> </ul>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/baseware/cimg-only.html?origin_tag=xiumi_us_80', '<div tn-cell-type="crop-image" tn-bind-cell="cimg1" tn-image-allow-presenter-svg="true" style="width: 100%; height: 100%;"> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/baseware/circle.html?origin_tag=xiumi_us_80', '<div tn-bind-aux-prop="{ borderColor: compAux.border1 }" style="width: 100%; height: 100%; border-radius: 100%; border: 2px solid transparent;"> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/baseware/img-only.html?origin_tag=xiumi_us_80', '<img tn-cell-type="image" tn-bind-cell="img1" style="width: 100%;">');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/baseware/rect.html?origin_tag=xiumi_us_80', '');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/baseware/txt-only-bg.html?origin_tag=xiumi_us_80', '<div tn-cell-type="text" tn-bind-cell="txt1" style="font-size: 100%; color: #222; text-align: center; padding: 16px;"> </div> ');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/baseware/txt-only.html?origin_tag=xiumi_us_80', '<div tn-cell-type="text" tn-bind-cell="txt1" style="font-size: 100%; color: #222; text-align: center;"> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/baseware/txt-with-border.html?origin_tag=xiumi_us_80', '<div tn-cell-type="text" tn-bind-cell="txt1" tn-bind-aux-prop="{ borderColor: compAux.bdc1 }" style="font-size: 100%; color: #222; text-align: center;"> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/sys/adv.html?origin_tag=xiumi_us_80', '<div class="xiumi-adv" style="position: absolute; width: 100%; height: 22%; background-color: white;"> <img class="xiumi-logo" src="http://statics.xiumi.us/stc/images/templates-assets/newpages/tpls/booklet/xiumi_logo.png" style="position: absolute; top: 25%; right: 65%; height: 50%; border-radius: 50%; border: 1px solid lightgrey;"> <div class="xiumi-desc" style="position: absolute; top: 29%; left: 45%; max-height: 15%; width: 45%; font-size: 0.8em;\n        color: gray;">“再小的个体<br>&nbsp;也有自己希望打动的人群”</div> <div class="xiumi-title" style="position: absolute; top: 55%; left: 45%; max-height: 25%; width: 45%; font-size: 1.1em;\n        color: #c95e57;">秀米，<span style="color:black;">打动你的人群</span></div> <!--<a href="http://mp.weixin.qq.com/s?__biz=MjM5NDE0MDA1Mw==&mid=200206962&idx=1&sn=1e01cc05f274ec1ebe0ee7b771d740ac"\n       target="_blank" ba-event ng-click="sendBaEvent(advertList, -1)">\n        <span class="xiumi-follow" style="position: absolute; top: 40%; right: 5%; padding: 0.3em 0.5em; text-align: center;\n            font-size: 1em; border-radius: 0.5em; color: white; background-color: #80C331;">我要制作</span>\n    </a>--> </div> <div class="title" style="position: absolute; top: 22%; width: 100%; height: 6%; text-align: center; display: table;"> <div class="inner" style="display: table-cell; vertical-align: middle; color: gray;">推广</div> </div> <div tn-cell-type="crop-image" tn-bind-cell="cimg1" style="position: absolute; width: 100%; height: 72%; bottom: 0;\n        background-position: center center;\n        background-repeat: no-repeat;\n        background-size: cover;" ba-event="" ng-click="sendBaEvent(advertList, 0)"> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/sys/loader-fullscreen-booklet.html?origin_tag=xiumi_us_80', '<ul class="dock booklet tn-page-slot" tn-cell-type="group" tn-bind-cell="pages"> <li class="tn-page tn-show-page" tn-sub-comp-loader="" tn-comp-role="page" tn-comp-controller="PageController"> </li> </ul> <div class="nav-up-arrow" ng-click="onNavArrowClicked()" ng-show="currentPage >= 0 && currentPage < showData.pages.length - 1" ng-cloak=""> <img src="http://statics.xiumi.us/stc/apps/reader/assets/up_arrow.png"> </div> <a class="tpl-support-info" href="/follow" ng-show="isReady && showLogo && currentPage >= 0 && currentPage == showData.pages.length - 1" ng-cloak=""> <div class="tpl-support-info-inner" ng-show="isReady && showLogo && currentPage >= 0 && currentPage == showData.pages.length - 1" ng-cloak="">由秀米提供技术支持及广告</div> </a>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/sys/ly-fs.html?origin_tag=xiumi_us_80', '<ul class="tn-comp-slot" tn-cell-type="group" tn-bind-cell="comps"> <li class="tn-comp-top-level" tn-sub-comp-loader=""></li> </ul>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/sys/pg-fs.html?origin_tag=xiumi_us_80', '<ul class="tn-layer-slot" tn-cell-type="group" tn-bind-cell="layers"> <li class="tn-layer" tn-sub-comp-loader="" tn-comp-role="layer"></li> </ul>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/border-frame1.html?origin_tag=xiumi_us_80', '<div style="position: absolute; top: 10px; left: 10px; bottom: 10px; right: 10px; border: 2px solid;" tn-bind-aux-prop="{ borderColor: compAux.border1 }"></div> ');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/border-frame2.html?origin_tag=xiumi_us_80', '<div style="position: absolute; width:100%; height: 100%;  padding: 10px;"> <div style="border: 2px solid; height: 100%; " tn-bind-aux-prop="{ borderColor: compAux.border1 }"> <div style="margin:10px 10%; width: 80%;" tn-cell-type="text" tn-bind-cell="txt1"></div> <div style="margin:10px 10%;  width: 80%;" tn-cell-type="text" tn-bind-cell="txt2"></div> </div> </div> ');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/cimg-round.html?origin_tag=xiumi_us_80', '<div tn-bind-aux-prop="{ borderColor: compAux.border1 }" style="overflow: hidden; width: 100%; height: 100%; border-radius: 100%; border: 2px solid transparent;"> <div tn-cell-type="crop-image" tn-bind-cell="cimg1" style="width: 100%; height: 100%"></div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/cimg-set1.html?origin_tag=xiumi_us_80', '<ul class="bg-group-preview-panel" tn-cell-type="group" tn-bind-cell="col1" tn-child-position="absolute" hm-panstart="onPanStart" hm-panend="onPanEnd" hm-recognizer-options="{{ {type: \'pan\', directions: \'DIRECTION_HORIZONTAL\', preventDefault: true } }}" style="height: 100%;"> <li tn-sub-comp-loader=""></li> </ul>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/cimg-set2.html?origin_tag=xiumi_us_80', '<div class="bg-group-preview-panel tpl-cimg-set2" tn-cell-type="group" tn-bind-cell="col1" tn-child-position="absolute" hm-panstart="onPanStart" hm-pan="onPan" hm-panend="onPanEnd" hm-recognizer-options="{{ {type: \'pan\', directions: \'DIRECTION_HORIZONTAL\', preventDefault: true } }}" style="height: 100%;"> <div tn-sub-comp-loader=""></div> <div class="pagination"> <div class="swiper-pagination-switch" ng-repeat="img in comp.col1.items"></div> </div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/cimg-set3.html?origin_tag=xiumi_us_80', '<div class="bg-group-preview-panel tpl-cimg-set3 full-fill no-overflow" hm-panstart="onPanStart" hm-pan="onPan" hm-panend="onPanEnd" hm-recognizer-options="{{ {type: \'pan\', directions: \'DIRECTION_HORIZONTAL\', preventDefault: true } }}"> <div class="ui-content full-fill no-overflow"> <div class="page-slide full-fill no-overflow"> <div class="guide-steps"> <div class="background"> <div class="mask off"></div> </div> <div class="surface off" tn-cell-type="group" tn-bind-cell="col1" tn-child-position="relative"> <div class="contered"> <div tn-sub-comp-loader="" class="last-piece frame-border"></div> </div> </div> </div> </div> </div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/round-logo1.html?origin_tag=xiumi_us_80', '<div style="height: 100%; padding: 6px; border-radius: 100%; border: 2px solid" tn-bind-aux-prop="{ borderColor: compAux.bg1 }"> <div style="position: relative; height: 100%; border-radius: 100%;" tn-bind-aux-prop="{ backgroundColor: compAux.bg1 }"> <div style="position: absolute; top: 20%; left: 10%; width: 80%;" tn-cell-type="text" tn-bind-cell="txt1"></div> <div style="position: absolute; top: 40%; width: 100%; text-align: center;"> <div style="display: inline-block; width: 15%; height: 0.4em; margin-top: 0.3em;" tn-cell-type="shape" tn-bind-cell="shape1"></div> <div style="display: inline-block; width: 50%;" tn-cell-type="text" tn-bind-cell="txt2"></div> <div style="display: inline-block; width: 15%; height: 0.4em; margin-top: 0.3em;" tn-cell-type="shape" tn-bind-cell="shape2"></div> </div> <div style="position: absolute; top: 55%; left: 5%; width: 90%;" tn-cell-type="text" tn-bind-cell="txt3"></div> <div style="position: absolute; top: 65%; left: 5%; width: 90%;" tn-cell-type="text" tn-bind-cell="txt4"></div> <div style="position: absolute; top: 75%; left: 20%; width: 60%;" tn-cell-type="text" tn-bind-cell="txt5"></div> </div> </div> ');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/round-logo2.html?origin_tag=xiumi_us_80', '<div style="height: 100%; padding: 6px; border-radius: 100%; border: 2px solid" tn-bind-aux-prop="{ borderColor: compAux.bg1 }"> <div style="position: relative; height: 100%; border-radius: 100%;" tn-bind-aux-prop="{ backgroundColor: compAux.bg1 }"> <div style="position: absolute; bottom: 55%; left: 10%; width: 80%;" tn-cell-type="text" tn-bind-cell="txt1"></div> <div style="position: absolute; top: 50%; left: 10%; width: 80%; height: 1px; " tn-cell-type="shape" tn-bind-cell="shape1"></div> <div style="position: absolute; top: 60%; left: 10%; width: 80%;" tn-cell-type="text" tn-bind-cell="txt2"></div> </div> </div> ');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/round-logo3.html?origin_tag=xiumi_us_80', '<div style="height: 100%; width: 100%; padding: 20%; border: 2px solid transparent; border-radius: 100%;" tn-bind-aux-prop="{ backgroundColor: compAux.bg1, borderColor: compAux.border1 }"> <div style="height: 100%; width: 100%; display: table;"> <div style="display: table-cell; vertical-align: middle;" tn-cell-type="text" tn-bind-cell="txt1"></div> </div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/shinning-logo1.html?origin_tag=xiumi_us_80', '<div style="height: 100%; width: 100%;" tn-cell-type="crop-image" tn-bind-cell="cimg1"></div> <div style="position: absolute; top: 25%; left: 25%; height: 50%; width: 50%;" tn-cell-type="crop-image" tn-bind-cell="cimg2"></div> ');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/t-a-01-01.html?origin_tag=xiumi_us_80', '<span tn-cell-type="text" tn-bind-cell="txt1" tn-bind-aux-prop="{ backgroundColor: compAux.titleBgc }" style="display: inline-block; border-radius: 0.5em;\n      padding: 0.3em 0.5em; color: white;\n      box-shadow: #a5a5a5 0.2em 0.2em 0.1em; "></span>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/t-a-01-03.html?origin_tag=xiumi_us_80', '<div style="display: inline-block; vertical-align: top; height: 2em; padding:0.3em 0.5em; " tn-cell-type="text" tn-bind-cell="txt1" tn-bind-aux-prop="{ backgroundColor: compAux.titleBgc }"> </div><div tn-bind-aux-prop="{ borderLeftColor: compAux.titleBgc }" style=" box-sizing: border-box !important; display: inline-block;\n                height: 2em; width: 0.5em; vertical-align: top;\n                border-left: 0.5em solid;\n                border-top: 1em solid transparent !important;\n                border-bottom: 1em solid transparent !important;\n                -moz-border-top-colors: transparent !important;\n                -moz-border-bottom-colors: transparent !important;"> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/t-a-03-03-v1.html?origin_tag=xiumi_us_80', '<div style="width: 100%; padding: 3px"> <div style="display: inline-block; vertical-align: top; width: 25%"> <div style="width: 1.5em; height:1.5em; border: 1px solid; margin: auto;\n            border-radius: 100%; -webkit-border-radius: 100%;font-weight: 500;" tn-cell-type="text" tn-bind-cell="txt1" tn-bind-aux-prop="{ backgroundColor: compAux.bgc1,borderColor: compAux.bdc1 }"></div> </div><div style="display: inline-block;vertical-align: top; width: 75%; padding-left: 5px;" tn-cell-type="text" tn-bind-cell="txt2"> </div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/txt-triangle1.html?origin_tag=xiumi_us_80', '<div style="float: left; margin-top: 10px; border-top: 8px solid transparent;\n    border-bottom: 8px solid transparent; border-right: 15px solid;" tn-bind-aux-prop="{ borderRightColor: compAux.bg1 }"></div> <div style="margin-left: 15px; padding: 0.5em; border-radius: 0.5em;" tn-bind-aux-prop="{ backgroundColor: compAux.bg1 }"> <div tn-cell-type="text" tn-bind-cell="txt1" style="font-size: 100%; color: #222; text-align: center;"> </div> </div> ');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/txt-triangle2.html?origin_tag=xiumi_us_80', '<div style="text-align: center;"> <div style="width: 0; margin: 0 auto; border-left: 6px solid transparent;\n    border-right: 6px solid transparent; border-bottom: 6px solid;" tn-bind-aux-prop="{ borderBottomColor: compAux.bg1 }"></div> <div style="padding: 0.5em; border-radius: 0.5em;" tn-bind-aux-prop="{ backgroundColor: compAux.bg1 }"> <div tn-cell-type="text" tn-bind-cell="txt1"></div> </div> </div> ');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/txt-triangle3.html?origin_tag=xiumi_us_80', '<div style="float: right; margin-top: 10px; border-top: 8px solid transparent;\n    border-bottom: 8px solid transparent; border-left: 15px solid ;" tn-bind-aux-prop="{ borderLeftColor: compAux.bg1 }"></div> <div style="margin-right: 15px; padding: 0.5em; border-radius: 0.5em;" tn-bind-aux-prop="{ backgroundColor: compAux.bg1 }"> <div tn-cell-type="text" tn-bind-cell="txt1" style="font-size: 100%; color: #222; text-align: center;"> </div> </div> ');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/block-of-g1/txt-triangle4.html?origin_tag=xiumi_us_80', '<div style="text-align: center;"> <div style="padding: 0.5em; border-radius: 0.5em;" tn-bind-aux-prop="{ backgroundColor: compAux.bg1 }"> <div tn-cell-type="text" tn-bind-cell="txt1"></div> </div> <div style="width: 0; margin: 0 auto; border-left: 6px solid transparent;\n    border-right: 6px solid transparent; border-top: 6px solid;" tn-bind-aux-prop="{ borderTopColor: compAux.bg1 }"></div> </div> ');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/bg-layout/row1-c1.html?origin_tag=xiumi_us_80', '<div class="layout-row" style="width: 100%; height: 100%;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1"></div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/bg-layout/row2-c1.html?origin_tag=xiumi_us_80', '<div class="layout-row" style="width: 100%; height: 50%; padding-bottom: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1"></div> </div> <div class="layout-row" style="width: 100%; height: 50%; padding-top: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2"></div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/bg-layout/row2-r1c1-r2c2.html?origin_tag=xiumi_us_80', '<div class="layout-row" style="width: 100%; height: 50%; padding-bottom: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1"></div> </div> <div class="layout-row" style="width: 100%; height: 50%; padding-top: 2px;"> <div class="layout-col" style="display: inline-block; width: 50%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c1"></div> </div><div class="layout-col" style="display: inline-block; width: 50%; height: 100%; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c2"></div> </div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/bg-layout/row2-r1c1-r2c3.html?origin_tag=xiumi_us_80', '<div style="width: 100%; height: 66.6666%; padding-bottom: 4px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1"></div> </div> <div style="width: 100%; height: 33.3333%; "> <div style="display: inline-block; width: 33.3333%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c1"></div> </div><div style="display: inline-block; width: 33.3333%; height: 100%; padding-right: 2px; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c2"></div> </div><div style="display: inline-block; float: right; width: 33.3333%; height: 100%; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c3"></div> </div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/bg-layout/row2-r1c2-r2c2.html?origin_tag=xiumi_us_80', '<div style="display: inline-block; width: 50%; height: 50%; padding-right: 2px; padding-bottom: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c1"></div> </div><div style="display: inline-block; width: 50%; height: 50%; padding-left: 2px;padding-bottom: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c2"></div> </div> <div style="display: inline-block; width: 50%; height: 50%; padding-right: 2px;padding-top: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c1"></div> </div><div style="display: inline-block; width: 50%; height: 50%; padding-left: 2px; padding-top: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c2"></div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/bg-layout/row3-c1.html?origin_tag=xiumi_us_80', '<div class="layout-row" style="width: 100%; height: 33.3333%; padding-bottom: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1"></div> </div> <div class="layout-row" style="width: 100%; height: 33.3333%; padding-top: 2px; padding-bottom: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2"></div> </div> <div class="layout-row" style="width: 100%; height: 33.3333%; padding-top: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3"></div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/bg-layout/row3-c2.html?origin_tag=xiumi_us_80', '<div style="width: 100%; height: 33.3333%; padding-bottom: 2px;"> <div style="display: inline-block; width: 50%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c1"></div> </div><div style="display: inline-block; width: 50%; height: 100%; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c2"></div> </div> </div> <div style="width: 100%; height: 33.3333%; padding-top: 2px; padding-bottom: 2px;"> <div style="display: inline-block; width: 50%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c1"></div> </div><div style="display: inline-block; width: 50%; height: 100%; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c2"></div> </div> </div> <div style="width: 100%; height: 33.3333%; padding-top: 2px;"> <div style="display: inline-block; width: 50%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c1"></div> </div><div style="display: inline-block; width: 50%; height: 100%; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c2"></div> </div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/bg-layout/row3-r1c2-r2c1-r3c2.html?origin_tag=xiumi_us_80', '<div style="width: 100%; height: 33.3333%; padding-bottom: 2px;"> <div style="display: inline-block; width: 33.3333%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c1"></div> </div><div style="display: inline-block; width: 33.3333%; height: 100%; padding-right: 2px; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c2"></div> </div><div style="display: inline-block; float: right; width: 33.3333%; height: 100%; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c3"></div> </div> </div> <div style="width: 100%; height: 33.3333%; padding-bottom: 2px; padding-top: 2px"> <div style="display: inline-block; width: 100%; height: 100%;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2"></div> </div> </div> <div style="width: 100%; height: 33.3333%; padding-top: 2px;"> <div style="display: inline-block; width: 33.3333%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c1"></div> </div><div style="display: inline-block; width: 33.3333%; height: 100%; padding-right: 2px; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c2"></div> </div><div style="display: inline-block; float: right; width: 33.3333%; height: 100%; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c3"></div> </div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/bg-layout/row3-r1c3-r2c1-r3c3.html?origin_tag=xiumi_us_80', '<div style="width: 100%; height: 33.3333%; padding-bottom: 2px;"> <div style="display: inline-block; width: 33.3333%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c1"></div> </div><div style="display: inline-block; float: right; width: 66.6666%; height: 100%; padding-left: 2px;float: right;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c2"></div> </div> </div> <div style="width: 100%; height: 33.3333%; padding-bottom: 2px; padding-top: 2px"> <div style="display: inline-block; width: 100%; height: 100%;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2"></div> </div> </div> <div style="width: 100%; height: 33.3333%; padding-top: 2px;"> <div style="display: inline-block; width: 66.6666%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c1"></div> </div><div style="display: inline-block; float: right; width: 33.3333%; height: 100%; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c2"></div> </div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/bg-layout/row3-r1c3-r2c2-r3c3.html?origin_tag=xiumi_us_80', '<div style="width: 100%; height: 33.3333%; padding-bottom: 2px;"> <div style="display: inline-block; width: 33.3333%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c1"></div> </div><div style="display: inline-block; float: right; width: 66.6666%; height: 100%; padding-left: 2px;float: right;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c2"></div> </div> </div> <div style="width: 100%; height: 33.3333%; padding-top: 2px; padding-bottom: 2px;"> <div style="display: inline-block; width: 66.6666%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c1"></div> </div><div style="display: inline-block; float: right; width: 33.3333%; height: 100%; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c2"></div> </div> </div> <div style="width: 100%; height: 33.3333%; padding-top: 2px;"> <div style="display: inline-block; width: 33.3333%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c1"></div> </div><div style="display: inline-block; float: right; width: 66.6666%; height: 100%; padding-left: 2px;float: right;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c2"></div> </div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/bg-layout/row4-r1c4-r2r2c3-r3c4.html?origin_tag=xiumi_us_80', '<div style="width: 100%; height: 25%; padding-bottom: 2px;"> <div style="display: inline-block; width: 25%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c1"></div> </div><div style="display: inline-block; width: 25%; height: 100%; padding-left: 2px; padding-right: 2px"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c2"></div> </div><div style="display: inline-block; width: 25%; height: 100%; padding-right: 2px;padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c3"></div> </div><div style="display: inline-block; width: 25%; height: 100%; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir1c4"></div> </div> </div> <div style="width: 100%; height: 50%; padding-top: 2px; padding-bottom: 2px;"> <div style="display: inline-block; width: 25%; height: 100%; padding-right: 2px;"> <div style="display: inline-block; width: 100%; height: 50%; padding-bottom: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c1-1"></div> </div> <div style="display: inline-block; width: 100%; height: 50%; padding-top: 2px; "> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c1-2"></div> </div> </div><div style="display: inline-block; vertical-align: top; width: 50%; height: 100%; padding-right: 2px; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c2"></div> </div><div style="display: inline-block; width: 25%; height: 100%; padding-left: 2px;"> <div style="display: inline-block; width: 100%; height: 50%; padding-bottom: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c3-1"></div> </div> <div style="display: inline-block; width: 100%; height: 50%; padding-top: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir2c3-2"></div> </div> </div> </div> <div style="width: 100%; height: 25%; padding-top: 2px;"> <div style="display: inline-block; width: 25%; height: 100%; padding-right: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c1"></div> </div><div style="display: inline-block; width: 25%; height: 100%; padding-left: 2px; padding-right: 2px"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c2"></div> </div><div style="display: inline-block; width: 25%; height: 100%; padding-right: 2px;padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c3"></div> </div><div style="display: inline-block; width: 25%; height: 100%; padding-left: 2px;"> <div style="width: 100%; height: 100%;" tn-cell-type="crop-image" tn-bind-cell="cir3c4"></div> </div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/video/video1.html?origin_tag=xiumi_us_80', '<div class="video-container" style="position: absolute; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5);" tn-bind-cell="video1" tn-cell-type="video"> <img class="video-cover" src="//statics.xiumi.us/stc/images/templates-assets/newpages/tpls/booklet/video-tpl-icon.png" style="position: absolute; top: 50%; left: 50%; width: 40px; margin-left: -20px; margin-top: -20px; transform: rotate3d(0,0,1,-90deg);"> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/2016-3-11/5.html?origin_tag=xiumi_us_80', '<div style=" -webkit-box-shadow: 0.2em 0.2em 0.5em #666;position: absolute; top: 5%;  width: 86%; left: 7%;\n              box-shadow: 0.2em 0.2em 0.5em #666;" tn-bind-cell="cimg1" tn-cell-type="crop-image" tn-bind-aux-prop="{ borderColor: compAux.bdc1}"></div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/2016-3-11/6.html?origin_tag=xiumi_us_80', '<div style=" -webkit-box-shadow: 0.2em 0.2em 0.5em #666;position: absolute; top: 5%;  width: 86%; left: 7%;\n              box-shadow: 0.2em 0.2em 0.5em #666;" tn-bind-cell="cimg1" tn-cell-type="crop-image" tn-bind-aux-prop="{ borderColor: compAux.bdc1}"></div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/2016-3-11/4.html?origin_tag=xiumi_us_80', '<div style="position: absolute;top: 5%;  width: 86%; left: 7%;" tn-bind-cell="cimg1" tn-cell-type="crop-image" tn-bind-aux-prop="{ borderColor: compAux.imgBdc1}"></div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/2016-3-11/7.html?origin_tag=xiumi_us_80', '<div style=" -webkit-box-shadow: rgb(102, 102, 102) 0.2em 0.2em 0.5em; position: absolute; top: 5%;  width: 86%; left: 7%;\n              box-shadow: rgb(102, 102, 102) 0.2em 0.2em 0.5em" tn-bind-cell="cimg1" tn-cell-type="crop-image"></div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/2016-3-11/10.html?origin_tag=xiumi_us_80', '<div style="  position: absolute; top: 5%;  width: 86%; left: 7%;\n                 border-radius:1.5em;\n    -webkit-border-radius:1.5em;" tn-bind-cell="cimg1" tn-cell-type="crop-image"></div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/2016-3-11/9.html?origin_tag=xiumi_us_80', '<div style="  position: absolute; top: 5%;  width: 86%; left: 7%;\n                 border-radius: 0 3.8em 0 3.8em;\n    -webkit-border-radius: 0 3.8em 0 3.8em;" tn-bind-cell="cimg1" tn-cell-type="crop-image"></div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/2016-3-14/6.html?origin_tag=xiumi_us_80', '<div style="position: absolute; width: 86%; height: 90%"> <img style="position: absolute; left: 0;    z-index: 1; top: 0;\n                    bottom: 0;\n                    width: 3.6em;\n                    height: 3em;" src="http://statics.xiumi.us/stc/images/templates-assets/parts/110-image/imgtxt-a-03-79-img1.png"> <div style="-webkit-box-shadow:0 0 10px rgba(159, 160, 160, 0.5);\n                  -moz-box-shadow:0 0 10px rgba(159, 160, 160, 0.5);\n                  box-shadow:0 0 10px rgba(159, 160, 160, 0.5);\n                  width: 96%; height: 96%;\n                  padding: 8px; position: absolute; background-color: white;\n                  top: 2%; left: 2%; right: 0; bottom: 0"> <div style="border: 8px solid" tn-bind-aux-prop="{ borderColor: compAux.bdc1}" tn-bind-cell="cimg1" tn-cell-type="crop-image"></div> </div> <img style="position: absolute;\n                right: 0; bottom: 0;\n                width: 3.6em;\n                height: 3em;" src="http://statics.xiumi.us/stc/images/templates-assets/parts/110-image/imgtxt-a-03-79-img2.png"> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/2016-3-14/10.html?origin_tag=xiumi_us_80', '<div style="width: 100%; height: 100%; border: 1px solid;" tn-bind-aux-prop="{ borderColor: compAux.bdc1, backgroundColor: compAux.bgc1 }"></div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/2016-3-9/3.html?origin_tag=xiumi_us_80', '<div style="-webkit-box-shadow:0 0 10px rgba(159, 160, 160, 0.5);\n              -moz-box-shadow:0 0 10px rgba(159, 160, 160, 0.5);\n              box-shadow:0 0 10px rgba(159, 160, 160, 0.5);  padding: 10px;\n              position: absolute;\n                    left: 7%;\n    top: 5%;\n    width: 86%;\n    height: 90%;"> <div style="-webkit-box-shadow:inset 0 0 10px rgba(0, 0, 0, 0.29);\n                          -moz-box-shadow:inset 0 0 10px rgba(0, 0, 0, 0.29);\n                          box-shadow:inset 0 0 10px rgba(0, 0, 0, 0.29);  padding: 7px;    height: 100%;"><div tn-bind-cell="cimg1" tn-cell-type="crop-image"></div> </div> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/baseware/txt-only-bg-2.html?origin_tag=xiumi_us_80', '<div tn-cell-type="text" tn-bind-cell="txt1" style="font-size: 100%; color: #222; text-align: center; "> </div>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/layout/row1-r1c1.html?origin_tag=xiumi_us_80', '<ul class="tn-board-compound-container" style="display: inline-block; width: 100%;height:100%; vertical-align: top;" tn-cell-type="group" tn-bind-cell="col1" tn-child-position="static"> <li tn-sub-comp-loader=""></li> </ul>');
      $templateCache.put('//sd.xiumi.us/tpls/booklet-cp/map-tpl.html?origin_tag=xiumi_us_80', '<div tn-cell-type="map" tn-bind-cell="map1" style="min-width:150px; min-height:150px;width:100%;height:100%"> </div>');
    }]);
  };
})(window, window.define);
