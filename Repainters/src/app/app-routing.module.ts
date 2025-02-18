import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import("./modules/login/login.module").then(m => m.LoginModule) },
  { path: 'enquiry', loadChildren: () => import('./modules/enquiry/enquiry.module').then(m => m.EnquiryModule) },
  { path: '', redirectTo: '/login/view', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import("./modules/dashboard/dashboard.module").then(m => m.DashboardModule) },
  { path: 'quotation-builder', loadChildren: () => import('./modules/quotation-builder/quotation-builder.module').then(m => m.QuotationBuilderModule) },
  { path: 'internalpainting', loadChildren: () => import("./modules/internal-painiting/internal-painting.module").then(m => m.InternalPaintingModule) },
  { path: 'requirement', loadChildren: () => import("./modules/requirement/requiremetn.module").then(m => m.RequiremetnModule) },
  { path: 'texture-painting', loadChildren: () => import("./modules/texture-painting/texture-painting.module").then(m => m.TexturePaintingModule) },
  { path: 'paneling', loadChildren: () => import("./modules/paneling/paneling.module").then(m => m.PanelingModule) },
  { path: 'curtains', loadChildren: () => import("./modules/curtains/curtains.module").then(m => m.CurtainsModule) },
  { path: 'furniture', loadChildren: () => import("./modules/furniture/furniture.module").then(m => m.FurnitureModule) },
  { path: 'services', loadChildren: () => import("./modules/services/services.module").then(m => m.ServicesModule) },
  { path: 'door_grills', loadChildren: () => import("./modules/door-grills/door-grills.module").then(m => m.DoorGrillsModule) },
  { path: 'note', loadChildren: () => import("./modules/note/note.module").then(m => m.NoteModule) },
  { path:'package',loadChildren:()=>import("./modules/package/package.module").then(m=>m.PackageModule)},
  { path: 'sidebar', loadChildren: () => import("./modules/sidebar/sidebar.module").then(m => m.SidebarModule) },
  { path: 'wallpaper', loadChildren: () => import("./modules/wallpaper/wallpaper.module").then(m => m.WallpaperModule) },
  { path: 'customer', loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule) },
  {path:  'summary',loadChildren:()=>import("./modules/summary/summary.module").then(m=>m.SummaryModule)},
  {path:'procurement',loadChildren:()=>import("./modules/procurement/procurement.module").then(m=>m.ProcurementModule)},
  {path:'video',loadChildren:()=>import("./modules/video/video.module").then(m=>m.VideoModule)},
  {path:'testimonials',loadChildren:()=>import("./modules/testimonials/testimonials.module").then(m=>m.TestimonialsModule)},
  {path:'register',loadChildren:()=>import("./modules/register/register.module").then(m=>m.RegisterModule)},
  {path:'additional',loadChildren:()=>import("./modules/additionals/additionals.module").then(m=>m.AdditionalsModule)},
  {path:'product',loadChildren:()=>import("./modules/product/product.module").then(m=>m.ProductModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }