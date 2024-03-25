
import axios from 'axios';
import PhotoItem from '../models/PhotoItem';

class PhotoListViewModel {
  photos: PhotoItem[] = [];
  isLoading: boolean = false;

  
  async fetchPhotos() {
    try {
      this.isLoading = true;
      const response = await axios.get('https://app.mhc.asia/test/photos.json');
      //console.log('data :', JSON.stringify(response));
      this.photos = response.data.map((photo: any) => new PhotoItem(photo.id, photo.category,photo.category_name, photo.url,'0'));

     
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      this.isLoading = false;
    }
  }
}

export default new PhotoListViewModel();
