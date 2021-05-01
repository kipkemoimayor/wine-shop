import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { LoaderComponent } from '../loader/loader.component';
import { WineDetailsComponent } from '../wine-details/wine-details.component';

import { WineHomeComponent } from './wine-home.component';

describe('WineHomeComponent', () => {
  let component: WineHomeComponent;
  let fixture: ComponentFixture<WineHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WineHomeComponent,
        LoaderComponent,
        WineDetailsComponent
      ],
      imports: [HttpClientModule, FormsModule], providers: [DataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('wines should be undefined', () => {
    let wines = component.wines;
    expect(wines).toBeUndefined()
  })


  it('loader should have nine items', () => {
    let loaderLen = component.loader.length;
    expect(loaderLen).toEqual(9);
  })


  it('image url should be equal to https://storage.googleapis.com/wineshop-assets/wine-bottles/', () => {
    let imgUrl = component.imageBaseUrl;
    expect(imgUrl).toEqual('https://storage.googleapis.com/wineshop-assets/wine-bottles/');
  })

  it('show all wines should display all wines', () => {
    component.showAllWines();
    let wines = component.wines;
    let winesCopy = component.winesCopy;
    expect(wines).toBe(winesCopy);
  })


  it('add to card should exactly add one item', () => {
    let wine: any = {
      name: 'sample',
      bottleQty: 1,
      caseQty: 1,
      cost: {
        botle: 0,
        case: 0
      }
    };
    let cartSize = component.cartItems.length;

    component.addToCart(wine);
    let currentSize = component.cartItems.length;
    expect(currentSize).toEqual(cartSize + 1);
  })

  it('removeItemFromCard should have atleast one item', () => {
    let wine: any = {
      name: 'sample',
      bottleQty: 1,
      caseQty: 1,
      cost: {
        botle: 0,
        case: 0
      }
    };
    component.addToCart(wine);
    let cartSize = component.cartItems.length;

    expect(cartSize).toBeGreaterThanOrEqual(1)
  })

});
