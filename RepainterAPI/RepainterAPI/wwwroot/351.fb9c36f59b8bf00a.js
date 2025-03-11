"use strict";(self.webpackChunkRepainters=self.webpackChunkRepainters||[]).push([[351],{5351:(yt,Q,d)=>{d.d(Q,{Vh:()=>N,bZ:()=>A,E7:()=>bt,tx:()=>_t,Yi:()=>ft,hM:()=>vt,CP:()=>C,BI:()=>pt});var m=d(6969),b=d(177),a=d(7705),g=d(8617),O=d(6860),u=d(6939),v=d(7336),p=d(1413),k=d(9030),Z=d(7673),F=d(8203),L=d(9172);function $(o,s){}class y{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.ariaModal=!0,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.closeOnNavigation=!0,this.closeOnDestroy=!0,this.closeOnOverlayDetachments=!0}}let M=(()=>{class o extends u.lb{constructor(t,e,i,n,r,l,h,_){super(),this._elementRef=t,this._focusTrapFactory=e,this._config=n,this._interactivityChecker=r,this._ngZone=l,this._overlayRef=h,this._focusMonitor=_,this._elementFocusedBeforeDialogWasOpened=null,this._closeInteractionType=null,this._ariaLabelledByQueue=[],this.attachDomPortal=f=>{this._portalOutlet.hasAttached();const Y=this._portalOutlet.attachDomPortal(f);return this._contentAttached(),Y},this._document=i,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_contentAttached(){this._initializeFocusTrap(),this._handleBackdropClicks(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._restoreFocus()}attachComponentPortal(t){this._portalOutlet.hasAttached();const e=this._portalOutlet.attachComponentPortal(t);return this._contentAttached(),e}attachTemplatePortal(t){this._portalOutlet.hasAttached();const e=this._portalOutlet.attachTemplatePortal(t);return this._contentAttached(),e}_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(t,e){this._interactivityChecker.isFocusable(t)||(t.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{const i=()=>{t.removeEventListener("blur",i),t.removeEventListener("mousedown",i),t.removeAttribute("tabindex")};t.addEventListener("blur",i),t.addEventListener("mousedown",i)})),t.focus(e)}_focusByCssSelector(t,e){let i=this._elementRef.nativeElement.querySelector(t);i&&this._forceFocus(i,e)}_trapFocus(){const t=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||t.focus();break;case!0:case"first-tabbable":this._focusTrap.focusInitialElementWhenReady().then(e=>{e||this._focusDialogContainer()});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this._config.autoFocus)}}_restoreFocus(){const t=this._config.restoreFocus;let e=null;if("string"==typeof t?e=this._document.querySelector(t):"boolean"==typeof t?e=t?this._elementFocusedBeforeDialogWasOpened:null:t&&(e=t),this._config.restoreFocus&&e&&"function"==typeof e.focus){const i=(0,O.vc)(),n=this._elementRef.nativeElement;(!i||i===this._document.body||i===n||n.contains(i))&&(this._focusMonitor?(this._focusMonitor.focusVia(e,this._closeInteractionType),this._closeInteractionType=null):e.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(){this._elementRef.nativeElement.focus&&this._elementRef.nativeElement.focus()}_containsFocus(){const t=this._elementRef.nativeElement,e=(0,O.vc)();return t===e||t.contains(e)}_initializeFocusTrap(){this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=(0,O.vc)())}_handleBackdropClicks(){this._overlayRef.backdropClick().subscribe(()=>{this._config.disableClose&&this._recaptureFocus()})}static{this.\u0275fac=function(e){return new(e||o)(a.rXU(a.aKT),a.rXU(g.GX),a.rXU(b.qQ,8),a.rXU(y),a.rXU(g.Z7),a.rXU(a.SKi),a.rXU(m.yY),a.rXU(g.FN))}}static{this.\u0275cmp=a.VBU({type:o,selectors:[["cdk-dialog-container"]],viewQuery:function(e,i){if(1&e&&a.GBs(u.I3,7),2&e){let n;a.mGM(n=a.lsd())&&(i._portalOutlet=n.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(e,i){2&e&&a.BMQ("id",i._config.id||null)("role",i._config.role)("aria-modal",i._config.ariaModal)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null)},features:[a.Vt3],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(e,i){1&e&&a.DNE(0,$,0,0,"ng-template",0)},dependencies:[u.I3],styles:[".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}"],encapsulation:2})}}return o})();class T{constructor(s,t){this.overlayRef=s,this.config=t,this.closed=new p.B,this.disableClose=t.disableClose,this.backdropClick=s.backdropClick(),this.keydownEvents=s.keydownEvents(),this.outsidePointerEvents=s.outsidePointerEvents(),this.id=t.id,this.keydownEvents.subscribe(e=>{e.keyCode===v._f&&!this.disableClose&&!(0,v.rp)(e)&&(e.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{this.disableClose||this.close(void 0,{focusOrigin:"mouse"})}),this._detachSubscription=s.detachments().subscribe(()=>{!1!==t.closeOnOverlayDetachments&&this.close()})}close(s,t){if(this.containerInstance){const e=this.closed;this.containerInstance._closeInteractionType=t?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),e.next(s),e.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(s="",t=""){return this.overlayRef.updateSize({width:s,height:t}),this}addPanelClass(s){return this.overlayRef.addPanelClass(s),this}removePanelClass(s){return this.overlayRef.removePanelClass(s),this}}const S=new a.nKC("DialogScrollStrategy"),W=new a.nKC("DialogData"),J=new a.nKC("DefaultDialogConfig"),tt={provide:S,deps:[m.hJ],useFactory:function q(o){return()=>o.scrollStrategies.block()}};let et=0,I=(()=>{class o{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}constructor(t,e,i,n,r,l){this._overlay=t,this._injector=e,this._defaultOptions=i,this._parentDialog=n,this._overlayContainer=r,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new p.B,this._afterOpenedAtThisLevel=new p.B,this._ariaHiddenElements=new Map,this.afterAllClosed=(0,k.v)(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe((0,L.Z)(void 0))),this._scrollStrategy=l}open(t,e){(e={...this._defaultOptions||new y,...e}).id=e.id||"cdk-dialog-"+et++,e.id&&this.getDialogById(e.id);const n=this._getOverlayConfig(e),r=this._overlay.create(n),l=new T(r,e),h=this._attachContainer(r,l,e);return l.containerInstance=h,this._attachDialogContent(t,l,h,e),this.openDialogs.length||this._hideNonDialogContentFromAssistiveTechnology(),this.openDialogs.push(l),l.closed.subscribe(()=>this._removeOpenDialog(l,!0)),this.afterOpened.next(l),l}closeAll(){w(this.openDialogs,t=>t.close())}getDialogById(t){return this.openDialogs.find(e=>e.id===t)}ngOnDestroy(){w(this._openDialogsAtThisLevel,t=>{!1===t.config.closeOnDestroy&&this._removeOpenDialog(t,!1)}),w(this._openDialogsAtThisLevel,t=>t.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(t){const e=new m.rR({positionStrategy:t.positionStrategy||this._overlay.position().global().centerHorizontally().centerVertically(),scrollStrategy:t.scrollStrategy||this._scrollStrategy(),panelClass:t.panelClass,hasBackdrop:t.hasBackdrop,direction:t.direction,minWidth:t.minWidth,minHeight:t.minHeight,maxWidth:t.maxWidth,maxHeight:t.maxHeight,width:t.width,height:t.height,disposeOnNavigation:t.closeOnNavigation});return t.backdropClass&&(e.backdropClass=t.backdropClass),e}_attachContainer(t,e,i){const n=i.injector||i.viewContainerRef?.injector,r=[{provide:y,useValue:i},{provide:T,useValue:e},{provide:m.yY,useValue:t}];let l;i.container?"function"==typeof i.container?l=i.container:(l=i.container.type,r.push(...i.container.providers(i))):l=M;const h=new u.A8(l,i.viewContainerRef,a.zZn.create({parent:n||this._injector,providers:r}),i.componentFactoryResolver);return t.attach(h).instance}_attachDialogContent(t,e,i,n){if(t instanceof a.C4Q){const r=this._createInjector(n,e,i,void 0);let l={$implicit:n.data,dialogRef:e};n.templateContext&&(l={...l,..."function"==typeof n.templateContext?n.templateContext():n.templateContext}),i.attachTemplatePortal(new u.VA(t,null,l,r))}else{const r=this._createInjector(n,e,i,this._injector),l=i.attachComponentPortal(new u.A8(t,n.viewContainerRef,r,n.componentFactoryResolver));e.componentRef=l,e.componentInstance=l.instance}}_createInjector(t,e,i,n){const r=t.injector||t.viewContainerRef?.injector,l=[{provide:W,useValue:t.data},{provide:T,useValue:e}];return t.providers&&("function"==typeof t.providers?l.push(...t.providers(e,t,i)):l.push(...t.providers)),t.direction&&(!r||!r.get(F.dS,null,{optional:!0}))&&l.push({provide:F.dS,useValue:{value:t.direction,change:(0,Z.of)()}}),a.zZn.create({parent:r||n,providers:l})}_removeOpenDialog(t,e){const i=this.openDialogs.indexOf(t);i>-1&&(this.openDialogs.splice(i,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((n,r)=>{n?r.setAttribute("aria-hidden",n):r.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),e&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(){const t=this._overlayContainer.getContainerElement();if(t.parentElement){const e=t.parentElement.children;for(let i=e.length-1;i>-1;i--){const n=e[i];n!==t&&"SCRIPT"!==n.nodeName&&"STYLE"!==n.nodeName&&!n.hasAttribute("aria-live")&&(this._ariaHiddenElements.set(n,n.getAttribute("aria-hidden")),n.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){const t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}static{this.\u0275fac=function(e){return new(e||o)(a.KVO(m.hJ),a.KVO(a.zZn),a.KVO(J,8),a.KVO(o,12),a.KVO(m.Sf),a.KVO(S))}}static{this.\u0275prov=a.jDH({token:o,factory:o.\u0275fac})}}return o})();function w(o,s){let t=o.length;for(;t--;)s(o[t])}let it=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275mod=a.$C({type:o})}static{this.\u0275inj=a.G2t({providers:[I,tt],imports:[m.z_,u.jc,g.Pd,u.jc]})}}return o})();var B=d(4085),at=d(7786),x=d(5964),E=d(6697),P=d(6600);function ot(o,s){}d(9969);class D{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.maxWidth="80vw",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.ariaModal=!0,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.delayFocusTrap=!0,this.closeOnNavigation=!0}}const R="mdc-dialog--open",V="mdc-dialog--opening",U="mdc-dialog--closing";let lt=(()=>{class o extends M{constructor(t,e,i,n,r,l,h,_){super(t,e,i,n,r,l,h,_),this._animationStateChanged=new a.bkB}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(t){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:t})}static{this.\u0275fac=function(e){return new(e||o)(a.rXU(a.aKT),a.rXU(g.GX),a.rXU(b.qQ,8),a.rXU(D),a.rXU(g.Z7),a.rXU(a.SKi),a.rXU(m.yY),a.rXU(g.FN))}}static{this.\u0275cmp=a.VBU({type:o,selectors:[["ng-component"]],features:[a.Vt3],decls:0,vars:0,template:function(e,i){},encapsulation:2})}}return o})();const z="--mat-dialog-transition-duration";function X(o){return null==o?null:"number"==typeof o?o:o.endsWith("ms")?(0,B.OE)(o.substring(0,o.length-2)):o.endsWith("s")?1e3*(0,B.OE)(o.substring(0,o.length-1)):"0"===o?0:null}let rt=(()=>{class o extends lt{constructor(t,e,i,n,r,l,h,_,f){super(t,e,i,n,r,l,h,f),this._animationMode=_,this._animationsEnabled="NoopAnimations"!==this._animationMode,this._hostElement=this._elementRef.nativeElement,this._enterAnimationDuration=this._animationsEnabled?X(this._config.enterAnimationDuration)??150:0,this._exitAnimationDuration=this._animationsEnabled?X(this._config.exitAnimationDuration)??75:0,this._animationTimer=null,this._finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)},this._finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})}}_contentAttached(){super._contentAttached(),this._startOpenAnimation()}ngOnDestroy(){super.ngOnDestroy(),null!==this._animationTimer&&clearTimeout(this._animationTimer)}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(z,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(V,R)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(R),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(R),this._animationsEnabled?(this._hostElement.style.setProperty(z,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(U)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_clearAnimationClasses(){this._hostElement.classList.remove(V,U)}_waitForAnimationToComplete(t,e){null!==this._animationTimer&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(e,t)}_requestAnimationFrame(t){this._ngZone.runOutsideAngular(()=>{"function"==typeof requestAnimationFrame?requestAnimationFrame(t):t()})}static{this.\u0275fac=function(e){return new(e||o)(a.rXU(a.aKT),a.rXU(g.GX),a.rXU(b.qQ,8),a.rXU(D),a.rXU(g.Z7),a.rXU(a.SKi),a.rXU(m.yY),a.rXU(a.bc$,8),a.rXU(g.FN))}}static{this.\u0275cmp=a.VBU({type:o,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:8,hostBindings:function(e,i){2&e&&(a.Mr5("id",i._config.id),a.BMQ("aria-modal",i._config.ariaModal)("role",i._config.role)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null),a.AVh("_mat-animation-noopable",!i._animationsEnabled))},features:[a.Vt3],decls:3,vars:0,consts:[[1,"mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(e,i){1&e&&(a.j41(0,"div",0)(1,"div",1),a.DNE(2,ot,0,0,"ng-template",2),a.k0s()())},dependencies:[u.I3],styles:['.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:var(--mdc-dialog-z-index, 7)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-width:none}@media(max-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px;width:560px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 112px)}}@media(max-width: 720px)and (min-width: 672px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:560px}}@media(max-width: 720px)and (max-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:calc(100vh - 160px)}}@media(max-width: 720px)and (min-height: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{max-height:560px}}@media(max-width: 720px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}@media(max-width: 720px)and (max-height: 400px),(max-width: 600px),(min-width: 720px)and (max-height: 400px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{height:100%;max-height:100vh;max-width:100vw;width:100vw;border-radius:0}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{order:-1;left:-12px}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__header{padding:0 16px 9px;justify-content:flex-start}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__title{margin-left:calc(16px - 2 * 12px)}}@media(min-width: 960px){.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface{width:calc(100vw - 400px)}.mdc-dialog.mdc-dialog--fullscreen .mdc-dialog__surface .mdc-dialog__close{right:-12px}}.mdc-dialog.mdc-dialog__scrim--hidden .mdc-dialog__scrim{opacity:0}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto;outline:0}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}[dir=rtl] .mdc-dialog__surface,.mdc-dialog__surface[dir=rtl]{text-align:right}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-dialog__surface{outline:2px solid windowText}}.mdc-dialog__surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:2px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-dialog__surface::before{border-color:CanvasText}}@media screen and (-ms-high-contrast: active),screen and (-ms-high-contrast: none){.mdc-dialog__surface::before{content:none}}.mdc-dialog__title{display:block;margin-top:0;position:relative;flex-shrink:0;box-sizing:border-box;margin:0 0 1px;padding:0 24px 9px}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}[dir=rtl] .mdc-dialog__title,.mdc-dialog__title[dir=rtl]{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{margin-bottom:1px;padding-bottom:15px}.mdc-dialog--fullscreen .mdc-dialog__header{align-items:baseline;border-bottom:1px solid rgba(0,0,0,0);display:inline-flex;justify-content:space-between;padding:0 24px 9px;z-index:1}@media screen and (forced-colors: active){.mdc-dialog--fullscreen .mdc-dialog__header{border-bottom-color:CanvasText}}.mdc-dialog--fullscreen .mdc-dialog__header .mdc-dialog__close{right:-12px}.mdc-dialog--fullscreen .mdc-dialog__title{margin-bottom:0;padding:0;border-bottom:0}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__title{border-bottom:0;margin-bottom:0}.mdc-dialog--fullscreen .mdc-dialog__close{top:5px}.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top:1px solid rgba(0,0,0,0)}@media screen and (forced-colors: active){.mdc-dialog--fullscreen.mdc-dialog--scrollable .mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--fullscreen--titleless .mdc-dialog__close{margin-top:4px}.mdc-dialog--fullscreen--titleless.mdc-dialog--scrollable .mdc-dialog__close{margin-top:0}.mdc-dialog__content{flex-grow:1;box-sizing:border-box;margin:0;overflow:auto}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content,.mdc-dialog__header+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-deprecated-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid rgba(0,0,0,0)}@media screen and (forced-colors: active){.mdc-dialog__actions{border-top-color:CanvasText}}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:none;opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim{opacity:1}.mdc-dialog--open.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{transition:opacity 75ms linear}.mdc-dialog--open.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim{transition:opacity 150ms linear}.mdc-dialog__surface-scrim{display:none;opacity:0;position:absolute;width:100%;height:100%;z-index:1}.mdc-dialog__surface-scrim--shown .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--showing .mdc-dialog__surface-scrim,.mdc-dialog__surface-scrim--hiding .mdc-dialog__surface-scrim{display:block}.mdc-dialog-scroll-lock{overflow:hidden}.mdc-dialog--no-content-padding .mdc-dialog__content{padding:0}.mdc-dialog--sheet .mdc-dialog__container .mdc-dialog__close{right:12px;top:9px;position:absolute;z-index:1}.mdc-dialog__scrim--removed{pointer-events:none}.mdc-dialog__scrim--removed .mdc-dialog__scrim,.mdc-dialog__scrim--removed .mdc-dialog__surface-scrim{display:none}.mat-mdc-dialog-content{max-height:65vh}.mat-mdc-dialog-container{position:static;display:block}.mat-mdc-dialog-container,.mat-mdc-dialog-container .mdc-dialog__container,.mat-mdc-dialog-container .mdc-dialog__surface{max-height:inherit;min-height:inherit;min-width:inherit;max-width:inherit}.mat-mdc-dialog-container .mdc-dialog__surface{display:block;width:100%;height:100%}.mat-mdc-dialog-container{--mdc-dialog-container-elevation-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);--mdc-dialog-container-shadow-color:#000;--mdc-dialog-container-shape:4px;--mdc-dialog-container-elevation: var(--mdc-dialog-container-elevation-shadow);outline:0}.mat-mdc-dialog-container .mdc-dialog__surface{background-color:var(--mdc-dialog-container-color, white)}.mat-mdc-dialog-container .mdc-dialog__surface{box-shadow:var(--mdc-dialog-container-elevation, 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12))}.mat-mdc-dialog-container .mdc-dialog__surface{border-radius:var(--mdc-dialog-container-shape, 4px)}.mat-mdc-dialog-container .mdc-dialog__title{font-family:var(--mdc-dialog-subhead-font, Roboto, sans-serif);line-height:var(--mdc-dialog-subhead-line-height, 1.5rem);font-size:var(--mdc-dialog-subhead-size, 1rem);font-weight:var(--mdc-dialog-subhead-weight, 400);letter-spacing:var(--mdc-dialog-subhead-tracking, 0.03125em)}.mat-mdc-dialog-container .mdc-dialog__title{color:var(--mdc-dialog-subhead-color, rgba(0, 0, 0, 0.87))}.mat-mdc-dialog-container .mdc-dialog__content{font-family:var(--mdc-dialog-supporting-text-font, Roboto, sans-serif);line-height:var(--mdc-dialog-supporting-text-line-height, 1.5rem);font-size:var(--mdc-dialog-supporting-text-size, 1rem);font-weight:var(--mdc-dialog-supporting-text-weight, 400);letter-spacing:var(--mdc-dialog-supporting-text-tracking, 0.03125em)}.mat-mdc-dialog-container .mdc-dialog__content{color:var(--mdc-dialog-supporting-text-color, rgba(0, 0, 0, 0.6))}.mat-mdc-dialog-container .mdc-dialog__container{transition-duration:var(--mat-dialog-transition-duration, 0ms)}.mat-mdc-dialog-container._mat-animation-noopable .mdc-dialog__container{transition:none}.mat-mdc-dialog-content{display:block}.mat-mdc-dialog-actions{justify-content:start}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center,.mat-mdc-dialog-actions[align=center]{justify-content:center}.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end,.mat-mdc-dialog-actions[align=end]{justify-content:flex-end}.mat-mdc-dialog-actions .mat-button-base+.mat-button-base,.mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-mdc-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}'],encapsulation:2})}}return o})();class C{constructor(s,t,e){this._ref=s,this._containerInstance=e,this._afterOpened=new p.B,this._beforeClosed=new p.B,this._state=0,this.disableClose=t.disableClose,this.id=s.id,e._animationStateChanged.pipe((0,x.p)(i=>"opened"===i.state),(0,E.s)(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),e._animationStateChanged.pipe((0,x.p)(i=>"closed"===i.state),(0,E.s)(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),s.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),(0,at.h)(this.backdropClick(),this.keydownEvents().pipe((0,x.p)(i=>i.keyCode===v._f&&!this.disableClose&&!(0,v.rp)(i)))).subscribe(i=>{this.disableClose||(i.preventDefault(),j(this,"keydown"===i.type?"keyboard":"mouse"))})}close(s){this._result=s,this._containerInstance._animationStateChanged.pipe((0,x.p)(t=>"closing"===t.state),(0,E.s)(1)).subscribe(t=>{this._beforeClosed.next(s),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),t.totalTime+100)}),this._state=1,this._containerInstance._startExitAnimation()}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(s){let t=this._ref.config.positionStrategy;return s&&(s.left||s.right)?s.left?t.left(s.left):t.right(s.right):t.centerHorizontally(),s&&(s.top||s.bottom)?s.top?t.top(s.top):t.bottom(s.bottom):t.centerVertically(),this._ref.updatePosition(),this}updateSize(s="",t=""){return this._ref.updateSize(s,t),this}addPanelClass(s){return this._ref.addPanelClass(s),this}removePanelClass(s){return this._ref.removePanelClass(s),this}getState(){return this._state}_finishDialogClose(){this._state=2,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}}function j(o,s,t){return o._closeInteractionType=s,o.close(t)}const N=new a.nKC("MatMdcDialogData"),dt=new a.nKC("mat-mdc-dialog-default-options"),G=new a.nKC("mat-mdc-dialog-scroll-strategy"),ht={provide:G,deps:[m.hJ],useFactory:function ct(o){return()=>o.scrollStrategies.block()}};let mt=0,gt=(()=>{class o{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){const t=this._parentDialog;return t?t._getAfterAllClosed():this._afterAllClosedAtThisLevel}constructor(t,e,i,n,r,l,h,_,f,Y){this._overlay=t,this._defaultOptions=i,this._parentDialog=n,this._dialogRefConstructor=h,this._dialogContainerType=_,this._dialogDataToken=f,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new p.B,this._afterOpenedAtThisLevel=new p.B,this._idPrefix="mat-dialog-",this.dialogConfigClass=D,this.afterAllClosed=(0,k.v)(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe((0,L.Z)(void 0))),this._scrollStrategy=l,this._dialog=e.get(I)}open(t,e){let i;(e={...this._defaultOptions||new D,...e}).id=e.id||`${this._idPrefix}${mt++}`,e.scrollStrategy=e.scrollStrategy||this._scrollStrategy();const n=this._dialog.open(t,{...e,positionStrategy:this._overlay.position().global().centerHorizontally().centerVertically(),disableClose:!0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:e},{provide:y,useValue:e}]},templateContext:()=>({dialogRef:i}),providers:(r,l,h)=>(i=new this._dialogRefConstructor(r,e,h),i.updatePosition(e?.position),[{provide:this._dialogContainerType,useValue:h},{provide:this._dialogDataToken,useValue:l.data},{provide:this._dialogRefConstructor,useValue:i}])});return i.componentRef=n.componentRef,i.componentInstance=n.componentInstance,this.openDialogs.push(i),this.afterOpened.next(i),i.afterClosed().subscribe(()=>{const r=this.openDialogs.indexOf(i);r>-1&&(this.openDialogs.splice(r,1),this.openDialogs.length||this._getAfterAllClosed().next())}),i}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(t){return this.openDialogs.find(e=>e.id===t)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(t){let e=t.length;for(;e--;)t[e].close()}static{this.\u0275fac=function(e){a.QTQ()}}static{this.\u0275prov=a.jDH({token:o,factory:o.\u0275fac})}}return o})(),A=(()=>{class o extends gt{constructor(t,e,i,n,r,l,h,_){super(t,e,n,l,h,r,C,rt,N,_),this._idPrefix="mat-mdc-dialog-"}static{this.\u0275fac=function(e){return new(e||o)(a.KVO(m.hJ),a.KVO(a.zZn),a.KVO(b.aZ,8),a.KVO(dt,8),a.KVO(G),a.KVO(o,12),a.KVO(m.Sf),a.KVO(a.bc$,8))}}static{this.\u0275prov=a.jDH({token:o,factory:o.\u0275fac})}}return o})(),ut=0,_t=(()=>{class o{constructor(t,e,i){this.dialogRef=t,this._elementRef=e,this._dialog=i,this.type="button"}ngOnInit(){this.dialogRef||(this.dialogRef=K(this._elementRef,this._dialog.openDialogs))}ngOnChanges(t){const e=t._matDialogClose||t._matDialogCloseResult;e&&(this.dialogResult=e.currentValue)}_onButtonClick(t){j(this.dialogRef,0===t.screenX&&0===t.screenY?"keyboard":"mouse",this.dialogResult)}static{this.\u0275fac=function(e){return new(e||o)(a.rXU(C,8),a.rXU(a.aKT),a.rXU(A))}}static{this.\u0275dir=a.FsC({type:o,selectors:[["","mat-dialog-close",""],["","matDialogClose",""]],hostVars:2,hostBindings:function(e,i){1&e&&a.bIt("click",function(r){return i._onButtonClick(r)}),2&e&&a.BMQ("aria-label",i.ariaLabel||null)("type",i.type)},inputs:{ariaLabel:["aria-label","ariaLabel"],type:"type",dialogResult:["mat-dialog-close","dialogResult"],_matDialogClose:["matDialogClose","_matDialogClose"]},exportAs:["matDialogClose"],features:[a.OA$]})}}return o})(),pt=(()=>{class o{constructor(t,e,i){this._dialogRef=t,this._elementRef=e,this._dialog=i,this.id="mat-mdc-dialog-title-"+ut++}ngOnInit(){this._dialogRef||(this._dialogRef=K(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._dialogRef._containerInstance?._ariaLabelledByQueue?.push(this.id)})}ngOnDestroy(){const t=this._dialogRef?._containerInstance?._ariaLabelledByQueue;t&&Promise.resolve().then(()=>{const e=t.indexOf(this.id);e>-1&&t.splice(e,1)})}static{this.\u0275fac=function(e){return new(e||o)(a.rXU(C,8),a.rXU(a.aKT),a.rXU(A))}}static{this.\u0275dir=a.FsC({type:o,selectors:[["","mat-dialog-title",""],["","matDialogTitle",""]],hostAttrs:[1,"mat-mdc-dialog-title","mdc-dialog__title"],hostVars:1,hostBindings:function(e,i){2&e&&a.Mr5("id",i.id)},inputs:{id:"id"},exportAs:["matDialogTitle"]})}}return o})(),ft=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275dir=a.FsC({type:o,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"]})}}return o})(),bt=(()=>{class o{constructor(){this.align="start"}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275dir=a.FsC({type:o,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:4,hostBindings:function(e,i){2&e&&a.AVh("mat-mdc-dialog-actions-align-center","center"===i.align)("mat-mdc-dialog-actions-align-end","end"===i.align)},inputs:{align:"align"}})}}return o})();function K(o,s){let t=o.nativeElement.parentElement;for(;t&&!t.classList.contains("mat-mdc-dialog-container");)t=t.parentElement;return t?s.find(e=>e.id===t.id):null}let vt=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275mod=a.$C({type:o})}static{this.\u0275inj=a.G2t({providers:[A,ht],imports:[it,m.z_,u.jc,P.yE,P.yE]})}}return o})()}}]);