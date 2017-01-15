import { Component, OnInit, Input } from '@angular/core';
import { IPost } from './IPost';
import { PostServices } from './posts.service';

declare var $: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: IPost[];
  errorMessage: string;
  txtLocation: string;

  @Input() txtLocationParent: any;

  private _postService: PostServices;

  constructor(postService: PostServices) {
    this._postService = postService;
  }
  
  ngOnInit() {
    this._postService.getAll()
      .subscribe(
      data => { this.posts = data; console.log("data.length: " + data.length); this.dataLoadComplete();}, // here
      error => this.errorMessage = <any>error // <any> is a cat ops to any data type
      );

      //this.txtLocationParent.subscribe(data => { console.log(data); this.txtLocation = data} );
  } 

    
  dataLoadComplete():void{
    var $tiles = $('#tiles'),
      $handler = $('li', $tiles),
      $main = $('#main'),
      $window = $(window),
      $document = $(document),
      options = {
        autoResize: true, // This will auto-update the layout when the browser window is resized.
        container: $('#woodmark-compo'),//$main, // Optional, used for some extra CSS styling
        offset: 5 // Optional, the distance between grid items
        //itemWidth: 280 // Optional, the width of a grid item
      };
    /**
     * Reinitializes the wookmark handler after all images have loaded
     */
    function applyLayout() {
      $tiles.imagesLoaded(function () {
        // Destroy the old handler
        if ($handler.wookmarkInstance) {
          $handler.wookmarkInstance.clear();
        }

        // Create a new layout handler.
        $handler = $('li', $tiles);
        $handler.wookmark(options);
      });
    }
    /**
     * When scrolled all the way to the bottom, add more tiles
     */
    function onScroll() {
      // Check if we're within 100 pixels of the bottom edge of the broser window.
      var winHeight = window.innerHeight ? window.innerHeight : $window.height(), // iphone fix
        closeToBottom = ($window.scrollTop() + winHeight > $document.height() - 100);

      if (closeToBottom) {
        // Get the first then items from the grid, clone them, and add them to the bottom of the grid
        var $items = $('li', $tiles),
          $firstThree = $items.slice(0, 3);
        $tiles.append($firstThree.clone());

        applyLayout();
      }
    };

    // Call the layout function for the first time
    applyLayout();

    // Capture scroll event.
    $window.bind('scroll.wookmark', onScroll);   
  }

}
