import { TestBed } from "@angular/core/testing";
import { Door_GrillSerivce } from "./door_grills.service";
describe('Door_GrillSerivce', () => { 
    let service:Door_GrillSerivce;
    beforeEach(()=>{
        TestBed.configureTestingModule({});
        service=TestBed.inject(Door_GrillSerivce);
    });
    it('should be create',()=>{
        expect(service).toBeTruthy()
    })
})