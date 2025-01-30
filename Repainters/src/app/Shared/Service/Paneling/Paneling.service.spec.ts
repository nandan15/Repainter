import { TestBed } from "@angular/core/testing";
import { WallPanelingService } from "./Paneling.service";
describe('WallPanelingService',()=>{
    let service:WallPanelingService;
    beforeEach(()=>{
        TestBed.configureTestingModule({});
        service=TestBed.inject(WallPanelingService);
    });
    it('should be create',()=>{
        expect(service).toBeTruthy();
    })
})