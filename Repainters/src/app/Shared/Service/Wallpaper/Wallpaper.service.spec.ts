import { TestBed } from "@angular/core/testing";
import { WallpaperSerivce } from "./Wallpaper.service";

describe('WallpaperSerivce', () => { 
    let service:WallpaperSerivce;
    beforeEach(()=>{
        TestBed.configureTestingModule({});
        service=TestBed.inject(WallpaperSerivce);
    });
    it('should be create',()=>{
        expect(service).toBeTruthy()
    })
})