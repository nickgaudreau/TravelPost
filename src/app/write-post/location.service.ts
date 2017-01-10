import { Injectable } from '@angular/core';
import { ILocation } from './ILocation';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class LocationServices {

    private _apiResource = "assets/storage/world-cities-small.json"; // if not inn local storage already
    private _http : Http;

    constructor(http : Http){
        this._http = http;
    }   

    getAll(): Observable<ILocation[]> {
        return this._http.get(this._apiResource)
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }  

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }    

    

}