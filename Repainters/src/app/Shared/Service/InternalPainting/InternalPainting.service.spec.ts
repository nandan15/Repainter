import { TestBed } from "@angular/core/testing";
import { InternalPaintingSerivce } from "./InternalPainting.service";
describe('InternalPaintinService', () => { 
    let service:InternalPaintingSerivce;
    beforeEach(()=>{
        TestBed.configureTestingModule({});
        service=TestBed.inject(InternalPaintingSerivce);
    });
    it('should be create',()=>{
        expect(service).toBeTruthy()
    })
})