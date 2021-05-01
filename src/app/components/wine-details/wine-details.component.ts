import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Wine } from 'src/app/interface/wine';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-wine-details',
  templateUrl: './wine-details.component.html',
  styleUrls: ['./wine-details.component.css']
})
export class WineDetailsComponent implements OnInit {
  @Input() wine: Wine;
  @Output() back: EventEmitter<boolean> = new EventEmitter();

  imageBaseUrl: string = this.dataService.imageBaseUrl;
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  /**
   * event emmited to navigate back to all wines page 
   */
  navigateBack(): void {
    this.back.emit(true);
  }
}
