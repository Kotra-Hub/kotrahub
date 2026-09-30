<template>
  <aside class="main-sidebar" :style="{ backgroundColor: sidebarColor }">
      

      <v-btn
        v-for="item in mainMenu"
        :key="item.key"
        variant="text"
        stacked
        class="menu-btn" size="small" density="compact"
        :class="{ active: selected === item.key }"
        @click="selectMenu(item)"
      >
        <v-icon class="menu-icon">{{ item.icon }}</v-icon>
        <span class="menu-label">{{ item.label }}</span>
      </v-btn>
  </aside>

  <aside v-if="selected !== 'home'" class="second-sidebar" :style="{ backgroundColor: sidebarColor }">
      <v-list density="compact">
        <div
          v-for="sub in secondMenu"
          :key="sub.label"
          class="submenu-btn"
          :class="{ active: isSubActive(sub) }"
          @click="handleNavigate(sub.page || sub.label)"
        >
          <v-icon class="submenu-icon">{{ sub.icon }}</v-icon>
          <span class="submenu-text">{{ sub.label }}</span>
        </div>
      </v-list>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const props = defineProps<{
  isOpen:boolean
}>()

const emit = defineEmits<{
  (e:'navigate', page:string):void
}>()

const theme = useTheme()
const route = useRoute()
const router = useRouter()

const sidebarColor = computed(() => {
  return theme.global.current.value.dark
    ? 'rgb(22, 35, 56)'
    : 'rgb(255, 255, 255)'
})

const selected = ref('home')

const mainMenu = [
  {key:'home', label:'Home', icon:'mdi-home'},
  {key:'requisitions', label:'Requisitions', icon:'mdi-file-document'},
  {key:'staff', label:'Staff', icon:'mdi-account'},
  {key:'organization', label:'Organization', icon:'mdi-office-building'},
  {key:'procurement', label:'Procurement', icon:'mdi-cart'},
  {key:'inventory', label:'Inventory', icon:'mdi-package'},
  {key:'plant', label:'Plant', icon:'mdi-factory'},
  {key:'support', label:'Support', icon:'mdi-tools'},
  {key:'administration', label:'Administration', icon:'mdi-cog'}
]



watch(() => route.path, (path) => {
  const found = mainMenu.find((m:any) => {
    if (m.key === 'requisitions') {
      return path.includes('/requisitions')
    }
    return path.includes('/' + m.key)
  })
  if (found) selected.value = found.key
}, { immediate:true })

const secondMenu = computed(()=>{
  const menus:any = {
    requisitions:[
      {label:'General Requisitions',icon:'mdi-file-document-outline',page:'/main/requisitions/general'},
      {label:'System Requisitions',icon:'mdi-file-cog-outline',page:'/main/requisitions/system'}
    ],
    staff:[
      {label:'Onboarding',icon:'mdi-account-plus',page:'/main/staff/onboarding'},
      {label:'Offboarding',icon:'mdi-account-minus',page:'/main/staff/offboarding'},
      {label:'Positions',icon:'mdi-account-tie',page:'/main/staff/positions'},
      {label:'Grades',icon:'mdi-star-outline',page:'/main/staff/grades'}
    ],
    organization:[
      {label:'Departments',icon:'mdi-office-building',page:'/main/organization/departments'},
      {label:'Locations',icon:'mdi-map-marker',page:'/main/organization/locations'},
      {label:'Events',icon:'mdi-calendar',page:'/main/organization/events'},
      {label:'Announcements',icon:'mdi-bullhorn',page:'/main/organization/announcements'},
      {label:'Phone Directory',icon:'mdi-phone',page:'/main/organization/phonedirectory'}
    ],
    procurement:[
      {label:'Purchase Orders (PO)',icon:'mdi-cart-outline',page:'/main/procurement/purchase-orders'},
      {label:'Vendor',icon:'mdi-account-group',page:'/main/procurement/vendor'},
      {label:'Terms & Conditions',icon:'mdi-file-check-outline'}
    ],
    inventory:[
      {label:'Requests',icon:'mdi-clipboard-list',page:'/main/inventory/requests'},
      {label:'Assets & Equipment',icon:'mdi-package-variant',page:'/main/inventory/assets-equipment'},
      {label:'Consumables',icon:'mdi-package',page:'/main/inventory/consumables'},
      {label:'Raw Material',icon:'mdi-cube-outline',page:'/main/inventory/raw-material'},
      {label:'Lots',icon:'mdi-layers',page:'/main/inventory/lots'}
    ],
    plant:[
      {label:'Production Planning',icon:'mdi-chart-timeline'},
      {label:'Batch Manufacturing',icon:'mdi-factory'},
      {label:'Formulas',icon:'mdi-flask-outline'},
      {label:'Dispensing',icon:'mdi-beaker-outline'},
      {label:'Setup Procedure',icon:'mdi-cog-outline'},
      {label:'Redress',icon:'mdi-refresh'},
      {label:'Nutritional',icon:'mdi-food-apple'}
    ],
    support:[
      {label:'Inquiries & Tickets',icon:'mdi-ticket-outline'},
      {label:'System Feedback',icon:'mdi-message-text'},
      {label:'User Acceptance Testing (UAT)',icon:'mdi-test-tube'}
    ],
    administration:[
      {label:'Users',icon:'mdi-account-multiple'},
      {label:'Roles',icon:'mdi-shield-account'},
      {label:'Workflow & Approval',icon:'mdi-source-branch'},
      {label:'Modules',icon:'mdi-view-grid'}
    ]
  }
  return menus[selected.value] || []
})

const selectedLabel = computed(()=>{
  return mainMenu.find(x=>x.key===selected.value)?.label || ''
})

function selectMenu(item:any){
  selected.value = item.key

  // Main menu with second navigation only opens submenu
  if(item.key === 'requisitions'){
    return
  }

  if(item.key === 'home'){
    router.push('/main/dashboard')
    return
  }
}

function isSubActive(sub:any){
  return sub.page ? route.path === sub.page : false
}

function handleNavigate(page:string){
  if(page.startsWith('/')){
    router.push(page)
  } else {
    emit('navigate',page)
  }
}
</script>

<style scoped>
.main-sidebar,.second-sidebar{
 overflow-y:auto;
}
.main-sidebar{
 padding:12px 8px;
 overflow-x:hidden;
 width:120px;
 min-width:120px;
 border-right:1px solid rgba(0,0,0,.08);
}
.second-sidebar{
 width:220px;
 padding:16px;
}
.brand{
 font-size:18px;
 font-weight:800;
 letter-spacing:.5px;
 color:#14213d;
 text-align:center;
 margin-bottom:20px;
}
.logo{
 font-size:12px;
 font-weight:700;
 text-align:center;
 margin-bottom:15px;
}

.menu-btn{
 min-width:0 !important;
 width:100%;
 min-width:90px;
 padding:8px 10px !important;
 margin:0 0 10px 0 !important;
 overflow:hidden;
}

.menu-icon{
 font-size:18px;
 margin-bottom:4px;
}

.menu-label{
 font-size:11px;
 line-height:14px;
 text-align:center;
  white-space:normal;
 overflow:visible;
 text-overflow:clip;
 max-width:100%;
}
.menu-btn.active,
.menu-btn.active .v-icon{
 color:#009e9a;
}
.second-title{
 font-weight:700;
 margin-bottom:12px;
}
.submenu-btn{
 width:100%;
 color:#555;
 min-height:40px;
 padding:8px 0;
 cursor:pointer;
 white-space:normal;
 display:flex;
 align-items:center;
 gap:4px;
 flex-wrap:nowrap;
}
.submenu-icon{
 margin-right:0;
 font-size:20px;
 flex:0 0 auto;
}
.submenu-text{
 font-size:14px;
 line-height:1.3;
 white-space:normal;
 overflow-wrap:anywhere;
}
.second-sidebar .v-list-item{
 padding-inline:0 !important;
}




.second-sidebar .submenu-btn .v-icon{
 margin-right:2px !important;
}

.second-sidebar :deep(.v-list-item__prepend .v-icon){
 margin:0 !important;
}




.submenu-btn.active{
 color:#009e9a;
 font-weight:600;
}

.submenu-btn:hover{
 color:#009e9a;
}


/* Dark mode second menu */
.v-theme--DarkTheme .second-sidebar .submenu-btn{
 color:#ffffff !important;
}
.v-theme--DarkTheme .second-sidebar .submenu-btn .submenu-icon{
 color:#ffffff !important;
}
.v-theme--DarkTheme .second-sidebar .submenu-btn.active,
.v-theme--DarkTheme .second-sidebar .submenu-btn.active .submenu-icon{
 color:#009e9a !important;
}

</style>


/* Phone Directory email single line ellipsis */
.phone-email-ellipsis {
  display: block;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
