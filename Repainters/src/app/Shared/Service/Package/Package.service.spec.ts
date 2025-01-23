import { TestBed } from "@angular/core/testing";
import { PackageService } from "./Package.service";
describe('PackageService', () => { 
    let service:PackageService;
    beforeEach(()=>{
        TestBed.configureTestingModule({});
        service=TestBed.inject(PackageService);
    });
    it('should be create',()=>{
        expect(service).toBeTruthy()
    })
})