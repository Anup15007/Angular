import { Component, OnInit } from '@angular/core';
import {Category} from '../category';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html',
  styleUrls: ['./category-dashboard.component.css']
})
export class CategoryDashboardComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  categories: Category[] = [];
  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      categories => this.categories = categories.slice(1, 5));

  }
}
