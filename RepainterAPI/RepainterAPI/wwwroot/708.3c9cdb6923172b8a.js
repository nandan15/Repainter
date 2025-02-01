"use strict";(self.webpackChunkRepainters=self.webpackChunkRepainters||[]).push([[708],{3708:($,f,l)=>{l.r(f),l.d(f,{RegisterModule:()=>N});var p=l(177),c=l(7062),o=l(9417),e=l(7705),h=l(6813),_=l(1626);let v=(()=>{class t{constructor(r){this.httpClient=r,this.baseUrl=h.c.backend.baseURL,this.registerUrl=this.baseUrl+"api/Authenticate/register"}register(r){return this.httpClient.post(this.registerUrl,r)}static{this.\u0275fac=function(n){return new(n||t)(e.KVO(_.Qq))}}static{this.\u0275prov=e.jDH({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var C=l(5794);function F(t,s){1&t&&(e.j41(0,"span"),e.EFF(1,"Username is required"),e.k0s())}function b(t,s){if(1&t&&(e.j41(0,"div",32),e.DNE(1,F,2,0,"span",33),e.k0s()),2&t){const r=e.XpG();let n;e.R7$(1),e.Y8G("ngIf",null==(n=r.registerForm.get("username"))||null==n.errors?null:n.errors.required)}}function w(t,s){1&t&&(e.j41(0,"span"),e.EFF(1,"Email is required"),e.k0s())}function P(t,s){1&t&&(e.j41(0,"span"),e.EFF(1,"Invalid email format"),e.k0s())}function M(t,s){if(1&t&&(e.j41(0,"div",32),e.DNE(1,w,2,0,"span",33),e.DNE(2,P,2,0,"span",33),e.k0s()),2&t){const r=e.XpG();let n,i;e.R7$(1),e.Y8G("ngIf",null==(n=r.registerForm.get("email"))||null==n.errors?null:n.errors.required),e.R7$(1),e.Y8G("ngIf",null==(i=r.registerForm.get("email"))||null==i.errors?null:i.errors.email)}}function k(t,s){1&t&&(e.j41(0,"span"),e.EFF(1,"Password is required"),e.k0s())}function O(t,s){1&t&&(e.j41(0,"span"),e.EFF(1,"Password must be at least 6 characters"),e.k0s())}function x(t,s){if(1&t&&(e.j41(0,"div",32),e.DNE(1,k,2,0,"span",33),e.DNE(2,O,2,0,"span",33),e.k0s()),2&t){const r=e.XpG();let n,i;e.R7$(1),e.Y8G("ngIf",null==(n=r.registerForm.get("password"))||null==n.errors?null:n.errors.required),e.R7$(1),e.Y8G("ngIf",null==(i=r.registerForm.get("password"))||null==i.errors?null:i.errors.minlength)}}function j(t,s){1&t&&(e.j41(0,"span"),e.EFF(1,"Confirm password is required"),e.k0s())}function E(t,s){1&t&&(e.j41(0,"span"),e.EFF(1,"Passwords do not match"),e.k0s())}function y(t,s){if(1&t&&(e.j41(0,"div",32),e.DNE(1,j,2,0,"span",33),e.DNE(2,E,2,0,"span",33),e.k0s()),2&t){const r=e.XpG();let n;e.R7$(1),e.Y8G("ngIf",null==(n=r.registerForm.get("confirmPassword"))||null==n.errors?null:n.errors.required),e.R7$(1),e.Y8G("ngIf",null==r.registerForm.errors?null:r.registerForm.errors.mismatch)}}function R(t,s){if(1&t&&(e.j41(0,"option",34),e.EFF(1),e.k0s()),2&t){const r=s.$implicit;e.Y8G("value",r),e.R7$(1),e.JRh(r)}}function G(t,s){1&t&&(e.j41(0,"span"),e.EFF(1,"Role is required"),e.k0s())}function V(t,s){if(1&t&&(e.j41(0,"div",32),e.DNE(1,G,2,0,"span",33),e.k0s()),2&t){const r=e.XpG();let n;e.R7$(1),e.Y8G("ngIf",null==(n=r.registerForm.get("role"))||null==n.errors?null:n.errors.required)}}const I=[{path:"",component:(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=e.VBU({type:t,selectors:[["app-register"]],decls:1,vars:0,template:function(n,i){1&n&&e.nrm(0,"router-outlet")},dependencies:[c.n3]})}}return t})(),children:[{path:"view",component:(()=>{class t{constructor(r,n,i,a){this.fb=r,this.registrationService=n,this.router=i,this.toastr=a,this.roles=["User","Admin"],this.registerForm=this.fb.group({username:["",[o.k0.required]],email:["",[o.k0.required,o.k0.email]],password:["",[o.k0.required,o.k0.minLength(6)]],confirmPassword:["",[o.k0.required]],role:["User",[o.k0.required]]},{validator:this.passwordMatchValidator})}ngOnInit(){}passwordMatchValidator(r){return r.get("password")?.value===r.get("confirmPassword")?.value?null:{mismatch:!0}}onSubmit(){this.registerForm.valid&&this.registrationService.register({username:this.registerForm.value.username,email:this.registerForm.value.email,password:this.registerForm.value.password,role:this.registerForm.value.role}).subscribe({next:n=>{this.toastr.success("Registration successful"),this.router.navigate(["/login/view"])},error:n=>{this.toastr.error(n.error.message||"Registration failed")}})}static{this.\u0275fac=function(n){return new(n||t)(e.rXU(o.ok),e.rXU(v),e.rXU(c.Ix),e.rXU(C.tw))}}static{this.\u0275cmp=e.VBU({type:t,selectors:[["app-view"]],decls:58,vars:8,consts:[[1,"registration-container"],[1,"design-section"],[1,"circle-container"],[1,"circle","circle-1"],[1,"circle","circle-2"],[1,"circle","circle-3"],[1,"brand-content"],[1,"brand-title"],[1,"form-section"],[1,"form-container"],[3,"formGroup","ngSubmit"],[1,"form-field"],[1,"input-group"],["type","text","id","username","formControlName","username","required",""],["for","username"],[1,"input-highlight"],["class","error",4,"ngIf"],["type","email","id","email","formControlName","email","required",""],["for","email"],["type","password","id","password","formControlName","password","required",""],["for","password"],["type","password","id","confirmPassword","formControlName","confirmPassword","required",""],["for","confirmPassword"],[1,"select-group"],["id","role","formControlName","role","required",""],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],[1,"select-highlight"],["type","submit",1,"submit-btn",3,"disabled"],[1,"btn-overlay"],[1,"login-link"],["routerLink","/login/view"],[1,"error"],[4,"ngIf"],[3,"value"]],template:function(n,i){if(1&n&&(e.j41(0,"div",0)(1,"div",1)(2,"div",2),e.nrm(3,"div",3)(4,"div",4)(5,"div",5),e.k0s(),e.j41(6,"div",6)(7,"h1",7),e.EFF(8,"Espresso"),e.k0s()()(),e.j41(9,"div",8)(10,"div",9)(11,"h2"),e.EFF(12,"Create Account"),e.k0s(),e.j41(13,"form",10),e.bIt("ngSubmit",function(){return i.onSubmit()}),e.j41(14,"div",11)(15,"div",12),e.nrm(16,"input",13),e.j41(17,"label",14),e.EFF(18,"Username"),e.k0s(),e.nrm(19,"div",15),e.k0s(),e.DNE(20,b,2,1,"div",16),e.k0s(),e.j41(21,"div",11)(22,"div",12),e.nrm(23,"input",17),e.j41(24,"label",18),e.EFF(25,"Email"),e.k0s(),e.nrm(26,"div",15),e.k0s(),e.DNE(27,M,3,2,"div",16),e.k0s(),e.j41(28,"div",11)(29,"div",12),e.nrm(30,"input",19),e.j41(31,"label",20),e.EFF(32,"Password"),e.k0s(),e.nrm(33,"div",15),e.k0s(),e.DNE(34,x,3,2,"div",16),e.k0s(),e.j41(35,"div",11)(36,"div",12),e.nrm(37,"input",21),e.j41(38,"label",22),e.EFF(39,"Confirm Password"),e.k0s(),e.nrm(40,"div",15),e.k0s(),e.DNE(41,y,3,2,"div",16),e.k0s(),e.j41(42,"div",11)(43,"div",23)(44,"select",24)(45,"option",25),e.EFF(46,"Select your role"),e.k0s(),e.DNE(47,R,2,2,"option",26),e.k0s(),e.nrm(48,"div",27),e.k0s(),e.DNE(49,V,2,1,"div",16),e.k0s(),e.j41(50,"button",28)(51,"span"),e.EFF(52,"Register"),e.k0s(),e.nrm(53,"div",29),e.k0s(),e.j41(54,"p",30),e.EFF(55,"Already have an account? "),e.j41(56,"a",31),e.EFF(57,"Login here"),e.k0s()()()()()()),2&n){let a,m,d,g,u;e.R7$(13),e.Y8G("formGroup",i.registerForm),e.R7$(7),e.Y8G("ngIf",(null==(a=i.registerForm.get("username"))?null:a.touched)&&(null==(a=i.registerForm.get("username"))?null:a.invalid)),e.R7$(7),e.Y8G("ngIf",(null==(m=i.registerForm.get("email"))?null:m.touched)&&(null==(m=i.registerForm.get("email"))?null:m.invalid)),e.R7$(7),e.Y8G("ngIf",(null==(d=i.registerForm.get("password"))?null:d.touched)&&(null==(d=i.registerForm.get("password"))?null:d.invalid)),e.R7$(7),e.Y8G("ngIf",(null==(g=i.registerForm.get("confirmPassword"))?null:g.touched)&&((null==(g=i.registerForm.get("confirmPassword"))?null:g.invalid)||(null==i.registerForm.errors?null:i.registerForm.errors.mismatch))),e.R7$(6),e.Y8G("ngForOf",i.roles),e.R7$(2),e.Y8G("ngIf",(null==(u=i.registerForm.get("role"))?null:u.touched)&&(null==(u=i.registerForm.get("role"))?null:u.invalid)),e.R7$(1),e.Y8G("disabled",i.registerForm.invalid)}},dependencies:[p.Sq,p.bT,c.Wk,o.qT,o.xH,o.y7,o.me,o.wz,o.BC,o.cb,o.YS,o.j4,o.JD],styles:[".registration-container[_ngcontent-%COMP%]{display:flex;min-height:100vh;background-color:#fff}.design-section[_ngcontent-%COMP%]{flex:1;background:linear-gradient(135deg,#1a1a1a,#2d2d2d);position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}.circle-container[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%}.circle[_ngcontent-%COMP%]{position:absolute;border-radius:50%;background:linear-gradient(45deg,#8B4513,#4A2C2A);opacity:.1;animation:_ngcontent-%COMP%_float 10s infinite ease-in-out}.circle-1[_ngcontent-%COMP%]{width:300px;height:300px;top:-50px;left:-50px;animation-delay:0s}.circle-2[_ngcontent-%COMP%]{width:200px;height:200px;bottom:50px;right:50px;animation-delay:-3s}.circle-3[_ngcontent-%COMP%]{width:150px;height:150px;bottom:30%;left:30%;animation-delay:-6s}@keyframes _ngcontent-%COMP%_float{0%,to{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.05)}}.brand-content[_ngcontent-%COMP%]{position:relative;z-index:1;text-align:center;color:#fff}.brand-title[_ngcontent-%COMP%]{font-size:4rem;font-weight:700;margin:0;letter-spacing:4px;text-transform:uppercase}.brand-tagline[_ngcontent-%COMP%]{font-size:1.2rem;opacity:.8;margin-top:1rem}.form-section[_ngcontent-%COMP%]{flex:1;display:flex;align-items:center;justify-content:center;padding:3rem;background:#ffffff}.form-container[_ngcontent-%COMP%]{width:100%;max-width:450px;padding:2rem}.form-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#1a1a1a;font-size:2.5rem;margin-bottom:.5rem;font-weight:600;padding:20px}.form-subtitle[_ngcontent-%COMP%]{color:#666;margin-bottom:2.5rem}.form-field[_ngcontent-%COMP%]{margin-bottom:2rem}.input-group[_ngcontent-%COMP%]{position:relative}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{width:100%;padding:1rem 0;font-size:1rem;border:none;border-bottom:2px solid #e0e0e0;background:transparent;transition:all .3s ease;color:#1a1a1a}input[_ngcontent-%COMP%]:focus, select[_ngcontent-%COMP%]:focus{outline:none}.input-highlight[_ngcontent-%COMP%], .select-highlight[_ngcontent-%COMP%]{position:absolute;bottom:0;left:0;width:0;height:2px;background:linear-gradient(45deg,#8B4513,#4A2C2A);transition:width .3s ease}input[_ngcontent-%COMP%]:focus ~ .input-highlight[_ngcontent-%COMP%], select[_ngcontent-%COMP%]:focus ~ .select-highlight[_ngcontent-%COMP%]{width:100%}label[_ngcontent-%COMP%]{position:absolute;left:0;top:50%;transform:translateY(-50%);color:#999;transition:all .3s ease;pointer-events:none}input[_ngcontent-%COMP%]:focus ~ label[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:not(:placeholder-shown) ~ label[_ngcontent-%COMP%], select[_ngcontent-%COMP%]:focus ~ label[_ngcontent-%COMP%], select[_ngcontent-%COMP%]:not(:placeholder-shown) ~ label[_ngcontent-%COMP%]{top:-.5rem;font-size:.8rem;color:#8b4513}.error[_ngcontent-%COMP%]{color:#e74c3c;font-size:.8rem;margin-top:.5rem}.submit-btn[_ngcontent-%COMP%]{width:100%;padding:1rem;margin-top:1rem;border:none;border-radius:5px;background:linear-gradient(45deg,#8B4513,#4A2C2A);color:#fff;font-size:1rem;cursor:pointer;position:relative;overflow:hidden;transition:all .3s ease}.submit-btn[_ngcontent-%COMP%]:disabled{opacity:.7;cursor:not-allowed}.btn-overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(45deg,rgba(255,255,255,.2),transparent);transition:all .3s ease}.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled)   .btn-overlay[_ngcontent-%COMP%]{left:100%}.login-link[_ngcontent-%COMP%]{text-align:center;margin-top:1.5rem;color:#666}.login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#8b4513;text-decoration:none;font-weight:500;transition:color .3s ease}.login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#4a2c2a}@media (max-width: 768px){.registration-container[_ngcontent-%COMP%]{flex-direction:column}.design-section[_ngcontent-%COMP%]{min-height:30vh}.brand-title[_ngcontent-%COMP%]{font-size:2.5rem}.form-section[_ngcontent-%COMP%]{padding:2rem 1rem}}"]})}}return t})()}]}];let Y=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275mod=e.$C({type:t})}static{this.\u0275inj=e.G2t({imports:[c.iI.forChild(I),c.iI]})}}return t})(),N=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275mod=e.$C({type:t})}static{this.\u0275inj=e.G2t({imports:[p.MD,Y,o.X1,o.YN]})}}return t})()}}]);