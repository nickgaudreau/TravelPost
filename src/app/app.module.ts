import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { PostDetailsComponent } from './post-details/post-details.component';

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
        HomeComponent,
        CommentsComponent,
        PostDetailsComponent,
        WritePostComponent,
        EscapeHtmlPipe,
        LocationFilterPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {
                path: 'Home', component: HomeComponent
            },
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
                path: '', redirectTo: 'Home', pathMatch: 'full'
            },
            { // not found
                path: '**', component: HomeComponent // will have a page not found component
            }
        ])
    ],
    providers: [PostServices, CommentsServices, LocationServices],
    bootstrap: [AppComponent]
})
export class AppModule { }
