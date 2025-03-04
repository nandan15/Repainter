import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { ResponseObj } from "../../models/login";
import { Door_Grill } from "../../models/door_grill";

@Injectable({
    providedIn: 'root'
})
export class Door_GrillService {
    baseUrl: string = environment.backend.baseURL;
    private door_grillMethod = `${this.baseUrl}v1/door_grill`;

    constructor(private httpClient: HttpClient) {}

    // Method to add a new Door Grill
    public addDoor_Grill(door_grill: Door_Grill): Observable<ResponseObj> {
        return this.httpClient.post<ResponseObj>(`${this.door_grillMethod}/create`, door_grill);
    }

    // Method to list Door Grills with optional query
    public listDoor_Grill(query: string = ""): Observable<Door_Grill[]> {
        return this.httpClient.get<Door_Grill[]>(`${this.door_grillMethod}${query}`);
    }

    // Method to update an existing Door Grill
    public updateDoor_Grill(door_grill: Door_Grill): Observable<ResponseObj> {
        return this.httpClient.put<ResponseObj>(`${this.door_grillMethod}/update/${door_grill.door_GrillId}`, door_grill);
    }

    // Method to delete a Door Grill by ID
    public deleteDoor_Grill(door_GrillId: number): Observable<ResponseObj> {
        return this.httpClient.delete<ResponseObj>(`${this.door_grillMethod}/delete/${door_GrillId}`);
    }

    // Method to get Door Grills by Customer ID
    public getDoor_GrillByCustomerId(customerId: number): Observable<Door_Grill[]> {
        return this.httpClient.get<Door_Grill[]>(`${this.door_grillMethod}/customer/${customerId}`);
    }
}