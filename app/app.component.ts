import { Component }        from '@angular/core';
import { FlickrService }    from './flickr.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Photo} from './photo';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent{ 
  filteredPhotos: any[];
  photos: Observable<Array<Photo>>;
  query = new FormControl();
  
  constructor (private flickrService: FlickrService) {}
  
  ngOnInit() {
  this.photos = this.query.valueChanges
                 .debounceTime(300)
                 .distinctUntilChanged()
                 .switchMap(query => this.flickrService.searchImage(query));
  }
  
}
