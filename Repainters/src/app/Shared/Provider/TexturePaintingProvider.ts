import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { TexturePainting } from "../models/texturepainting";
import { TexturePaintingSerivce } from "../Service/TexturePainting/TexturePainting.service";

@Injectable({
    providedIn: 'root'
})
export class TexturePaintingProvider {
    private _texturePainting = new BehaviorSubject<TexturePainting[]>([]);
    texturePaintingList: { texturePainting: TexturePainting[] } = { texturePainting: [] };
    getPaginatedData: any;

    get texturePainting() {
        return this._texturePainting.asObservable();
    }

    private _texturePaintings = new BehaviorSubject<TexturePainting>(new TexturePainting());
    currentTexturePainting: { _texturePaintings: TexturePainting } = { _texturePaintings: new TexturePainting() };

    get addtexturePaintings() {
        return this._texturePaintings.asObservable();
    }

    constructor(private texturePaintingService: TexturePaintingSerivce, private toaster: ToastrService) {}

    addTexturePainting(texturePaintings: TexturePainting[]) {
        texturePaintings.forEach(texturePainting => {
            this.texturePaintingService.addTexturePainting(texturePainting).subscribe((data) => {
                texturePainting.texturePaintingId = data["created_id"];
                texturePainting.createdOn = texturePainting.createdOn || new Date();
                texturePainting.lastModifiedDate = new Date();
                this._texturePainting.next([...this.texturePaintingList.texturePainting, texturePainting]);
                this.toaster.success("Texture Painting Confirmed Successfully", "Confirmation");
            });
        });
    }

    listTexturePainting() {
        this.texturePaintingService.listTexturePainting().subscribe((data) => {
            this.texturePaintingList.texturePainting = data as TexturePainting[];
            this._texturePainting.next(Object.assign({},this.texturePaintingList).texturePainting);
        });
    }

    updateTexturePainting(texturePainting: TexturePainting) {
        this.texturePaintingService.updateTexturePainting(texturePainting).subscribe((data) => {
            texturePainting.lastModifiedDate = new Date();
            const index = this.texturePaintingList.texturePainting.findIndex(n => n.texturePaintingId == texturePainting.texturePaintingId);
            if (index !== -1) {
                this.texturePaintingList.texturePainting[index] = texturePainting; // Update the specific painting
            }
            this._texturePainting.next([...this.texturePaintingList.texturePainting]);
            this.toaster.success("Internal Painting Updated Successfully", "Confirmation");
        });
    }
    getTexturePaintingByCustomerId(customerId:number,p0:{delete
        :number;}):Observable<TexturePainting[]>{
            return this.texturePaintingService.getTexturePaintingByCustomerId(customerId);
        }
}
