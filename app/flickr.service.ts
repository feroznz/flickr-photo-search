import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Photo} from './photo';
import * as _ from 'lodash';

@Injectable()
export class FlickrService {
  constructor(private jsonp: Jsonp) {}
  apiKey:string = 'XXXXXX-Add-Your-Key-here-XXXX';
  photoList:Photo[];
   searchImage (query: string) {
    let params = new URLSearchParams();
    params.set('tags', query);
    params.set('format', 'json');
    params.set('jsoncallback', 'JSONP_CALLBACK');
    
    let flickrUrl = 'https://www.flickr.com/services/feeds/photos_public.gne?';
    this.photoList =[];
    return this.jsonp
    .get(flickrUrl, { search: params })
    .map(response => 
    {
    for(let photo of <string[]> response.json().items){             
      let owner = photo.author.split("(")[1].split("\"")[1];
      "https://www.flickr.com/photos/lhermet_laurent/34473886360/"
      let link = _.compact(photo.link.split("/"));
      let photoId = _.last(link);
      let tagList: string[] = photo.tags.split(" ");
      var myPhoto = new Photo();
      myPhoto.photo_id = photoId;
      myPhoto.author = owner;
      myPhoto.thumbnailUrl = photo.media.m;
      myPhoto.tags=tagList;
      
      let fullUrl =_.result(_.find(this.getPhotoSizes(myPhoto.photo_id), { "label": "Original" }), "source");
      myPhoto.fullSizeUrl = fullUrl;
      
      this.photoList.push(myPhoto);
      //console.log('photo : ' + photo);
    }
    return this.photoList;
  });
     
  }
  
  getPhotoSizes(photoId: number): any {
    let flickerApiUrl: string = "https://api.flickr.com/services/rest/?";
    let params = new URLSearchParams();
    params.set('api_key',this.apiKey);
     params.set('method','flickr.photos.getSizes');
    params.set('photo_id', photoId);
    params.set('format', 'json');
    params.set('jsoncallback', 'JSONP_CALLBACK');
    
    //let sizeUrl = `${this.flickerApiUrl}`;
    return this.jsonp
              .get(flickerApiUrl, { search: params })
              .map(response => <string[]> response.json().sizes);
  }
  

}

