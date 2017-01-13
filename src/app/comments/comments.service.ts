import { Injectable } from '@angular/core';
import { IComment } from './IComment';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class CommentsServices {

    private _webApiBaseUrl = "http://localhost:62806/v1/Comments"; // local
    //private _webApiBaseUrl = "http://nickgaudreau-001-site2.htempurl.com/v1/Comments" // prod
    private _http : Http;

    constructor(http : Http){
        this._http = http;
    }   

    getAll(): Observable<IComment[]> {
        return this._http.get(this._webApiBaseUrl + '/all', this.getHeaders())
        .map((response: Response) => response.json())
        //.do(data => console.log(`All Data: \n ${ JSON.stringify(data) }`))
        .catch(this.handleError);
    }

    getAllWhere(id: number): Observable<IComment[]> {
        return this._http.get(this._webApiBaseUrl + '/allwhereid/' + id, this.getHeaders())
        .map((response: Response) => response.json())
        //.do(data => console.log(`All where Data: \n ${ JSON.stringify(data) }`))
        .catch(this.handleError);
    }
 
    getById(id: number): Observable<IComment> {
        return this._http.get(this._webApiBaseUrl + '/get/' + id, this.getHeaders())
        .map((response: Response) => response.json())
        //.do(data => console.log(` Data by id: ${id} :: \n ${ JSON.stringify(data) }`))
        .catch(this.handleError);
    }
 
    create(comment: IComment): Observable<IComment> {
        return this._http.post(this._webApiBaseUrl + '/add', comment,  this.getHeaders())
        .map((response: Response) => response.json())
        .do(data => console.log(`Data returned created :: \n ${JSON.stringify(data)}`))
        .catch(this.handleError);
    }
 
    update(comment: IComment): Observable<boolean> {
        return this._http.put(this._webApiBaseUrl + '/update/' + comment.id, comment, this.getHeaders())
        .map((response: Response) => response.json())
        .do(data => console.log(`Data returned updated :: \n ${JSON.stringify(data)}`))
        .catch(this.handleError);
    }
 
    delete(id: number): Observable<boolean> {
        return this._http.delete(this._webApiBaseUrl + '/delete/' + id, this.getHeaders())
        .map((response: Response) => response.json())
        .do(data => console.log(`Data returned created :: \n ${JSON.stringify(data)}`))
        .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }    

    private getHeaders()
    {
        let headers = new Headers();
        headers.append("Authorization", "Basic YWRtaW46QWRtaW5XZWJBcGlEaQ=="); 
        headers.append("Content-Type", "application/json");
        return new RequestOptions({ headers: headers });
    }

}