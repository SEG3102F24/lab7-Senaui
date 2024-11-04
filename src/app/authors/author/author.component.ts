import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author, Book } from '../../books/model/book';
import { BooksService } from '../../books/service/books.service';
import { Subscription } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [NgIf, NgFor], // Include NgFor to iterate over the books
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor!: Author | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private booksService: BooksService = inject(BooksService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.booksService.getAuthor(id).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data;
          console.log(this.selectedAuthor);
        },
        error: (_: any) => {
          this.selectedAuthor = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
