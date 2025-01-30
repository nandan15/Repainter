import { TestBed } from "@angular/core/testing";
import { PackageDataService } from "./packageData.service";
describe('PackageDataService',()=>{
    let service:PackageDataService;
    beforeEach(()=>{
        TestBed.configureTestingModule({});
        service=TestBed.inject(PackageDataService);
    });
    it('should be create',()=>{
        expect(service).toBeTruthy()
    })
})