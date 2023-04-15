export class PaginationResponse<Type> {

  list: Type[]
  currentPage: number
  totalOfPages: number

  constructor(list: Type[], currentPage: number, totalOfPages: number) {

    this.list = list
    this.currentPage = currentPage
    this.totalOfPages = totalOfPages
  
  }

}
