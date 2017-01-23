import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { PostServices } from './posts/posts.service';
import { CommentsServices } from './comments/comments.service';
import { WritePostComponent } from './write-post/write-post.component';

import { LocationFilterPipe } from './posts/location-filter.pipe';
import { LocationServices } from './write-post/location.service'

// TODO: this to go in his own file...like CityFilterPipe
import { DomSanitizer } from '@angular/platform-browser'
@Pipe({ name: 'escapeHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value: any, args: any[] = []) {       
        // double check remove JS injection
        if (value.indexOf('<script>') != -1) {
            //console.log('JS injection. . . html purified');
            return value.replace('<script>', '').replace('<\/script>', '');
        }
        return this.sanitized.bypassSecurityTrustHtml(value); // so ng2 does not remove CSS
    }
}

@NgModule({
    declarations: [
        AppComponent,
        PostsComponent,
        CommentsComponent,
        PostDetailsComponent,
        WritePostComponent,
        EscapeHtmlPipe,
        LocationFilterPipe
    ],
    imports: [
        BrowserModule,
        ToastModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {
                path: 'Posts', component: PostsComponent
            },
            {
                path: 'Write', component: WritePostComponent
            },
            {
                path: 'PostDetails/:id/:username', component: PostDetailsComponent
            },
            { //default
                path: '', redirectTo: 'Posts', pathMatch: 'full'
            },
            { // not found
                path: '**', component: PostsComponent // will have a page not found component
            }
        ])
    ],
    providers: [PostServices, CommentsServices, LocationServices],
    bootstrap: [AppComponent]
})
export class AppModule { }
