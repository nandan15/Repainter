"use strict";(self.webpackChunkRepainters=self.webpackChunkRepainters||[]).push([[508],{3508:(y,b,s)=>{s.r(b),s.d(b,{FurnitureModule:()=>m});var u=s(177),C=s(33),c=s(7705);const t=[{path:"",component:(()=>{class a{static{this.\u0275fac=function(l){return new(l||a)}}static{this.\u0275cmp=c.VBU({type:a,selectors:[["app-view"]],decls:2,vars:0,template:function(l,M){1&l&&(c.j41(0,"p"),c.EFF(1,"view works!"),c.k0s())}})}}return a})(),children:[{path:"furniture",component:s(2212).U}]}];let F=(()=>{class a{static{this.\u0275fac=function(l){return new(l||a)}}static{this.\u0275mod=c.$C({type:a})}static{this.\u0275inj=c.G2t({imports:[C.iI.forChild(t),C.iI]})}}return a})();var v=s(9417);let m=(()=>{class a{static{this.\u0275fac=function(l){return new(l||a)}}static{this.\u0275mod=c.$C({type:a})}static{this.\u0275inj=c.G2t({imports:[u.MD,F,v.X1]})}}return a})()},2212:(y,b,s)=>{s.d(b,{U:()=>$});var u=s(9417),C=s(1413),c=s(7468),f=s(6977);class g{}var t=s(7705),F=s(33),v=s(4412),m=s(8141),a=s(8032),O=s.n(a),h=s(6813),l=s(1626);let M=(()=>{class o{constructor(e){this.httpClient=e,this.baseUrl=h.c.backend.baseURL,this.furnitureMethod=this.baseUrl+"v1/furniture"}addFurniture(e){return this.httpClient.post(this.furnitureMethod+"/create",e)}listFurniture(e=""){return this.httpClient.get(this.furnitureMethod+e)}updateFurniture(e){return this.httpClient.post(`${this.furnitureMethod}/update/${e.furnitureId}`,e)}deleteFurniture(e){return this.httpClient.delete(`${this.furnitureMethod}/delete/${e}`)}getFurnitureByCustomerId(e){return this.httpClient.get(`${this.furnitureMethod}/customer/${e}`)}static{this.\u0275fac=function(r){return new(r||o)(t.KVO(l.Qq))}}static{this.\u0275prov=t.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var P=s(5794);let I=(()=>{class o{get furniture(){return this._furniture.asObservable()}get furnitures(){return this._furnitures.asObservable()}constructor(e,r){this.furnitureService=e,this.toaster=r,this._furniture=new v.t([]),this.furnitureList={furniture:[]},this._furnitures=new v.t(new g),this.currentFurniture={_furnitures:new g}}addFurniture(e){return this.furnitureService.addFurniture(e).pipe((0,m.M)({next:r=>{e.furnitureId=r.created_id,e.createdOn=e.createdOn||new Date,e.lastModifiedOn=new Date,this.furnitureList.furniture.push(e),this._furniture.next([...this.furnitureList.furniture]),this.toaster.success("Furniture Confirmed Successfully","Confirmation"),O().fire({icon:"success",title:"Success!",text:"Furniture data saved successfully",confirmButtonText:"OK"})},error:r=>{this.toaster.error("Failed to add Furniture","Error"),console.error("Error adding furniture:",r),O().fire({icon:"error",title:"Error!",text:"Failed to save furniture data.",confirmButtonText:"OK"})}}))}updateFurniture(e){return this.furnitureService.updateFurniture(e).pipe((0,m.M)(r=>{e.lastModifiedOn=new Date;const n=this.furnitureList.furniture.findIndex(i=>i.furnitureId===e.furnitureId);-1!==n&&(this.furnitureList.furniture[n]=e),this._furniture.next(Object.assign({},this.furnitureList).furniture),this.toaster.success("Furniture Updated Successfully","Confirmation")}))}listFurniture(e=""){return this.furnitureService.listFurniture(e).pipe((0,m.M)(r=>{this.furnitureList.furniture=r,this._furniture.next(Object.assign({},this.furnitureList).furniture)}))}getFurnitureByCustomerId(e,r){return this.furnitureService.getFurnitureByCustomerId(e).pipe((0,m.M)(n=>{n&&n.length>0&&(this.furnitureList.furniture=n,this._furniture.next(Object.assign({},this.furnitureList).furniture))}))}deleteFurniture(e){return this.furnitureService.deleteFurniture(e).pipe((0,m.M)(r=>{const n=this.furnitureList.furniture.findIndex(i=>i.furnitureId===e);-1!==n&&(this.furnitureList.furniture.splice(n,1),this._furniture.next(Object.assign({},this.furnitureList).furniture)),this.toaster.success("Furniture Deleted Successfully","Confirmation")}))}static{this.\u0275fac=function(r){return new(r||o)(t.KVO(M),t.KVO(P.tw))}}static{this.\u0275prov=t.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var x=s(177);function _(o,p){if(1&o){const e=t.RV6();t.j41(0,"button",32),t.bIt("click",function(){t.eBV(e);const n=t.XpG().index,i=t.XpG();return t.Njj(i.removeFurniture(n))}),t.nrm(1,"i",33),t.EFF(2," Remove "),t.k0s()}}const w=function(o,p){return{dimension:o,about:p}};function j(o,p){if(1&o&&(t.qex(0),t.j41(1,"div",36),t.EFF(2),t.k0s(),t.bVm()),2&o){const e=p.$implicit;t.R7$(1),t.Y8G("ngClass",t.l_i(2,w,e.startsWith("Dimension:"),e.startsWith("About:"))),t.R7$(1),t.SpI(" ",e," ")}}function T(o,p){if(1&o&&(t.j41(0,"div",34),t.DNE(1,j,3,5,"ng-container",35),t.k0s()),2&o){const e=t.XpG().$implicit,r=t.XpG();let n;t.R7$(1),t.Y8G("ngForOf",r.formatDescription(null==(n=e.get("description"))?null:n.value))}}function D(o,p){1&o&&t.nrm(0,"textarea",37)}function E(o,p){if(1&o){const e=t.RV6();t.j41(0,"div",18)(1,"div",19)(2,"div",20),t.EFF(3),t.k0s(),t.DNE(4,_,3,0,"button",21),t.k0s(),t.j41(5,"div",22)(6,"div",23)(7,"label"),t.EFF(8,"Product Code"),t.k0s(),t.j41(9,"div",13)(10,"input",24),t.bIt("input",function(){const n=t.eBV(e),i=n.index,d=n.$implicit,S=t.XpG();let k;return t.Njj(S.updateFurnitureDetails(i,null==(k=d.get("productCode"))?null:k.value))}),t.k0s(),t.nrm(11,"div",15),t.k0s()(),t.j41(12,"div",23)(13,"label"),t.EFF(14,"Name"),t.k0s(),t.j41(15,"div",13),t.nrm(16,"input",25)(17,"div",15),t.k0s()(),t.j41(18,"div",23)(19,"label"),t.EFF(20,"Price"),t.k0s(),t.j41(21,"div",13),t.nrm(22,"input",26)(23,"div",15),t.k0s()()(),t.j41(24,"div",27)(25,"div",23)(26,"label"),t.EFF(27,"Description"),t.k0s(),t.j41(28,"div",28),t.DNE(29,T,2,1,"div",29),t.DNE(30,D,1,0,"textarea",30),t.k0s()(),t.j41(31,"div",23)(32,"label"),t.EFF(33,"Remarks"),t.k0s(),t.j41(34,"div",13),t.nrm(35,"textarea",31)(36,"div",15),t.k0s()()()()}if(2&o){const e=p.$implicit,r=p.index,n=t.XpG();let i,d;t.Y8G("formGroupName",r),t.R7$(3),t.SpI("Furniture ",r+1,""),t.R7$(1),t.Y8G("ngIf",n.furniture.length>1),t.R7$(25),t.Y8G("ngIf",null==(i=e.get("description"))?null:i.value),t.R7$(1),t.Y8G("ngIf",!(null!=(d=e.get("description"))&&d.value))}}let $=(()=>{class o{constructor(e,r,n,i){this.fb=e,this.route=r,this.furnitureProvider=n,this.toaster=i,this.destroy$=new C.B,this.customerId=null,this.currentFurniture=new g,this.productDatabase={L001:{name:"AUSTEN I",price:29e3,description:"Dimension: 4'(L) x 1'4\"(D) x 2'10\"(H)\n\n      About: This piece is a wooden storage cabinet with a sleek, rectangular design. The standout feature is its double-door front, adorned with an intricate geometric lattice pattern in a traditional style, complemented by a white backing to emphasize the details. The cabinet is supported by sturdy, slightly raised wooden legs, adding stability and a touch of modern minimalism. It features small, circular metal handles for easy access to the storage space inside. This cabinet is both decorative and functional, making it ideal for enhancing the aesthetic of any living or dining area."},L002:{name:"AUSTEN II",price:39e3,description:"Dimension: 6'(L) x 1'4\"(D) x 2'10\"(H)\n\n      About: This piece is a wooden storage cabinet with a sleek, rectangular design. The standout feature is its double-door front, adorned with an intricate geometric lattice pattern in a traditional style, complemented by a white backing to emphasize the details. The cabinet is supported by sturdy, slightly raised wooden legs, adding stability and a touch of modern minimalism. It features small, circular metal handles for easy access to the storage space inside. This cabinet is both decorative and functional, making it ideal for enhancing the aesthetic of any living or dining area."},L003:{name:"AUSTEN III",price:45e3,description:"Dimension: 5'4\"(L) x 1'4\"(D) x 2'(H)\n\n      About: This elegant media console blends intricate geometric inlay work with a natural wood finish, exuding timeless charm. Its spacious design features two cabinets, open shelving, and drawers, perfect for organizing and elevating living rooms or entertainment spaces."}}}ngOnInit(){this.initializeForm(),this.extractCustomerId(),this.furniture.push(this.createFurniture()),this.customerId&&this.fetchExistingFurnitureData()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}initializeForm(){this.furnitureForm=this.fb.group({furniture:this.fb.array([]),sectionTotal:[0]})}fetchExistingFurnitureData(){null!==this.customerId&&this.furnitureProvider.getFurnitureByCustomerId(this.customerId,{deleted:0}).pipe((0,f.Q)(this.destroy$)).subscribe({next:e=>{if(!e?.length)return;const r=this.furnitureForm.get("furniture");r.clear(),e.forEach(n=>{r.push(this.createFurnitureGroup(n))}),this.updateSectionTotal()},error:e=>{console.error("Error fetching furniture data:",e)}})}createFurnitureGroup(e){return this.fb.group({productCode:[e.productCode,u.k0.required],name:[{value:e.name,disabled:!0},u.k0.required],price:[{value:e.price,disabled:!0},u.k0.required],description:[{value:e.description,disabled:!0}],remarks:[e.remarks,u.k0.required]})}extractCustomerId(){this.route.parent&&this.route.parent.paramMap.pipe((0,f.Q)(this.destroy$)).subscribe(e=>{const r=e.get("customerId");r&&(this.customerId=parseInt(r,10),console.log("Parent Route Customer ID:",this.customerId))}),this.route.paramMap.pipe((0,f.Q)(this.destroy$)).subscribe(e=>{const r=e.get("customerId");r&&(this.customerId=parseInt(r,10),console.log("Current Route Customer ID:",this.customerId))}),this.currentFurniture?.customerId&&(this.customerId=this.currentFurniture.customerId,console.log("Current Furniture Customer ID:",this.customerId))}get furniture(){return this.furnitureForm.get("furniture")}createFurniture(){return this.fb.group({productCode:["",u.k0.required],name:[{value:"",disabled:!0},u.k0.required],price:[{value:"",disabled:!0},u.k0.required],description:[{value:"",disabled:!0}],remarks:["",u.k0.required]})}addFurniture(){if(this.furnitureForm.invalid)return void console.error("Form is invalid");const e=localStorage.getItem("UserId");if(!e)return console.error("User ID not found in localStorage"),void this.toaster.error("User ID not found. Please try logging in again.");if(!this.customerId){const i=window.location.pathname.split("/"),d=i[i.indexOf("view")+1];if(this.customerId=d?parseInt(d,10):null,!this.customerId)return void console.error("Customer ID is required")}const n=this.furnitureForm.get("furniture").controls.map(i=>{const d={customerId:this.customerId,productCode:i.get("productCode")?.value,name:i.get("name")?.value,price:i.get("price")?.value,description:i.get("description")?.value,remarks:i.get("remarks")?.value,sectionTotal:this.furnitureForm.get("sectionTotal")?.value,deleted:!1,createdBy:parseInt(e),lastModifiedBy:parseInt(e),lastModifiedOn:new Date,createdOn:new Date};return this.currentFurniture.furnitureId?this.furnitureProvider.updateFurniture(d):this.furnitureProvider.addFurniture(d)});n.length>0&&(0,c.p)(n).pipe((0,f.Q)(this.destroy$)).subscribe({next:()=>{this.fetchExistingFurnitureData()},error:i=>{console.error("Error processing furniture:",i)}})}removeFurniture(e){this.furniture.removeAt(e),this.updateSectionTotal()}updateFurnitureDetails(e,r){const n=this.furniture.at(e),i=this.productDatabase[r];n.patchValue(i?{name:i.name,price:i.price,description:i.description}:{name:"",price:"",description:""}),this.updateSectionTotal()}updateSectionTotal(){const e=this.calculateSectionTotal();this.furnitureForm.get("sectionTotal")?.setValue(e)}formatDescription(e){return e?.split("\n\n")??[]}calculateSectionTotal(){return this.furniture.controls.reduce((e,r)=>e+(r.get("price")?.value||0),0)}static{this.\u0275fac=function(r){return new(r||o)(t.rXU(u.ok),t.rXU(F.nX),t.rXU(I),t.rXU(P.tw))}}static{this.\u0275cmp=t.VBU({type:o,selectors:[["app-furniture"]],inputs:{currentFurniture:"currentFurniture"},decls:26,vars:3,consts:[[1,"page-container"],[1,"form-card"],[1,"card-header"],[1,"header-content"],[1,"add-furniture-btn",3,"click"],[1,"plus-icon"],[1,"main-form"],[1,"section-card"],[3,"formGroup"],["formArrayName","furniture"],["class","paint-block",3,"formGroupName",4,"ngFor","ngForOf"],[1,"total-block"],[1,"premium-group","total-section"],[1,"premium-input"],["type","number","readonly","",3,"value"],[1,"input-line"],[1,"confirm-btn"],["type","submit","id","furnitureConfirm",1,"furniturebtn",3,"click"],[1,"paint-block",3,"formGroupName"],[1,"block-header"],[1,"block-number"],["class","remove-btn",3,"click",4,"ngIf"],[1,"input-grid-top"],[1,"premium-group"],["type","text","formControlName","productCode","placeholder","Enter Product Code",3,"input"],["type","text","formControlName","name","readonly",""],["type","number","formControlName","price","readonly",""],[1,"input-grid-bottom"],[1,"premium-input","description-container"],["class","description-content",4,"ngIf"],["formControlName","description","readonly","",4,"ngIf"],["formControlName","remarks","placeholder","Enter Remarks","rows","4"],[1,"remove-btn",3,"click"],[1,"fas","fa-trash"],[1,"description-content"],[4,"ngFor","ngForOf"],[3,"ngClass"],["formControlName","description","readonly",""]],template:function(r,n){if(1&r&&(t.j41(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h1"),t.EFF(5,"G. Furniture"),t.k0s(),t.j41(6,"button",4),t.bIt("click",function(){return n.addFurniture()}),t.j41(7,"span",5),t.EFF(8,"+"),t.k0s(),t.j41(9,"span"),t.EFF(10,"Add New Furniture"),t.k0s()()()(),t.j41(11,"div",6)(12,"div",7)(13,"form",8)(14,"div",9),t.DNE(15,E,37,5,"div",10),t.k0s(),t.j41(16,"div",11)(17,"div",12)(18,"label"),t.EFF(19,"Section Total Furniture F"),t.k0s(),t.j41(20,"div",13),t.nrm(21,"input",14)(22,"div",15),t.k0s()()()(),t.j41(23,"div",16)(24,"button",17),t.bIt("click",function(){return n.addFurniture()}),t.EFF(25,"Confirm"),t.k0s()()()()()()),2&r){let i;t.R7$(13),t.Y8G("formGroup",n.furnitureForm),t.R7$(2),t.Y8G("ngForOf",n.furniture.controls),t.R7$(6),t.Y8G("value",null==(i=n.furnitureForm.get("sectionTotal"))?null:i.value)}},dependencies:[x.YU,x.Sq,x.bT,u.qT,u.me,u.Q0,u.BC,u.cb,u.j4,u.JD,u.$R,u.v8],styles:['*[_ngcontent-%COMP%]{box-sizing:border-box;margin:0;padding:0;font-family:Poppins,sans-serif}.page-container[_ngcontent-%COMP%]{padding:2rem;max-width:2000px;margin:0 auto}.form-card[_ngcontent-%COMP%]{background:#fff;border-radius:20px;box-shadow:0 10px 30px #0000000d;background:linear-gradient(135deg,#b5ac9c 0%,#75ba9d 100%)}.card-header[_ngcontent-%COMP%]{padding:1.5rem 2rem;border-bottom:2px solid #75ba9d}.header-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.8rem;color:#000;font-weight:600;position:relative;padding-left:1rem}.header-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]:before{content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);width:4px;height:70%;background:#75ba9d;border-radius:2px}.header-content[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.add-furniture-btn[_ngcontent-%COMP%]{background:#ffffff;color:#2c3e50;border:none;padding:.5rem 1rem;border-radius:8px;display:flex;align-items:center;gap:.5rem;cursor:pointer;transition:all .3s ease;font-weight:500}.add-furniture-btn[_ngcontent-%COMP%]:hover{background:#f8f9fa;transform:translateY(-2px)}.remove-btn[_ngcontent-%COMP%]{background:#dc3545;color:#fff;border:none;padding:.4rem .8rem;border-radius:6px;display:flex;align-items:center;gap:.5rem;cursor:pointer;transition:all .3s ease;font-size:.9rem}.remove-btn[_ngcontent-%COMP%]:hover{background:#c82333}.confirm-btn[_ngcontent-%COMP%]{width:100%}.furniturebtn[_ngcontent-%COMP%]{width:100px;height:50px;color:#000;border-radius:10%;background-color:#0e412c;cursor:pointer;margin-left:20px;margin-top:20px;margin-bottom:20px}.block-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.section-card[_ngcontent-%COMP%]{background:#fff;border-radius:16px;overflow:hidden;padding:1.5rem;background:linear-gradient(135deg,#b5ac9c 0%,#75ba9d 100%)}.paint-block[_ngcontent-%COMP%]{background:#f8f9fa;border-radius:16px;margin-bottom:1.5rem;border:1px solid rgba(181,172,156,.2);transition:transform .3s,box-shadow .3s}.paint-block[_ngcontent-%COMP%]:hover{transform:translateY(-4px);box-shadow:0 8px 20px #0000000d}.block-header[_ngcontent-%COMP%]{background:linear-gradient(to right,rgba(117,186,157,.1),rgba(181,172,156,.1));padding:1rem 1.5rem;border-bottom:1px solid rgba(0,0,0,.05)}.block-number[_ngcontent-%COMP%]{font-weight:600;color:#2c3e50;font-size:1.1rem}.input-grid-top[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;padding:1.5rem 1.5rem .75rem}.input-grid-bottom[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;padding:.75rem 1.5rem 1.5rem}.product-name-display[_ngcontent-%COMP%]{text-align:center;font-size:1.2rem;font-weight:600;padding:.5rem;color:#2c3e50;margin:.5rem 1.5rem}.description-container[_ngcontent-%COMP%]{background:white;border-radius:10px;border:2px solid rgba(181,172,156,.2);min-height:100px}.description-content[_ngcontent-%COMP%]{padding:.8rem 1rem}.description-content[_ngcontent-%COMP%]   .dimension[_ngcontent-%COMP%], .description-content[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]{margin-bottom:1rem}.description-content[_ngcontent-%COMP%]   .dimension[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .description-content[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#75ba9d;font-weight:600}textarea[_ngcontent-%COMP%]{width:100%;padding:.8rem 1rem;border:2px solid rgba(181,172,156,.2);border-radius:10px;font-size:.95rem;transition:all .3s ease;background:white;resize:vertical;min-height:100px}textarea[_ngcontent-%COMP%]:focus{outline:none;border-color:#75ba9d;box-shadow:0 0 0 3px #75ba9d1a}.premium-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.5rem}.premium-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:.9rem;color:#555;font-weight:500}.premium-input[_ngcontent-%COMP%]{position:relative}.premium-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:.8rem 1rem;border:2px solid rgba(181,172,156,.2);border-radius:10px;font-size:.95rem;transition:all .3s ease;background:white}.premium-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none;border-color:#75ba9d;box-shadow:0 0 0 3px #75ba9d1a}.input-line[_ngcontent-%COMP%]{position:absolute;bottom:0;left:0;height:2px;width:0;background:#75ba9d;transition:width .3s ease}.premium-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus + .input-line[_ngcontent-%COMP%]{width:100%}.custom-select[_ngcontent-%COMP%]{position:relative}.custom-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;padding:.8rem 1rem;border:2px solid rgba(181,172,156,.2);border-radius:10px;font-size:.95rem;background:white;appearance:none;cursor:pointer}.custom-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus{outline:none;border-color:#75ba9d;box-shadow:0 0 0 3px #75ba9d1a}.custom-select[_ngcontent-%COMP%]:after{content:"\\25bc";position:absolute;right:1rem;top:50%;transform:translateY(-50%);color:#75ba9d;pointer-events:none;font-size:.8rem}.total-block[_ngcontent-%COMP%]{margin-top:2rem;padding:1.5rem;border-top:2px dashed rgba(181,172,156,.3)}.total-section[_ngcontent-%COMP%]{background:linear-gradient(to right,#75ba9d,#b5ac9c);padding:1.5rem;border-radius:12px;color:#fff}.total-section[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{color:#fff;font-weight:600;font-size:1.1rem}.total-section[_ngcontent-%COMP%]   .premium-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.2);color:#fff;font-weight:500}.total-section[_ngcontent-%COMP%]   .premium-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#fff9}@media (max-width: 768px){.page-container[_ngcontent-%COMP%]{padding:1rem}.input-grid[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:1rem}.card-header[_ngcontent-%COMP%], .section-card[_ngcontent-%COMP%]{padding:1rem}.paint-block[_ngcontent-%COMP%]{margin-bottom:1rem}}@keyframes _ngcontent-%COMP%_fadeSlideIn{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@media (max-width: 768px){.input-grid-top[_ngcontent-%COMP%], .input-grid-bottom[_ngcontent-%COMP%]{grid-template-columns:1fr;padding:1rem}}.paint-block[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fadeSlideIn .3s ease-out forwards}']})}}return o})()}}]);