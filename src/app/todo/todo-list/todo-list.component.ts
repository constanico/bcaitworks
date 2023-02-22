import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  todos: any;
  ngOnInit(): void {
    this.getTodos();

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['save'] !== undefined && params['save'] === 'true') {
        this.toastr.success('Todo saved succesfully!');
      }
    });
  }
  getTodos = () => {
    this.todoService.getAll().subscribe({
      next: (data) => {
        this.todos = data;
      },
      error: (error) => {
        this.toastr.error('Failed to get todo list');
        throw error;
      },
    });
  };
}
