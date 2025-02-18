import { TestBed } from "@angular/core/testing";
import { CurtainSerivce } from "./curtain.service";
describe('CurtainSerivce', () => { 
    let service:CurtainSerivce;
    beforeEach(()=>{
        TestBed.configureTestingModule({});
        service=TestBed.inject(CurtainSerivce);
    });
    it('should be create',()=>{
        expect(service).toBeTruthy()
    })
})