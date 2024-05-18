import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchInput: Subject<string> = new Subject<string>();
  suggestionsToggle: boolean = false;
  suggestionsData: any;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();



  constructor(private apiService:ApiService,private router:Router,private elementRef: ElementRef){
    this.searchInput
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => this.searchMovies(searchTerm)),
      catchError((error) => {
        console.error('Error fetching suggestions:', error);
        return of([]); // Returning an empty array in case of error
      })
    )
    .subscribe((response) => {
      this.suggestionsData = response;
      // this.hideSuggestionsAfterDelay();
    });
  }

  ngOnInit(): void {
    

  }
  onKeyUp(searchValue:string){
    this.searchInput.next(searchValue); 
   }


  searchMovies(searchQuery: string) {
    if (searchQuery.trim() !== '') {
      this.showSuggestions();
      return this.apiService.searchMulti(searchQuery);
    } else {
      this.hideSuggestions()
      return of([]);
    }
  }

  showSuggestions(): void {
    this.suggestionsToggle = true;
  }

  hideSuggestions(): void {
    this.suggestionsToggle = false;
  }

  hideSuggestionsAfterDelay(): void {
    setTimeout(() => {
      this.hideSuggestions();
    }, 5000);
  }
 
  navigateToPage(id:any,type:any){
    this.hideSuggestions()
    this.closeSearch()
    this.router.navigate([type, id]);
  }

  closeSearch() {
    this.close.emit();
  }

}
