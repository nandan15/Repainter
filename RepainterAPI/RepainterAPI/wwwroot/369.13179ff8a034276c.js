"use strict";(self.webpackChunkRepainters=self.webpackChunkRepainters||[]).push([[369],{6369:(x,s,i)=>{i.r(s),i.d(s,{DashboardModule:()=>f});var d=i(177),e=i(7705),a=i(7062);let g=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=e.VBU({type:t,selectors:[["app-dashboard-view"]],decls:1,vars:0,template:function(n,r){1&n&&e.nrm(0,"router-outlet")},dependencies:[a.n3]})}}return t})();var p=i(4651),c=i(4037);const l=function(t){return{expanded:t}},m=function(t){return{"sidebar-expanded":t}},u=[{path:"",component:g,children:[{path:"dashboard",component:(()=>{class t{constructor(o,n){this.router=o,this.navigationService=n,this.isSidebarExpanded=!0,this.statsData=[{icon:"/assets/icon1.png",number:"Unmatched Expertise",description:"400+ Completed Projects"},{icon:"/assets/icon2.png",number:"Modern & Innovative",description:"Latest Cutting-edge Technology"},{icon:"/assets/icon3.png",number:"Skilled Workforce",description:"600+ Expert Painters"},{icon:"/assets/icon4.png",number:"100% Proven Track Record",description:"All Projects Handed Over On Time!"},{icon:"/assets/icon5.png",number:"Quality Assurance",description:"Best In Class Products and Material"},{icon:"/assets/icon6.png",number:"Customer Centric Approach",description:"Your Satisfaction Is Our Priority, Always!"}],this.customerId=this.navigationService.getCustomerId()}ngOnInit(){}onSidebarToggle(o){this.isSidebarExpanded=o}goBackToQuote(){this.customerId?(this.router.navigate(["/quotation-builder/view",this.customerId]),this.navigationService.clearCustomerId()):this.router.navigate(["/quotation-builder/view"])}static{this.\u0275fac=function(n){return new(n||t)(e.rXU(a.Ix),e.rXU(p.o))}}static{this.\u0275cmp=e.VBU({type:t,selectors:[["app-dashboard"]],decls:74,vars:6,consts:[[1,"layout-container"],[1,"sidebar",3,"ngClass"],[3,"sidebarToggled"],[1,"main-content",3,"ngClass"],[1,"header"],[1,"header-left"],["src","/assets/logo.png","alt","Logo"],[1,"header-right"],[1,"notification-btn"],[1,"fas","fa-bell"],[1,"notification-badge"],[1,"user-profile"],["src","assets/avatar.jpg","alt","User"],[1,"dashboard-container"],[1,"page-header"],[1,"btn-primary",3,"click"],[1,"content-section"],[1,"stats-container"],[1,"stat-card"],[1,"stat-icon"],[1,"fas","fa-check-circle"],[1,"stat-content"],[1,"stat-number"],[1,"stat-description"],[1,"fas","fa-comments"],[1,"fas","fa-paint-brush"],[1,"fas","fa-thumbs-up"],[1,"fas","fa-clock"],[1,"fas","fa-star"]],template:function(n,r){1&n&&(e.j41(0,"div",0)(1,"div",1)(2,"app-view",2),e.bIt("sidebarToggled",function(C){return r.onSidebarToggle(C)}),e.k0s()(),e.j41(3,"div",3)(4,"header",4)(5,"div",5),e.nrm(6,"img",6),e.k0s(),e.j41(7,"div",7)(8,"button",8),e.nrm(9,"i",9),e.j41(10,"span",10),e.EFF(11,"3"),e.k0s()(),e.j41(12,"div",11),e.nrm(13,"img",12),e.j41(14,"span"),e.EFF(15,"John Doe"),e.k0s()()()(),e.j41(16,"div",13)(17,"div",14)(18,"h1"),e.EFF(19,"Espresso, Home Improvement Speacialists"),e.k0s(),e.j41(20,"button",15),e.bIt("click",function(){return r.goBackToQuote()}),e.EFF(21," Back to Quote "),e.k0s()(),e.j41(22,"div",16)(23,"h2"),e.EFF(24,"Vibgyor. A legacy of excellence built over 50 years."),e.k0s(),e.j41(25,"div",17)(26,"div",18)(27,"div",19),e.nrm(28,"i",20),e.k0s(),e.j41(29,"div",21)(30,"div",22),e.EFF(31,"400+"),e.k0s(),e.j41(32,"div",23),e.EFF(33,"Completed Projects"),e.k0s()()(),e.j41(34,"div",18)(35,"div",19),e.nrm(36,"i",24),e.k0s(),e.j41(37,"div",21)(38,"div",22),e.EFF(39,"Direct Interaction"),e.k0s(),e.j41(40,"div",23),e.EFF(41,"No Middlemen or Subcontractors"),e.k0s()()(),e.j41(42,"div",18)(43,"div",19),e.nrm(44,"i",25),e.k0s(),e.j41(45,"div",21)(46,"div",22),e.EFF(47,"600+"),e.k0s(),e.j41(48,"div",23),e.EFF(49,"Expert Painters"),e.k0s()()(),e.j41(50,"div",18)(51,"div",19),e.nrm(52,"i",26),e.k0s(),e.j41(53,"div",21)(54,"div",22),e.EFF(55,"100%"),e.k0s(),e.j41(56,"div",23),e.EFF(57,"Proven Track Record"),e.k0s()()(),e.j41(58,"div",18)(59,"div",19),e.nrm(60,"i",27),e.k0s(),e.j41(61,"div",21)(62,"div",22),e.EFF(63,"On Time!"),e.k0s(),e.j41(64,"div",23),e.EFF(65,"All Projects Handed Over On Time!"),e.k0s()()(),e.j41(66,"div",18)(67,"div",19),e.nrm(68,"i",28),e.k0s(),e.j41(69,"div",21)(70,"div",22),e.EFF(71,"Best In Class"),e.k0s(),e.j41(72,"div",23),e.EFF(73,"Quality Assurance Products"),e.k0s()()()()()()()()),2&n&&(e.R7$(1),e.Y8G("ngClass",e.eq3(2,l,r.isSidebarExpanded)),e.R7$(2),e.Y8G("ngClass",e.eq3(4,m,r.isSidebarExpanded)))},dependencies:[d.YU,c.v],styles:[".layout-container[_ngcontent-%COMP%]{display:flex;min-height:100vh;background-color:#b4e0d8;background-image:url(/assets/espressobackground.jpg);background-size:cover;background-repeat:no-repeat;background-position:center}.sidebar[_ngcontent-%COMP%]{position:fixed;height:100vh;background:rgba(158,213,203,.9);width:80px;transition:width .3s ease;z-index:50;box-shadow:2px 0 10px #0000001a}.sidebar.expanded[_ngcontent-%COMP%]{width:280px}.main-content[_ngcontent-%COMP%]{flex:1;margin-left:80px;transition:margin-left .3s ease}.main-content.sidebar-expanded[_ngcontent-%COMP%]{margin-left:280px}.header[_ngcontent-%COMP%]{height:90px;background:rgba(26,28,35,.9);border-bottom:1px solid rgba(143,201,192,.3);display:flex;align-items:center;justify-content:space-between;padding:0 2rem}.header-left[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:70px;object-fit:contain}.header-right[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1.5rem}.notification-btn[_ngcontent-%COMP%]{position:relative;background:rgba(255,255,255,.1);padding:.5rem;border-radius:50%;border:none;cursor:pointer}.notification-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1rem;color:#b4e0d8}.notification-badge[_ngcontent-%COMP%]{position:absolute;top:-5px;right:-5px;background:#FF9E9E;color:#fff;font-size:.75rem;padding:.125rem .375rem;border-radius:9999px}.user-profile[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem;background:rgba(255,255,255,.1);padding:.5rem;border-radius:.5rem}.user-profile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:40px;width:40px;border-radius:9999px;object-fit:cover;border:2px solid #8FC9C0}.user-profile[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.875rem;font-weight:700;color:#b4e0d8}.dashboard-container[_ngcontent-%COMP%]{padding:2rem}.page-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2.5rem;font-weight:700;color:#fff;text-shadow:2px 2px 4px rgba(0,0,0,.3)}.content-section[_ngcontent-%COMP%]{background-color:#fffffff2;border-radius:1rem;padding:2rem;box-shadow:0 4px 20px #0000001a}.content-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#2d3748;font-size:1.875rem;font-weight:700;text-align:center;margin-bottom:2rem}.stats-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;padding:1rem}.stat-card[_ngcontent-%COMP%]{background:white;border-radius:1rem;padding:2rem;box-shadow:0 4px 12px #0000000d;border-left:5px solid #8FC9C0;transition:transform .3s ease,box-shadow .3s ease;min-height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.stat-card[_ngcontent-%COMP%]:hover{transform:translateY(-5px);box-shadow:0 8px 24px #0000001a}.stat-icon[_ngcontent-%COMP%]{font-size:2.5rem;color:#8fc9c0;margin-bottom:1.5rem}.stat-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem}.stat-number[_ngcontent-%COMP%]{font-size:2rem;font-weight:700;color:#2d3748;line-height:1.2}.stat-description[_ngcontent-%COMP%]{font-size:1rem;color:#4a5568;line-height:1.4}.btn-primary[_ngcontent-%COMP%]{background:#8FC9C0;color:#fff;padding:.75rem 1.5rem;border-radius:.5rem;font-weight:700;border:none;display:flex;align-items:center;gap:.5rem;transition:background-color .3s ease}.btn-primary[_ngcontent-%COMP%]:hover{background:#7AB3AA}.btn-primary[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.25rem}@media (max-width: 1200px){.stats-container[_ngcontent-%COMP%]{grid-template-columns:repeat(2,1fr)}}@media (max-width: 768px){.stats-container[_ngcontent-%COMP%]{grid-template-columns:1fr}.main-content[_ngcontent-%COMP%]{margin-left:0}.page-header[_ngcontent-%COMP%]{flex-direction:column;gap:1rem;text-align:center}.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2rem}}"]})}}return t})(),children:[{path:"",component:c.v}]}]}];let h=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275mod=e.$C({type:t})}static{this.\u0275inj=e.G2t({imports:[a.iI.forChild(u),a.iI]})}}return t})();var b=i(8355);let f=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275mod=e.$C({type:t})}static{this.\u0275inj=e.G2t({imports:[d.MD,h,b.SidebarModule]})}}return t})()}}]);