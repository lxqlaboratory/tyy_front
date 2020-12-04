import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'


Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '天一旅游', icon: 'dashboard', affix: true, auth: 'NO'}
    }]
  },

  {
    path: '/product',
    component:
    Layout,
    typeUser:'0',
    name:
      'product',
    meta:
      {
        title: '产品管理', icon:'example',auth:'PROMENU',status:'aaa'
      }
    ,
    children: [
      {
        typeUser:'0',
        path: 'proTypeList',
        name: 'ProTypeList',
        component: () => import('@/views/production/proTypeList'),
        meta: {title: '产品分类设置', icon: 'peoples',auth:'PROTYPEINFO'}
      },
      {

        path: 'proPoint',
        name: 'ProPoint',
        component: () => import('@/views/production/proPoint'),
        meta: {title: '集合地点设置', icon: 'peoples'},
      },
      {
        typeUser:'0',
        path: 'addNewLocation',
        name: 'addNewLocation',
        component: () => import('@/views/production/addNewLocation'),
        meta: {title: '编辑集合地点', icon: 'peoples'},
        hidden: true
      },

      {
        typeUser:'0',
        path: 'proServiceList',
        name: 'ProServiceList',
        component: () => import('@/views/production/proServiceList'),
        meta: {title: '服务类别设置', icon: 'peoples'},
        hidden: true
      },


      {
        typeUser:'0',
        path: 'proAtrributeList',
        name: 'ProAtrributeList',
        component: () => import('@/views/production/proAtrributeList'),
        meta: {title: '产品属性设置', icon: 'peoples', auth : 'ATTRIBUTEINFO'}

      },

      {
        typeUser:'0',
        path: 'addProduction',
        name: 'AddProduction',
        component: () => import('@/views/production/addProduction'),
        meta: {title: '录入散客产品', icon: 'nested', auth: 'PROUPDATE'}
      },

      {
        typeUser:'0',
        path: 'proList',
        name: 'ProList',
        component: () => import('@/views/production/proList'),
        meta: {title: '散客产品', icon: 'nested', affix: true , auth : 'PROINFO'}
      },

      {
        typeUser:'0',
        path: 'checkPro',
        name: 'checkPro',
        component: () => import('@/views/production/checkPro'),
        meta: {title: '审核产品', icon: 'nested', affix: true , auth : 'PROINFO'}
      },
      // {
      //   typeUser:'0',
      //   path: 'proPlan',
      //   name: 'ProPlan',
      //   component: () => import('@/views/plan/proPlan'),
      //   meta: {title: '散客产品计划', icon: 'nested',auth : 'PLANINFO'}
      // },

      {
        typeUser:'0',
        path: 'planList',
        name: 'planList',
        component: () => import('@/views/plan/planList'),
        meta: {title: '计划订单拼团', icon: 'nested',auth : 'PLANINFO'}
      },

      {
        typeUser:'0',
        path: 'addTeamProduction',
        name: 'AddTeamProduction',
        component: () => import('@/views/production/addTeamProduction'),
        meta: {title: '录入团队产品', icon: 'table',auth : 'PROUPDATE'}
      },

      {
        typeUser:'0',
        path: 'proTeam',
        name: 'ProTeam',
        component: () => import('@/views/production/proTeamList'),
        meta: {title: '团队产品', icon: 'table',auth : 'PROUPDATE'}
      },

      {
        typeUser:'0',
        path: 'proInfo',
        name: 'ProInfo',
        component: () => import('@/views/production/proInfo'),
        meta: {title: '旅游产品详情', icon: 'table'},
        hidden: true
      },

      {
        typeUser:'0',
        path: 'proTeamInfo',
        name: 'ProTeamInfo',
        component: () => import('@/views/production/proTeamInfo'),
        meta: {title: '旅游产品详情', icon: 'table'},
        hidden: true
      },


      // {
      //   typeUser:'0',
      //   path: 'proRecycle',
      //   name: 'ProRecycle',
      //   component: () => import('@/views/production/proRecycle'),
      //   meta: {title: '产品回收站', icon: 'example',auth : 'PROINFO'}
      // },

      {
        typeUser:'0',
        path: 'proOutput',
        name: 'proOutput',
        component: () => import('@/views/production/proOutput'),
        meta: {title: '导出近期产品计划', icon: 'table'},
        hidden: true
      },

      {
        typeUser:'0',
        path: 'proTravelExport',
        name: 'proTravelExport',
        component: () => import('@/views/production/proTravelExport'),
        hidden: true
      }
    ]
  }
  ,
  {
    path: '/order',
    component:
    Layout,
    typeUser:'0',
    name:
      'Order',
    meta:
      {
        title: '订单管理',
        icon:
          'nested',
        auth: 'ORDERMENU',status:'aaa'
      }
    ,
    children: [
      {
        typeUser:'0',
        path: 'addOrder',
        name: 'AddOrder',
        component: () => import('@/views/order/addOrder'),
        meta: {title: '编辑订单', icon: 'table'},
        hidden: true
      }
      ,
      {
        typeUser:'0',
        path: 'addWcOrder',
        name: 'AddWcOrder',
        component: () => import('@/views/order/addWcOrder'),
        meta: {title: '编辑订单', icon: 'table'},
        hidden: true
      }
      ,
      {
        typeUser:'0',
        path: 'wcOrderMoney',
        name: 'OrderMoney',
        component: () => import('@/views/order/wcOrderMoney'),
        meta: {title: '订单确认', icon: 'table'},
        hidden: true
      }
      ,
      // {
      //   typeUser:'0',
      //   path: 'orderList',
      //   name: 'orderList',
      //   component: () => import('@/views/order/orderList'),
      //   meta: {title: '所有订单', icon: 'table',auth : 'ORDERINFO'}
      // },
      {
        typeUser:'0',
        path: 'wechatorderList',
        name: 'wechatorderList',
        component: () => import('@/views/order/wechatorderList'),
        meta: {title: '订单列表', icon: 'table',auth : 'ORDERINFO'}
      },
      {
        typeUser:'0',
        path: 'wechatArrorderList',
        name: 'wechatArrorderList',
        component: () => import('@/views/order/wechatArrorderList'),
        meta: {title: '欠费订单列表', icon: 'table',auth : 'ORDERINFO'}
      },
      {
        typeUser:'0',
        path: 'wechatorderRecList',
        name: 'wechatorderRecList',
        component: () => import('@/views/order/wechatorderRecList'),
        meta: {title: '订单回收站', icon: 'table',auth : 'ORDERINFO'}
      },
      // {
      //   typeUser:'0',
      //   path: 'qforderList',
      //   name: 'qforderList',
      //   component: () => import('@/views/order/orderList'),
      //   meta: {title: '欠费订单', icon: 'table',auth : 'ORDERINFO'}
      // },


      // {
      //   typeUser:'0',
      //   path: 'wshorderList',
      //   name: 'wshorderList',
      //   component: () => import('@/views/order/orderList'),
      //   meta: {title: '未审核订单', icon: 'table',auth : 'ORDERINFO'}
      // },

      {
        typeUser:'0',
        path: 'enclosureOrder',
        name:
          'enclosureOrder',
        component:
          () => import('@/views/dashboard/index'),
        meta:
          {
            title: '订单附件管理', icon: 'table'
          },
        hidden: true
      }
    ]

  }
  ,
  {
    path: '/plan',
    component: Layout,
    name: 'plan',
    typeUser:'0',
    hidden: false,
    meta: {title: '团队操作', icon: 'example',auth : 'GROUPMENU'},
    children: [


      // {
      //   typeUser:'0',
      //   path: 'group',
      //   name: 'group',
      //   component: () => import('@/views/group/groupList'),
      //   meta: {title: '散客团队', icon: 'table', affix: true,auth : 'GROUPINFO'}
      // }
      // ,
      {
        typeUser:'0',
        path: 'groupNew',
        name: 'groupNew',
        component: () => import('@/views/group/groupNewList'),
        meta: {title: '散客团队', icon: 'table', affix: true,auth : 'GROUPINFO'}
      }
      ,
      {
        typeUser:'0',
        path: 'groupDl',
        name: 'groupDl',
        component: () => import('@/views/group/groupList'),
        meta: {title: '独立团队', icon: 'table', affix: true,auth : 'GROUPINFO'}
      }
      ,
      {
        typeUser:'0',
        path: 'groupMap',
        name: 'groupMap',
        component: () => import('@/views/group/groupMap'),
        meta: {title: '地图'},
        hidden:true
      },
      {
        typeUser:'0',
        path: 'grouppt',
        name: 'grouppt',
        component: () => import('@/views/group/groupPt'),
        meta: {title: '团队拼团', icon: 'table'},

        hidden: true
      },
      {
        typeUser:'0',
        path: 'groupPlanspt',
        name: 'groupPlanspt',
        component: () => import('@/views/group/groupPlansPt'),
        meta: {title: '团队多计划拼团', icon: 'table'},

        hidden: true
      },
      {
        typeUser:'0',
        path: 'groupOrder',
        name: 'groupOrder',
        component: () => import('@/views/plan/groupOrder'),
        meta: {title: '团队订单', icon: 'table'},

        hidden: true
      },
      {
        typeUser:'0',
        path: 'planGroup',
        name: 'planGroup',
        component: () => import('@/views/plan/planGroup'),
        meta: {title: '计划团队拼团', icon: 'table'},

        hidden: true
      },{
        typeUser:'0',
        path: 'addGroup',
        name: 'addGroup',
        component: () => import('@/views/group/groupAdd'),
        meta: {title: '散客拼团', icon: 'table'},
        hidden: true
      }
      , {
        typeUser:'0',
        path: 'groupBz',
        name: 'groupBz',
        component: () => import('@/views/group/groupMoney'),
        meta: {title: '团队报账', icon: 'table'},
        hidden: true
      }
    ]
  },


  {
    path: '/money',
    component:
    Layout,
    hidden:
      false,
    typeUser:'0',
    name:
      'Order',
    meta:
      {
        title: '财务报表',
        icon:
          'nested',
        auth : 'PAYMENU'
      }
    ,
    children: [
      {
        typeUser:'0',
        path: 'szMoney',
        name: 'szMoney',
        component: () => import('@/views/money/szMoney'),
        meta: {title: '收支记录', icon: 'table',auth : 'PAYINFO'}
      }
      ,
      // {
      //   typeUser:'0',
      //   path: 'disMoney',
      //   name: 'disMoney',
      //   component: () => import('@/views/money/disMoney'),
      //   meta: {title: '分销商账目', icon: 'table',auth : 'PAYINFO'},
      // },
      {
        typeUser:'0',
        path: 'newDisMoney',
        name: 'newDisMoney',
        component: () => import('@/views/money/newDisMoney'),
        meta: {title: '分销商账目', icon: 'table',auth : 'PAYINFO'},
      },

      {
        typeUser:'0',
        path: 'disMoneyPlcz',
        name: 'disMoneyPlcz',
        component: () => import('@/views/money/disMoneyPlcz'),
        meta: {title: '分销商订单批量结算', icon: 'table',auth : 'PAYINFO'},
        hidden: true
      },
      {
        typeUser:'0',
        path: 'disMoneyList',
        name: 'disMoneyList',
        component: () => import('@/views/money/disMoneyList'),
        meta: {title: '分销商流水记录', icon: 'table',auth : 'PAYINFO'},
      },
      {
        typeUser:'0',
        path: 'supMoney',
        name: 'supMoney',
        component: () => import('@/views/money/supMoney'),
        meta: {title: '供应商账目', icon: 'table',auth : 'PAYINFO'},
      },
      {
        typeUser:'0',
        path: 'supMoneyQdgz',
        name: 'supMoneyQdgz',
        component: () => import('@/views/money/supMoneyQdgz'),
        meta: {title: '供应商签单挂账', icon: 'table',auth : 'PAYINFO'},
      },
      {
        typeUser:'0',
        path: 'supMoneyList',
        name: 'supMoneyList',
        component: () => import('@/views/money/supMoneyList'),
        meta: {title: '供应商流水记录', icon: 'table',auth : 'PAYINFO'},
      },
      {
        typeUser:'0',
        path: 'groupMonyList',
        name: 'groupMonyList',
        component: () => import('@/views/money/groupMonyList'),
        meta: {title: '计调报账', icon: 'table',auth : 'PAYINFO'},
      }
    ]

  }
  ,

  {
    path: '/distribute',
    component:
    Layout,
    typeUser:'0',
    name:
      'Distribute',
    meta:
      {
        title: '分销商管理', icon:
          'example',
        auth : 'DISMENU'
      }
    ,
    children: [
      {
        typeUser:'0',
        path: 'disType',
        name: 'DisType',
        component: () => import('@/views/distribute/disType'),
        meta: {title: '分销商类型', icon: 'table',auth:'DISTYPEINFO'}
      },
      {
        typeUser:'0',
        path: 'addNewDis',
        name: 'AddNewDis',
        component: () => import('@/views/distribute/addNewDis'),
        meta: {title: '增加分销商'},
        hidden: true
      },
      // {
      //   typeUser:'0',
      //   path: 'disList',
      //   name: 'DisList',
      //   component: () => import('@/views/distribute/disList'),
      //   meta: {title: '分销商列表', icon: 'table', affix: true,auth : 'DISINFO'}
      // },

      {
        typeUser:'0',
        path: 'disNewList',
        name: 'DisNewList',
        component: () => import('@/views/distribute/disNewList'),
        meta: {title: '分销商列表', icon: 'table', affix: true,auth : 'DISINFO'}
      }
    ]
  }
  ,

  {
    path: '/insu',
    component:
    Layout,
    typeUser:'0',
    name:
      'Insu',
    meta:
      {
        title: '保险管理', icon:
          'example'
      }
    ,
    children: [
      {
        typeUser:'0',
        path: 'insuList',
        name: 'insuList',
        component: () => import('@/views/insu/insuList'),
        meta: {title: '保险产品管理', icon: 'table'}
      },
      {
        typeUser:'0',
        path: 'insuHis',
        name: 'insuHis',
        component: () => import('@/views/insu/insuHis'),
        meta: {title: '投保记录', icon: 'table'}
      }

    ]
  },

  {
    path: '/support',
    component:
    Layout,
    typeUser:'0',
    name:
      'Support',
    meta:
      {
        title: '供应商管理', icon:
          'example',
        auth : 'SUPMENU'
      }
    ,
    children: [
      {
        typeUser:'0',
        path: 'supType',
        name: 'supType',
        component: () => import('@/views/support/supType'),
        meta: {title: '供应商类型', icon: 'table',auth : 'SUPTYPEINFO'}
      },

      {
        typeUser:'0',
        path: 'addNewSup',
        name: 'AddNewSup',
        component: () => import('@/views/support/addNewSup'),
        meta: {title: '增加供应商'},
        hidden: true
      },
      {
        typeUser:'0',
        path: 'supList',
        name: 'supList',
        component: () => import('@/views/support/supList'),
        meta: {title: '供应商列表', icon: 'table', affix: true,auth : 'SUPINFO'}
      },
      {
        typeUser:'0',
        path: 'proCarType',
        name: 'proCarType',
        component: () => import('@/views/support/proCarType'),
        meta: {title: '车型管理设置', icon: 'table',auth : 'CARTYPEINFO'}
      },
      {
        typeUser:'0',
        path: 'carList',
        name: 'carList',
        component: () => import('@/views/tourist/carList'),
        meta: {title: '车辆管理', icon: 'table',auth : 'CARINFO'}
      },
      {
        typeUser:'0',
        path: 'addNewCar',
        name: 'addNewCar',
        component: () => import('@/views/tourist/addNewCar'),
        meta: {title: '增加车辆', icon: 'table'},
        hidden: true
      }
    ]
  }
  ,


  {
    path: '/guide',
    component:
    Layout,
    typeUser:'0',
    name:
      'Guide',
    meta:
      {
        title: '导游管理', icon:
          'example',
        auth : 'GUIDERMENU'
      }
    ,
    children: [
      {
        typeUser:'0',
        path: 'guideType',
        name: 'guideType',
        component: () => import('@/views/guide/guideType'),
        meta: {title: '导游类型', icon: 'table',auth : 'GUIDERTYPEINFO'}
      },
      {
        typeUser:'0',
        path: 'guideList',
        name: 'guideList',
        component: () => import('@/views/guide/guideList'),
        meta: {title: '导游列表', icon: 'table',auth : 'GUIDERINFO'}
      },
      {
        typeUser:'0',
        path: 'addNewGuide',
        name: 'addNewGuide',
        component: () => import('@/views/guide/addNewGuide'),
        meta: {title: '增加导游', icon: 'table'},
        hidden: true
      },
      {
        typeUser:'0',
        path: 'guiderInfo',
        name: 'guiderInfo',
        component: () => import('@/views/guide/guiderInfo'),
        meta: {title: '导游详情', icon: 'table'},
        hidden: true
      },


    ]
  }
  ,
  {
    path: '/tourist',
    component:
    Layout,
    typeUser:'0',
    name:
      'Tourist',
    meta:
      {
        title: '游客管理', icon:
          'example',
        auth : 'TOUMUNE'
      }
    ,
    children: [

      {
        typeUser:'0',
        path: 'touristList',
        name: 'touristList',
        component: () => import('@/views/tourist/touristList'),
        meta: {title: '游客列表', icon: 'table',auth : 'TOUINFO'}
      },
      // {
      //   typeUser:'0',
      //   path: 'blackTouristList',
      //   name: 'BlackTouristList',
      //   component: () => import('@/views/tourist/blackTouristList'),
      //   meta: {title: '游客黑名单', icon: 'table',auth : 'TOUINFO'}
      // },
      {
        typeUser:'0',
        path: 'addNewTourist',
        name: 'addNewTourist',
        component: () => import('@/views/tourist/addNewTourist'),
        meta: {title: '编辑游客', icon: 'table'},
        hidden: true
      }



    ]
  },
  {
    path: '/inv',
    component:
    Layout,
    typeUser:'0',
    name:
      'inv',
    meta:
      {
        title: '发票管理', icon:
          'example',
        auth : 'INVMENU'
      }
    ,
    children: [
      // {
      //   typeUser:'0',
      //   path: 'addInvoice',
      //   name: 'addInvoice',
      //   component: () => import('@/views/invoice/addInvoice'),
      //   meta: {title: '申请发票',auth : 'INVUPDATE'},
      //   hidden: false
      // },
      {
        typeUser:'0',
        path: 'addNewInvoice',
        name: 'addNewInvoice',
        component: () => import('@/views/invoice/addNewInvoice'),
        meta: {title: '申请发票',auth : 'INVUPDATE'},
        hidden: false
      },
      {
        typeUser:'0',
        path: 'invList',
        name: 'invList',
        component: () => import('@/views/invoice/invList'),
        meta: {title: '发票管理',auth : 'INVINFO'},
        hidden: false
      },
    ]
  },
  {
    path: '/dataChart',
    component:
    Layout,
    typeUser:'0',
    name:
      'dataChart',
    meta:
      {
        title: '数据分析', icon:
          'example',
        auth:'DATAMENU'
      }
    ,
    children: [
      {
        typeUser:'0',
        path: 'groupChart',
        name: 'groupChart',
        component: () => import('@/views/dataChart/groupChart'),
        meta: {title: '出团数据分析',auth : 'DATAMENU'},
        hidden: false
      },
      {
        typeUser:'0',
        path: 'disPayChart',
        name: 'disPayChart',
        component: () => import('@/views/dataChart/disPayChart'),
        meta: {title: '营业额数据分析',auth : 'DATAMENU'},
        hidden: false
      },
      {
        typeUser:'0',
        path: 'earnChart',
        name: 'earnChart',
        component: () => import('@/views/dataChart/earnChart'),
        meta: {title: '毛利数据分析',auth : 'DATAMENU'},
        hidden: false
      },
      // {
      //   typeUser:'0',
      //   path: 'disSaleList',
      //   name: 'disSaleList',
      //   component: () => import('@/views/dataChart/disSaleList'),
      //   meta: {title: '分销商销售排行',auth : 'DATAMENU'},
      //   hidden: false
      // },
      {
        typeUser:'0',
        path: 'disSaleRank',
        name: 'disSaleRank',
        component: () => import('@/views/dataChart/disSaleRank'),
        meta: {title: '分销商销售排行',auth : 'DATAMENU'},
        hidden: false
      },
      {
        typeUser:'0',
        path: 'adminSaleList',
        name: 'adminSaleList',
        component: () => import('@/views/dataChart/adminSaleList'),
        meta: {title: '业务员销售排行',auth : 'DATAMENU'},
        hidden: false
      },
    ]
  },
  {
    path: '/manager',
    component:
    Layout,
    typeUser:'0',
    name:
      'Manager',
    meta:
      {
        title: '系统设置', icon:
          'example',
        auth: 'MANAGEMENU'
      }
    ,
    children: [
      {
        typeUser:'0',
        path: 'managerType',
        name: 'ManagerType',
        component: () => import('@/views/manager/managerType'),
        meta: {title: '管理组设置', icon: 'table',auth : 'ROLEINFO'}
      },
      {
        typeUser:'0',
        path: 'managerList',
        name: 'managerList',
        component: () => import('@/views/manager/managerList'),
        meta: {title: '管理员列表', icon: 'table',auth : 'MANAGEINFO'}
      },
      {
        typeUser:'0',
        path: 'managerRole',
        name: 'ManagerRole',
        component: () => import('@/views/manager/managerRole'),
        meta: {title: '管理员权限控制', icon: 'table',auth : 'MANAGEINFO'},
        hidden:true
      },
      {
        typeUser:'0',
        path: 'viewpoint',
        name: 'viewpoint',
        component: () => import('@/views/viewpoint/viewpointList'),
        meta: {title: '景点管理', icon: 'table',auth : 'VIEWPOINTINFO'},
        hidden:false
      },
      {
        typeUser:'0',
        path: 'addViewpoint',
        name: 'addViewpoint',
        component: () => import('@/views/viewpoint/addViewpoint'),
        meta: {title: '景点管理', icon: 'table'},
        hidden:true
      },
      {
        typeUser:'0',
        path: 'viewpointInfo',
        name: 'viewpointInfo',
        component: () => import('@/views/viewpoint/viewpointInfo'),
        meta: {title: '景点详情', icon: 'table'},
        hidden:true
      },
      {
        typeUser:'0',
        path: '/resource',
        name: 'Resource',
        component: () => import('@/views/resource/baseResource'),
        meta: {title: '系统资源', icon: 'example',auth : 'RESOURCEINFO'},
        children: [
          {
            typeUser:'0',
            path: 'imageResource',
            name: 'ImageResource',
            component: () => import('@/views/resource/imageResource'),
            meta: {title: '图片资源', icon: 'table',auth : 'RESOURCEINFO'}
          },
          {
            typeUser:'0',
            path: 'videoResource',
            name: 'VideoResource',
            component: () => import('@/views/resource/videoResource'),
            meta: {title: '视频资源', icon: 'table',auth : 'RESOURCEINFO'}
          },
          {
            typeUser:'0',
            path: 'docResource',
            name: 'DocResource',
            component: () => import('@/views/resource/docResource'),
            meta: {title: '文档资源', icon: 'table',auth : 'RESOURCEINFO'}
          }
        ]
      },

      {
        path: 'managerInfo',
        name: 'managerInfo',
        component: () => import('@/views/manager/managerInfo'),
        meta: {title: '管理员详情', icon: 'table'},
        hidden: true
      },
      {
        path: 'addManager',
        name: 'addManager',
        component: () => import('@/views/manager/addManager'),
        meta: {title: '新增管理员', icon: 'table'},
        hidden: true
      },
      {
        path: 'sysInfo',
        name: 'sysInfo',
        component: () => import('@/views/system/sysInfo'),
        meta: {title: '系统基本信息', icon: 'table',auth : 'SYSINFO'},
      },
      {
        path: 'stampManager',
        name: 'stampManager',
        component: () => import('@/views/system/sysStamp'),
        meta: {title: '系统印章管理', icon: 'table',auth : 'STAMPINFO'},
      },
      {
        path: 'templateList',
        name: 'templateList',
        component: () => import('@/views/production/templateList'),
        meta: {title: '团队成本模版', icon: 'table',auth:'NO'},
        hidden: false
      },
      {
        path: 'payChannel',
        name: 'payChannel',
        component: () => import('@/views/money/payChannelList'),
        meta: {title: '资金渠道管理', icon: 'table',auth : 'PAYCHANNELINFO'},
        hidden: false
      },

      {
        path: 'logList',
        name: 'logList',
        component: () => import('@/views/manager/logList'),
        meta: {title: '系统日志', icon: 'table',auth : 'LOGINFO'}
      },
    ]
  },

  {
    path: '/disAccount',
    component:
    Layout,
    typeUser:'DISACCOUNT',
    name:
      'myDis',
    meta:
      {
        title: '我是分销商', icon:
          'example',
        auth: 'DISMENU'
      }
    ,
    children: [
      {
        typeUser:'DISACCOUNT',
        path: 'disOrderList',
        name: 'disOrderList',
        component: () => import('@/views/disAccount/disOrderList'),
        meta: { title: '订单列表', icon: 'table', auth: 'DISINFO' }
      },
      {
        typeUser:'DISACCOUNT',
        path: 'productList',
        name: 'productList',
        component: () => import('@/views/disAccount/productList'),
        meta: {title: '散客产品', icon: 'nested',affix: true , auth : 'PROINFO' }
      },
      {
        typeUser:'DISACCOUNT',
        path: 'disUserList',
        name: 'disUserList',
        component: () => import('@/views/disAccount/disUserList'),
        meta: { title: '业务员列表', icon: 'table', auth: 'DISINFO' }
      },
      {
        typeUser:'0',
        path: 'productInfo',
        name: 'ProductInfo',
        component: () => import('@/views/disAccount/productInfo'),
        meta: {title: '旅游产品详情', icon: 'table'},
        hidden: true
      },
      {
        typeUser:'0',
        path: 'addDisOrder',
        name: 'AddDisOrder',
        component: () => import('@/views/disAccount/addDisOrder'),
        meta: {title: '编辑订单', icon: 'table'},
        hidden: true
      }
      ,
      {
        typeUser:'0',
        path: 'secDisOrderList',
        name: 'SecDisOrderList',
        component: () => import('@/views/disAccount/secDisOrderList'),
        meta: {title: '业务员订单', icon: 'table'},
        hidden: true
      }
      ,
    ]
  },



  {
    path: '/printOrder',
    name: '/printOrder',
    component: () => import('@/views/order/printOrder'),
    hidden:true
  },
  {
    path: '/printTry',
    name: '/printTry',
    component: () => import('@/views/order/printTry'),
    hidden:true
  },
  { path: '/', redirect: '/login', hidden: true },
// 404 page must be placed at the end !!!
  {
    path: '*', redirect:
      '/404', hidden:
      false
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
