import { DashboardViewComponent } from "./view/view.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Router, Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { SidebarComponent } from "../sidebar/sidebar/sidebar.component";
import { ViewComponent } from "../sidebar/view/view.component";
const dashboardRoutes: Routes = [
    {path: '', component: DashboardViewComponent,children: [
{path: 'dashboard',component: DashboardComponent,children: [
{path: '',component: ViewComponent 
                    }
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule],
})
export class dashboardRouter{}