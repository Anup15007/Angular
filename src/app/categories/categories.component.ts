import { Component, OnInit } from '@angular/core';
import {Category} from '../category';
import {CategoryService} from '../category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService , private router: Router , private route: ActivatedRoute) {
  }

  categories: Category[];

  category: Category;

  ngOnInit() {
    this.getCategories();
    this.category = new Category();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  delete(category: Category): void {
    this.categories = this.categories.filter(c => c !== category);
    this.categoryService.deleteCategory(category).subscribe();
  }

/*  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.categoryService.addCategory({name} as Category)
      .subscribe(category => {
        this.categories.push(category);
      });
  }*/

  onSubmit() {
    this.categoryService.addCategory(this.category).subscribe(result => this.goToCategoryList());
  }

  goToCategoryList() {
    this.router.navigate(['/categories']);
  }


}
