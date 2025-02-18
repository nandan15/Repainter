import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { TexturePainting } from "../models/texturepainting";
import { TexturePaintingSerivce } from "../Service/TexturePainting/TexturePainting.service";
import Swal from "sweetalert2";

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
        const observables = texturePaintings.map(texturePainting =>
            this.texturePaintingService.addTexturePainting(texturePainting)
        );
    
        forkJoin(observables).subscribe({
            next: (responses) => {
                responses.forEach((data, index) => {
                    const texturePainting = texturePaintings[index];
                    texturePainting.texturePaintingId = data["created_id"];
                    texturePainting.createdOn = texturePainting.createdOn || new Date();
                    texturePainting.lastModifiedDate = new Date();
                });
    
                this._texturePainting.next([...this.texturePaintingList.texturePainting, ...texturePaintings]);
                this.toaster.success("Texture Painting Confirmed Successfully", "Confirmation");
    
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Texture Painting added successfully.',
                    confirmButtonText: 'OK'
                });
            },
            error: (error) => {
                console.error("Error adding texture painting:", error);
                this.toaster.error("Failed to add Texture Painting", "Error");
    
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to save Texture Painting.',
                    confirmButtonText: 'OK'
                });
            }
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
        deleteTexturePainting(texturePainting: TexturePainting): Observable<any> {
            return new Observable(observer => {
                this.texturePaintingService.deleteTexturePainting(texturePainting.texturePaintingId).subscribe(
                    (response) => {
                        // Remove the deleted item from the local list
                        this.texturePaintingList.texturePainting = this.texturePaintingList.texturePainting
                            .filter(item => item.texturePaintingId !== texturePainting.texturePaintingId);
                        
                        // Update the BehaviorSubject
                        this._texturePainting.next([...this.texturePaintingList.texturePainting]);
                        
                        this.toaster.success("Texture Painting Deleted Successfully", "Success");
                        observer.next(response);
                        observer.complete();
                    },
                    (error) => {
                        this.toaster.error("Failed to delete texture painting", "Error");
                        observer.error(error);
                    }
                );
            });
        }
}
