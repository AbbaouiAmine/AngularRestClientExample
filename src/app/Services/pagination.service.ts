import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public dataArray: any[];
  public dataSize: number;
  public pageSize: number;
  public numberOfPages: number;
  public currentPage;
  public index_strat;
  public index_end;

  constructor() {

  }
  public setData(dataArray: any[], pageSize) {
    this.dataArray = dataArray;
    this.dataSize = dataArray.length;
    this.pageSize = pageSize;
    this.index_strat = 0;
    this.currentPage = 0;
    this.index_end = pageSize;
    this.numberOfPages = this.getNumberOfPages();
  }
  public getNumberOfPages() {
    return Math.ceil(this.dataSize / this.pageSize);
  }
  public getIndexstrat(numberOfpage) {
    return numberOfpage * this.pageSize;
  }
  public getIndexend(numberOfPage) {
    return (numberOfPage + 1) * this.pageSize;
  }
  public nextPage(currentPage) {
    this.currentPage = currentPage;
    if (this.currentPage < this.numberOfPages - 1) {
      this.currentPage++;
    }
    else {
      this.currentPage = this.numberOfPages - 1;
    }
    return this.currentPage;

  }
  public previousPage(currentPage) {
    this.currentPage = currentPage;
    console.log("avant : " + this.currentPage);
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    else {
      this.currentPage = 0;
    }
    console.log("Après : " + this.currentPage);
    return this.currentPage;
  }


}
