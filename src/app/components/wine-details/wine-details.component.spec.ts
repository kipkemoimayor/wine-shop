import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from 'src/app/services/data.service';

import { WineDetailsComponent } from './wine-details.component';

describe('WineDetailsComponent', () => {
  let component: WineDetailsComponent;
  let fixture: ComponentFixture<WineDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineDetailsComponent ],providers:[DataService],imports:[
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
