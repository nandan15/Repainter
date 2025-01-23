import { TestBed } from "@angular/core/testing";
import { TexturePaintingSerivce } from "./TexturePainting.service";

describe('TexturePaintingSerivce', () => { 
    let service:TexturePaintingSerivce;
    beforeEach(()=>{
        TestBed.configureTestingModule({});
        service=TestBed.inject(TexturePaintingSerivce);
    });
    it('should be create',()=>{
        expect(service).toBeTruthy()
    })
})