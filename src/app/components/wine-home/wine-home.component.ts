import { Component, OnInit } from '@angular/core';
import { Wine } from 'src/app/interface/wine';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-wine-home',
  templateUrl: './wine-home.component.html',
  styleUrls: ['./wine-home.component.css']
})
export class WineHomeComponent implements OnInit {
  wines: any[];
  filters: string[] = [];
  cartItems: any[] = [];
  showMeSelected: boolean = true;
  imageBaseUrl: string = this.dataService.imageBaseUrl;
  winesCopy: Wine[];
  selected: boolean;
  selectedIndex: number;
  wineDetails: Wine;
  showWineDetails: boolean;
  qty: number;
  totalPrice: number = 0;
  totals: any = {
    totalPrice: 0,
    cases: 0,
    botles: 0
  };

  deliveryInfoForm: any = {
    name: null,
    address: null,
    estate: null,
    notes: null
  }
  fetchingWines: boolean = true;
  errorFetchingWines: boolean;

  loader: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getWines()
  }

  //get wines
  getWines(): void {
    this.fetchingWines = true;
    this.dataService.getWines().subscribe(response => {
      this.fetchingWines = false;
      this.errorFetchingWines = false;
      this.wines = response;
      this.winesCopy = JSON.parse(JSON.stringify(response));
      let tags: string[] = []
      response.forEach(wine => {
        wine.bottleQty = null;
        wine.caseQty = null;
        tags.push(...wine.tags)
      });
      let tagSet: Set<string> = new Set(tags);
      tagSet.forEach(val => {
        this.filters.push(val)
      });

    }, error => {
      this.errorFetchingWines = true;
    })
  }


  /**
   * filters wines per tag 
   * @param tag 
   * @param index 
   */
  filterWines(tag: string, index: number): void {
    this.wines = this.winesCopy.filter(wine => wine.tags.includes(tag));
    this.selectedIndex = index;
  }


  /**
   * displays all wines
   */
  showAllWines(): void {
    this.selected = true;
    this.showMeSelected = false;
    this.wines = this.winesCopy;
    this.selectedIndex = null;
  }


  /**
   * Sorts wines ascending either by price or vintage
   */
  sortWines({ price }): void {
    if (price) {
      this.wines.sort((a, b) => ((a.cost.bottle + a.cost.case) - (b.cost.bottle + b.cost.case)))
    } else {
      //sort by vintage
      this.wines.sort(this.compareVintage)
    }
  }

  compareVintage(a, b) {
    if (a.tags.includes('vintage') || b.tags.includes('vintage')) {
      if (a.name > b.name) {
        return 1
      }
      if (b.name > a.name) {
        return -1
      } else {
        return 0
      }
    } else {
      return 0
    }
  }

  /**
   * 
   * @param wine wine details
   * click event to display wine details
   */
  viewDetails(wine: Wine): void {
    this.showWineDetails = !this.showWineDetails;
    this.wineDetails = wine;
  }


  hideWineDetails(): void {
    this.showWineDetails = !this.showWineDetails;
  }

  addToCart(wine: Wine): void {
    if (!wine.caseQty && !wine.bottleQty) {
      alert('Please add at least one quantity');
      return;
    }

    let reg: RegExp = /^\d+$/;


    if (wine.caseQty) {
      if (!reg.test(wine.caseQty)) {        
        alert('Only numbers allowed as quantity')
        return;
      }
    }

    if (wine.bottleQty) {
      if (!reg.test(wine.bottleQty)) {
        alert('Only numbers allowed as quantity')
        return;
      }
    }
    let caseQty: number = 13;
    let wineTotal: number = 0;
    let wineCaseTotal: number = 0;

    if (wine.bottleQty) {
      //convert it to a type number
      wine.bottleQty = +wine.bottleQty;
      wineTotal = wine.bottleQty * wine.cost.bottle;
    }

    if (wine.caseQty) {
      wine.caseQty = +wine.caseQty;
      wineCaseTotal = wine.caseQty * wine.cost.case;
    }

    //add to cart array
    let cartWine = {
      name: wine.name,
      botles: wine.bottleQty,
      cases: wine.caseQty,
      total: wineCaseTotal + wineTotal,
    };

    this.cartItems.push(cartWine);

    //compute running total;
    this.totals = this.computeWineTotal(this.cartItems);

    //clear data
    wine.bottleQty = null;
    wine.caseQty = null;
  }


  computeWineTotal(cartItems: any[]): any {
    return cartItems.reduce((prev, curr) => {
      prev.totalPrice += curr.total;
      prev.botles += curr.botles;
      prev.cases += curr.cases;
      return prev;
    }, { totalPrice: 0, botles: 0, cases: 0 })
  }


  removeItemFromCart(item: any) {
    this.cartItems.forEach((cartItem, index) => {
      if (item.name === cartItem.name) {
        this.cartItems.splice(index, 1)
      }
    });
    this.totals = this.computeWineTotal(this.cartItems);

  }


  reload(): void {
    location.reload()
  }
}
