"use strict";(self.webpackChunkRepainters=self.webpackChunkRepainters||[]).push([[705],{1705:(d,i,c)=>{c.d(i,{q:()=>a});var r=c(4412),u=c(7705);let a=(()=>{class s{constructor(){this.sectionsSource=new r.t([]),this.currentSections=this.sectionsSource.asObservable()}updateSection(t){const e=this.sectionsSource.getValue(),n=e.findIndex(o=>o.sectionId===t.sectionId);-1!==n?e[n]=t:e.push(t),this.sectionsSource.next(e)}removeSection(t){const n=this.sectionsSource.getValue().filter(o=>o.sectionId!==t);this.sectionsSource.next(n)}static{this.\u0275fac=function(e){return new(e||s)}}static{this.\u0275prov=u.jDH({token:s,factory:s.\u0275fac,providedIn:"root"})}}return s})()}}]);