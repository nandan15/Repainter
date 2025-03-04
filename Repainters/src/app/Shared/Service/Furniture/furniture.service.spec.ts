import { TestBed } from "@angular/core/testing";
import { FurnitureSerivce } from "./furniture.service";
describe('FurnitureSerivce', () => { 
    let service:FurnitureSerivce;
    beforeEach(()=>{
        TestBed.configureTestingModule({});
        service=TestBed.inject(FurnitureSerivce);
    });
    it('should be create',()=>{
        expect(service).toBeTruthy()
    })
})