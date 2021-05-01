import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WineDetailsComponent } from './components/wine-details/wine-details.component';
import { WineHomeComponent } from './components/wine-home/wine-home.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        WineHomeComponent,
        NavbarComponent,
        LoaderComponent,
        WineDetailsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'wine-shop'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('wine-shop');
  });
});
