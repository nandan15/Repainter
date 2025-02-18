import { TestBed } from "@angular/core/testing";
import { CatalogService } from "./ProductCatalog.service";
describe('CatalogService',()=>{
    let service:CatalogService;
    beforeEach(()=>{
        TestBed.configureTestingModule({});
        service=TestBed.inject(CatalogService);
    });
    it('should be create',()=>{
        expect(service).toBeTruthy()
    })
})