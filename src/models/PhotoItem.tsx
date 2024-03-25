// PhotoItem.ts
class PhotoItem {
    id: number;
    category: number;     
    category_name: string;
    thumbnailUrl: string;
    bookmarks: string;
  
    constructor(id: number,category: number, category_name: string, thumbnailUrl: string, bookmarks: string)  {
      this.id = id;
      this.category = category;
      this.category_name = category_name;
      this.thumbnailUrl = thumbnailUrl;
      this.bookmarks = bookmarks
    }
  }
  
  export default PhotoItem;
  