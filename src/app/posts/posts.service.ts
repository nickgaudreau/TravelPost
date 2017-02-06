import { Injectable } from '@angular/core';
import { IPost } from './IPost';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class PostServices {

    private _webApiBaseUrl = "http://localhost:62806/v1/Posts"; // local
    //private _webApiBaseUrl = "http://nickgaudreau-001-site10.htempurl.com/v1/Posts" // prod
    private _http : Http;

    constructor(http : Http){
        this._http = http;
    }   

    getAll(): Observable<IPost[]> {
        return this._http.get(this._webApiBaseUrl + '/all', this.getHeaders())
        .map((response: Response) => response.json())
        //.do(data => console.log(`All Data: \n ${ JSON.stringify(data) }`))
        .catch(this.handleError);
    }    
    
    getById(id: string): Observable<IPost> {
        return this._http.get(this._webApiBaseUrl + '/get/' + id, this.getHeaders())
        .map((response: Response) => response.json())
        //.do(data => console.log(` Data by id: ${id} :: \n ${ JSON.stringify(data) }`))
        .catch(this.handleError);
    }
 
    create(post: IPost): Observable<IPost> {
        return this._http.post(this._webApiBaseUrl + '/add', post,  this.getHeaders())
        .map((response: Response) => response.json())
        //.do(data => console.log(`Data returned created :: \n ${JSON.stringify(data)}`))
        .catch(this.handleError);
    }
 
    update(post: IPost): Observable<boolean> {
        return this._http.put(this._webApiBaseUrl + '/update/' + post.id, post, this.getHeaders())
        .map((response: Response) => response.json())
        //.do(data => console.log(`Data returned created :: \n ${JSON.stringify(data)}`))
        .catch(this.handleError);
    }
 
    delete(id: number): Observable<boolean> {
        return this._http.delete(this._webApiBaseUrl + '/delete/' + id, this.getHeaders())
        .map((response: Response) => response.json())
        //.do(data => console.log(`Data returned created :: \n ${JSON.stringify(data)}`))
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